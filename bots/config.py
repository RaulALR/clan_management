import os
import json
from dotenv import load_dotenv

load_dotenv()

SERVER_URL = os.getenv("SERVER_URL")
BOT_GET_MEMBERS = os.getenv("BOT_GET_MEMBERS")
GUILD_ID = int(os.getenv("GUILD_ID"))
GET_MEMBERS_CHANNEL_ID = int(os.getenv("GET_MEMBERS_CHANNEL_ID"))
BOT_TOKEN = os.getenv("BOT_TOKEN")
ROLE_HIERARCHY_MEMBERS = json.loads(os.getenv("ROLE_HIERARCHY_MEMBERS"))