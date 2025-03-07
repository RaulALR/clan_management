import socketio
import logging
import asyncio
import bots.getMembers.main
from config import SERVER_URL, BOT_GET_MEMBERS

logger = logging.getLogger(__name__)
sio = socketio.Client()

def start_io():
    @sio.event
    def connect():
        print("✅ Conectado al servidor WebSocket")
        sio.emit("registerBot", BOT_GET_MEMBERS)

    @sio.on("executeCommand")
    def execute_command(data):
        bot_name = data.get("botName")
        command = data.get("command")
        if bot_name == BOT_GET_MEMBERS:
            bot_loop = bots.getMembers.main.bot.loop
            future = asyncio.run_coroutine_threadsafe(
                bots.getMembers.main.execute_command(command), bot_loop
            )
            response = future.result()

            sio.emit("commandResponse", {"bot": bot_name, "response": response})    

    @sio.event
    def disconnect():
        print("❌ Desconectado del servidor WebSocket")

    try:
        sio.connect(SERVER_URL)
        sio.wait()
    except Exception as e:
        logging.error(f"Error al conectar WebSocket: {e}")

if __name__ == "__main__":
    start_io()