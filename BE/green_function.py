from pydantic import BaseModel
import openai
import requests
import os
from datetime import date
import subprocess
import time
import re

PUE=1.67
PSF=1.0
CARBON_INTENSITY=500
USAGE = 1
POWER_DRAW_FOR_CPU = 12 # Any
POWER_DRAW_FOR_MEMORY_PER_GB = 0.3725 * 16 # how many GBs??


def get_LLM_response(code_data: str):
    api_key = os.environ.get("OPENAI_API_KEY")
    headers = {
      "Content-Type": "application/json",
      "Authorization": f"Bearer {api_key}"
    }
    payload = {
      "model": "gpt-4o",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": '''"The code provided below has unnecessarily long execution time.
              It can be optimized to reduce the execution time without changing the output.
              Please optimize the code to make it more efficient while keeping the output the same.
              Just provide the optimized code without any additional explanation." \n\n''' + code_data
            },
          ]
        }
      ],
      "max_tokens": 1000,
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    point = response.json()["choices"][0]["message"]["content"]
    return point
  

def execute_java_code(code: str):
    code = code.replace('\u00A0', ' ')
    code = code.replace("\xc2\xa0", " ")
    match = re.search(r'public\s+class\s+(\w+)', code)
    if not match:
        class_name = "NoClassName"
    elif match:
        class_name = match.group(1)

    with open(class_name + ".java", "w") as file:
        file.write(code)
    compile_process = subprocess.run(["javac", class_name+".java"], capture_output=True, text=True)
    if compile_process.returncode != 0:
        print('Compilation Failed')
        return ("Compilation Failed", compile_process.stderr)
    start_time = time.time()
    execute_process = subprocess.run(["java", class_name], capture_output=True, text=True)
    end_time = time.time()
    
    if execute_process.returncode != 0:
        print('Execution Failed')
        return ("Execution Failed", execute_process.stderr)
    
    execution_time = end_time - start_time
    
    os.remove(class_name+".java")
    os.remove(class_name+".class")
    return (execute_process.stdout, execution_time)

    


def calculate_carbon_footprint(runtime: float):
    energy_needed = runtime * (POWER_DRAW_FOR_CPU * USAGE + POWER_DRAW_FOR_MEMORY_PER_GB ) * PUE * PSF
    carbon_footprint = energy_needed * CARBON_INTENSITY
    carbon_footprint  = carbon_footprint / 3600
    return carbon_footprint



  
class RequestModel(BaseModel):
    code: str
    

class FixedCode(BaseModel):
    id: str
    fixed_code: str
    

class CodeCreateRequest(BaseModel):
    original_code: str
    merged_code: str

class CodeResponse(BaseModel):
    id: str
    original_code: str
    merged_code: str
    original_fp: float
    merged_fp: float
    date: date