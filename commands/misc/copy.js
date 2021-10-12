const clc = require('cli-color')
const { mode, prefix } = require('../../config.json') 

let copiedUser;
module.exports = {
    name: 'copy',
    aliases: ['copyuser'],
    async execute(message, args) {

        const mentionedMember = message.mentions.users.first();
        if (!mentionedMember) { // if there is no mention

            if (mode === 'CONSOLE') {
                return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Missing argument "member". Usage: ${prefix}copy ["@member"] `)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Missing argument "member".', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            }
        } 
        if (mentionedMember.id === client.user.id) {

            if (mode === 'CONSOLE') {
                return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Unable to execute copy command on self. Usage: ${prefix}copy ["@member"] `)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Unable to execute copy command on self.', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            }

        } else if (!copiedUser) {
            copiedUser = true;
            if (mode === 'CONSOLE') {
                console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Successfully enabled Copy Mode for ${mentionedMember.tag}`)}`)
                
                while (copiedUser) {
                    await message.channel.awaitMessages((m) => m.author.id === mentionedMember.id, { max: 1, errors: [''] })
                        .then(async msg => { 
                            if (copiedUser) {
                                let copiedMessage = msg.first().content;
                                if (copiedMessage.includes('@')) copiedMessage = copiedMessage.replace('@', '@-')
                                message.channel.send(copiedMessage)
                                
                            }
                        })
                }
                
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Enabled Copy-Mode', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                message.channel.send(embed)

                while (copiedUser) {
                    await message.channel.awaitMessages((m) => m.author.id === mentionedMember.id, { max: 1, errors: [''] })
                        .then(async msg => { 
                            if (copiedUser) {
                                let copiedMessage = msg.first().content;
                                if (copiedMessage.includes('@')) copiedMessage = copiedMessage.replace('@', '@-')
                                message.channel.send(copiedMessage)
                                
                            }
                        })
                }
                return;
            }

        } else if (copiedUser) {

            copiedUser = false 
            if (mode === 'CONSOLE') {
                return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Successfully disabled Copy Mode.`)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Disabled Copy-Mode', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            }

        } 

    }
}
    