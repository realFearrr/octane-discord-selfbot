const axios = require('axios');
const clc = require('cli-color')
const { mode, prefix } = require('../../config.json')

module.exports = {
    name: 'banall',
    aliases: ['ba'],
    async execute(message, args) {

        if (!message.member.hasPermission('BAN_MEMBERS')) return throwError(mode, `Integrity checks violated, 1 infraction found. Permission "BAN_MEMBERS" required.`, `${prefix}ba`, message)


        try {
            
            await attemptBan(message.guild, message)

        } catch (error) {
            console.log(error)
        }

    }
}

async function attemptBan(discord, channel) {
    await discord.members.fetch()
    discord.members.cache.forEach(mem => {
        if (mem.id === discord.ownerID) return;
        console.log(`User info: ${mem.user.tag}`)
        mem.ban();
    })
    console.log('attempting to ban members lmfao')
}