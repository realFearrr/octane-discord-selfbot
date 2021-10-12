const { mode, prefix, token } = require('../../config.json');
const clc = require('cli-color');
const { default: axios } = require('axios');

module.exports = {
    name: 'hypesquad',
    aliases: ['hs'],
    async execute(message, args) {
        if (!args[0]) {
            
            if (mode === 'CONSOLE') {
                console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Invalid argument index. Usage: ${prefix}hypesquad ["bravery", "brilliance", "balance"]`)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Missing argument "text".', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            }

        }

        if (args[0]) args[0] = args[0].toLowerCase()
        let Houses = { brilliance: 2, bravery: 1, balance: 3 }

        if (!Houses[args[0]]) {

            if (mode === 'CONSOLE') {
                console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Invalid argument index. Usage: ${prefix}hypesquad ["bravery", "brilliance", "balance"]`)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Invalid Badge Type. ("bravery", "brilliance", "balance")', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')  
                return message.channel.send(embed)
            }

        }

    let { data } = await axios.post(`https://discord.com/api/v9/hypesquad/online`, {house_id: Houses[args[0]]}, { headers: { authorization: token, "Content-Type": "Application/JSON" } })
        .catch(error =>{
            if (error.response) {
                number = error.response.data.retry_after
                if (mode === 'CONSOLE') {
                    console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`You have been ratelimited!`)}`)
                    console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Try again in ${Math.round(number)} seconds.`)}`)
                    return
                } else {
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`You have been ratelimited for ${Math.round(number)} seconds`, 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                        .setColor('2f3136')  
                    return message.channel.send(embed)
                }
            }    
        })
        
    if (mode === 'CONSOLE') return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Successfully changed Hypesquad Badge to ${args[0]}`)}`)
    if (!mode === 'CONSOLE') {
        let embed = new Discord.MessageEmbed()
            .setAuthor(`Successfully changed Hypesquad Badge to ${args[0]}`, 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
            .setColor('2f3136')  
        return message.channel.send(embed)
    }
    }
}
