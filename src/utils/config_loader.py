import os
import yaml
from dotenv import load_dotenv

def load_config(config_path: str = "configs/llm_config.yaml") -> dict:
    """
    Load the YAML configuration file and environment variables from .env.

    Returns:
        dict: A dictionary containing LLM config + environment variables (as 'env' subkey)
    """
    # Load environment variables from .env
    env_path = os.getenv("ENV_PATH", ".env")
    if os.path.exists(env_path):
        load_dotenv(dotenv_path=env_path)
    else:
        print(f".env file not found at {env_path}")

    # Load YAML config
    if not os.path.exists(config_path):
        raise FileNotFoundError(f"Configuration file not found: {config_path}")

    with open(config_path, "r") as file:
        config = yaml.safe_load(file)

    # Inject env variables
    config["env"] = {
        "OPENAI_API_KEY": os.getenv("OPENAI_API_KEY", ""),
    }

    return config
