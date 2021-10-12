const { default: axios } = require('axios');
const clc = require('cli-color')
const { mode, prefix } = require('../../config.json')
const CC = require('currency-converter-lt');

module.exports = {
    name: 'convert',
    aliases: ['con'],
    async execute(message, args) {

    // convert <num> <from> <to>
    const usage = `convert <"value"> <"currency FROM"> <"currency TO">`;

    if (!args[0]) return throwError(mode, `Missing parameter "value" detected.`, usage, message);
    if (!args[1]) return throwError(mode, `Missing parameter "currency FROM" detected.`, usage, message);
    if (!args[2]) return throwError(mode, `Missing parameter "currency TO" detected.`, usage, message);

    args[1] = args[1].toUpperCase();
    args[2] = args[2].toUpperCase();

    try {
        let currencyConverter = new CC({from: `${args[1]}`, to: `${args[2]}`, amount: Number(args[0])})
        currencyConverter.convert().then(res => {
            if (mode === 'CONSOLE') {
                console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Input (${args[1]}): ${args[0]}`)}`)
                console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Output (${args[2]}): ${res}`)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Currency Converter', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setThumbnail('https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                    .addField(`Input (${args[1]})`, args[0], true)
                    .addField(`Output (${args[2]})`, res, true)
                return message.channel.send(embed)
            }
        })
    } catch (e) {
        console.error(e)
    }
        
    }
}