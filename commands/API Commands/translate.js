const tr = require('@iamtraction/google-translate')
const clc = require('cli-color')

const { mode, prefix } = require('../../config.json')

module.exports = {
    name: 'translate',
    aliases: ['tr'],
    async execute(message, args) {
        const attemptTranslate = args.slice(2).join(' ');

        if (!attemptTranslate) {

            if (mode === 'CONSOLE') {
                return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Missing Parameter "text". Usage: ${prefix}translate (language FROM) (language TO) ["text string"] `)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Missing Parameter "text".', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            }

        }

        const toTranslate = await tr(attemptTranslate, { from: `${args[0]}`, to: `${args[1]}` })

            .then(res => {

                if (mode === 'CONSOLE') {
                    console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Input (${args[0]}): ${attemptTranslate}`)}`)
                    console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Output (${args[1]}): ${res.text}`)}`)
                    return;
                } else {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor('International Translator', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                        .addField('Input', `${attemptTranslate}`, true)
                        .addField('Output', `${res.text}`, true)
                        .setThumbnail('https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')            
                        .setColor('2f3136')
                    return message.channel.send(embed)
                }

            })
            .catch(error => {

                if (mode === 'CONSOLE') {
                    console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Missing Parameter(s) Detected`)}`)
                    console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`${error}`)}`)
                    return 
                } else {
                    let emb = new Discord.MessageEmbed()
                        .setAuthor('International Translator', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                        .addField('Missing Parameter(s) Detected', error, true)
                        .setThumbnail('https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')            
                        .setColor('2f3136')
                    return message.channel.send(emb)
                }

            })

    }
}

