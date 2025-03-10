import threading
import asyncio
import botsController
import getMembers.main
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

def run_bots_controller():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(botsController.start_io())

if __name__ == "__main__":
    ws_thread = threading.Thread(target=run_bots_controller, daemon=True)
    print(ws_thread)
    ws_thread.start()

    getMembers.main.run_bot()
