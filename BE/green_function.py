from pydantic import BaseModel
import openai
import requests
import os
from datetime import date
import subprocess
import time

PUE=1.67
PSF=1.0
CARBON_INTENSITY=500
USAGE = 1
POWER_DRAW_FOR_CPU = 12 # Any
POWER_DRAW_FOR_MEMORY_PER_GB = 0.3725 * 16 # how many GBs??


def get_LLM_response(code_data: str):
    api_key = 'api key'
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
              "text": '''The code I'm currently providing doesn't take into account the carbon footprint of running the code. 
              For example, meaningless loops increase the execution time of the code, which increases the time it takes to perform the code,
              which increases the carbon footprint. Please convert the code I've provided below to code that has the same functionality but minimizes the carbon footprint.
              Give me only code. Don't say anything else. \n\n''' + code_data

            },
          ]
        }
      ],
      "max_tokens": 500
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)
    point = response.json()["choices"][0]["message"]["content"]
    return point
  

def execute_java_code(code: str):
    with open("TempJavaProgram.java", "w") as file:
        file.write(code)
    compile_process = subprocess.run(["javac", "TempJavaProgram.java"], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return {"error": "Compilation Failed", "details": compile_process.stderr}
    start_time = time.time()
    execute_process = subprocess.run(["java", "TempJavaProgram"], capture_output=True, text=True)
    end_time = time.time()
    
    if execute_process.returncode != 0:
        return {"error": "Execution Failed", "details": execute_process.stderr}
    
    execution_time = end_time - start_time
    
    os.remove("TempJavaProgram.java")
    os.remove("TempJavaProgram.class")
    return (execute_process.stdout, execution_time)

    


def calculate_carbon_footprint(runtime: float):
    energy_needed = runtime * (POWER_DRAW_FOR_CPU * USAGE + POWER_DRAW_FOR_MEMORY_PER_GB ) * PUE * PSF
    carbon_footprint = energy_needed * CARBON_INTENSITY
    return carbon_footprint



  
class RequestModel(BaseModel):
    session: str
    data: str
    

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