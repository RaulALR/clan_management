import socketio
import logging
import asyncio
import getMembers.main
from config import SERVER_URL, BOT_GET_MEMBERS

logger = logging.getLogger(__name__)
sio = socketio.AsyncClient()

async def start_io():
    @sio.event
    async def connect():
        print("✅ Conectado al servidor WebSocket")
        await sio.emit("registerBot", BOT_GET_MEMBERS)

    @sio.on("executeCommand")
    async def execute_command(data):
        bot_name = data.get("botName")
        command = data.get("command")

        if bot_name == BOT_GET_MEMBERS:

            task = getMembers.main.bot.loop.create_task(getMembers.main.execute_command(command))
            response = await task

            await sio.emit("commandResponse", {"bot": bot_name, "response": response})


    @sio.event
    async def disconnect():
        print("❌ Desconectado del servidor WebSocket")

    try:
        await sio.connect(SERVER_URL)
        await sio.wait()
    except Exception as e:
        logging.error(f"Error al conectar WebSocket: {e}")

if __name__ == "__main__":
    start_io()