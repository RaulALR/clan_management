import threading
import asyncio
import bots.botsController
import bots.getMembers.main
from dotenv import load_dotenv
import os

# Cargar variables de entorno
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

def run_bots_controller():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(bots.botsController.start_io())

if __name__ == "__main__":
    ws_thread = threading.Thread(target=run_bots_controller, daemon=True)
    ws_thread.start()

    bots.getMembers.main.run_bot()
