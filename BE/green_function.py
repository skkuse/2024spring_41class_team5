from pydantic import BaseModel
import openai
import requests


def get_LLM_response(code_data: str):
    api_key = "api 키"
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
  
  
  
class RequestModel(BaseModel):
    session: str
    data: str
    
    
