const axios = require('axios');
const clc = require('cli-color');
const { prefix, mode } = require('../../config.json')

module.exports = {
    name: "nickAll",
    aliases: ['massnick', 'mn', 'na'],
    async execute(message, args) {

        try {
            let nickname = args.slice(0).join(' ')
            const { guild, channel } = message
            await attemptChangeNicknames(guild, nickname, channel)
        } catch (err) {
            console.log(err)
        }

    }
}

async function attemptChangeNicknames(discord, nickname, channel) {
    await discord.members.fetch()
    discord.members.cache.forEach(mem => {
        console.log(`User info: ${mem.user.tag}`)
        mem.setNickname(nickname);
    })
    channel.send("Attempting to change nicknames...")
}