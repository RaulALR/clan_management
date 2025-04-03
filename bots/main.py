import threading
import asyncio
import botsController
import getMembers.main
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

def run_bots_controller():
    asyncio.run(botsController.start_io())

if __name__ == "__main__":
    ws_thread = threading.Thread(target=run_bots_controller, daemon=True)
    ws_thread.start()

    getMembers.main.run_bot()