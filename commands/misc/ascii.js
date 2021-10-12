const clc = require("cli-color");
const figlet = require('figlet')

const { mode, prefix } = require('../../config.json')

module.exports = {
    name: 'ascii',
    async execute(message, args) {

        if (!args[0]) {

            if (mode === 'CONSOLE') {
                return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Missing argument "text". Usage: ${prefix}ascii ["text string"] `)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Missing argument "text".', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            }



        } else if (args[0]) {
            let msg = args.join(' ')
            
            figlet.text(msg, function(err, text) {
                if (err) {
                    return; 
                }
                if (text.length > 1000) {
                    
                    if (mode === 'CONSOLE') { 
                        return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`This command has a maximum string length of 1000 characters. Usage: ${prefix}ascii ["text string"] `)}`)
                    } else {
                        let embed = new Discord.MessageEmbed()
                            .setAuthor('This command has a maximum of 1000 characters.', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                            .setColor('2f3136')
                        return message.channel.send(embed)
                    }
                    
    
                }

                message.channel.send('```' + text + '```')
            })

        }
    }
}