const { mode } = require('../../config.json')
const clc = require('cli-color')

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    async execute(message, args) {

        const user = message.mentions.users.first() || message.author || message.guild.members.cache.get(args[0])

        

        if (mode === 'CONSOLE') {
            console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Sent Avatar of ${user.tag}`)}`)
            message.channel.send(user.displayAvatarURL({ dynamic: true }));
        } else {

            const avatarEmbed = new Discord.MessageEmbed()
                .setAuthor(`Avatar of ${user.tag}`, 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                .setColor('2f3136')
                .setFooter(user.tag, user.avatarURL)
                .setImage(user.displayAvatarURL({ dynamic: true }));
            return message.channel.send(avatarEmbed);
        }

    }  
}