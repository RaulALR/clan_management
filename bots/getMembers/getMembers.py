import discord
import logging
from config import ROLE_HIERARCHY_MEMBERS

logger = logging.getLogger(__name__)

async def get_members(bot, guild, channel):
    print(ROLE_HIERARCHY_MEMBERS)
    await channel.purge()

    categorized_members = {role_name: [] for role_name in ROLE_HIERARCHY_MEMBERS.keys()}

    processed_members = set()

    for role_name, role_id in ROLE_HIERARCHY_MEMBERS.items():
        role = guild.get_role(role_id)
        if role:
            for member in role.members:
                if member.id not in processed_members:
                    categorized_members[role_name].append(member.display_name)
                    processed_members.add(member.id)

    for role_name, members in categorized_members.items():
        members.sort()

        bloque = f"**{role_name} ({len(members)} miembros):**\n\n"
        bloque += "\n".join(members) + "\n" if members else "Sin miembros\n"
        bloque += "\n---------------------------------------------------------------------\n"
        await channel.send(bloque)
