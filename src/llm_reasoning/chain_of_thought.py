# src/llm_reasoning/cot_reasoner.py
import json
from src.utils.config_loader import load_config
import openai

class CotReasoner:
    def __init__(self):
        config = load_config()
        openai.api_key = config["env"]["OPENAI_API_KEY"]
        self.model = config["model"]
        self.temp = config["temperature"]
        self.max_tokens = config["max_tokens"]

    def reason(self, parcels: list) -> str:
        data = json.dumps(parcels, indent=2)
        prompt = open("prompts/master_prompt.txt").read()
        full_prompt = prompt.format(parcel_data=data)

        resp = openai.ChatCompletion.create(
            model=self.model,
            temperature=self.temp,
            max_tokens=self.max_tokens,
            messages=[{"role": "user", "content": full_prompt}],
        )
        return resp.choices[0].message.content
