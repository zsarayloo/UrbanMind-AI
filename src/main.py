from src.utils.config_loader import load_config
import openai

config = load_config()
openai.api_key = config["env"]["OPENAI_API_KEY"]

response = openai.ChatCompletion.create(
    model=config["model"],
    messages=[{"role": "user", "content": "Where should we build a school?"}],
    temperature=config["temperature"],
    max_tokens=config["max_tokens"]
)