from bots.config import BOT_TOKEN, GUILD_ID, GET_MEMBERS_CHANNEL_ID
import discord
import logging
from discord.ext import commands
from bots.logging_config import logger
from bots.getMembers.getMembers import get_members

intents = discord.Intents.default()
intents.message_content = True
intents.members = True
intents.reactions = True
intents.guilds = True

bot = commands.Bot(command_prefix="!", intents=intents)

logger = logging.getLogger(__name__)

@bot.event
async def on_ready():
    logger.info(f"Bot conectado como {bot.user}")
    print(f"✅ Bot conectado como {bot.user}")
    

async def execute_command(command):
    if command == "get_members":
        print(bot)
        guild = bot.get_guild(GUILD_ID)
        if not guild:
            logger.info("No se pudo obtener el servidor.")
            return
        
        channel = bot.get_channel(GET_MEMBERS_CHANNEL_ID)
        if not channel:
            logger.info("⚠️ Error: No se pudo obtener el canal.")
            return
        
        result = await get_members(bot, guild, channel)
        return ''
    return f"Comando '{command}' no reconocido."

def run_bot():
    print("🔵 Iniciando Bot de Discord...")
    bot.run(BOT_TOKEN)

if __name__ == "__main__":
    run_bot()
