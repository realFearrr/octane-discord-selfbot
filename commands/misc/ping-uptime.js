module.exports = {
    name: 'uptime',
    aliases: ['ping'],
    async execute(message, args) {

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);        

        let uptime = `${days} Days ${hours} Hours`
        if (days === 0) uptime = `${hours} Hours and ${minutes} Minutes`
        if (hours === 0) uptime = `${minutes} Minutes and ${seconds} Seconds`
        if (minutes === 0) uptime = `${seconds} Seconds`

        let embed = new Discord.MessageEmbed()
            .setAuthor('Pinging Spirit API....', 'https://cdn.discordapp.com/attachments/816363507482230844/849760080211738644/loading.gif')
            .setColor('2f3136')
        message.channel.send(embed).then(async msg => {

            setTimeout(() => {
                msg.edit(embed.setAuthor('Client Uptime', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png').addField('Uptime', uptime, true).addField('API Latency', `${msg.client.ws.ping}ms`, true))
            }, 2500);

            
        })

    }
}

// credits: https://stackoverflow.com/questions/49912703/get-uptime-of-discord-js-bot