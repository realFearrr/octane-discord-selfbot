const { mode } = require('../../config.json')
const clc = require('cli-color')

module.exports = {
    name: 'coinflip',
    aliases: ['cf'],
    async execute(message, args) {
        // let result = Math.floor(Math.random() * 2) > 1 ? "Heads" : "Tails"
        const cfElements = ["Heads", "Tails"]

        if (mode === 'CONSOLE') {
            setTimeout(() => {
                console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Result: ${getRandomElement(cfElements)}`)}`)
            }, 1000);

            return;
        } else {
            let embed = new Discord.MessageEmbed()
                .setAuthor('Attempting to flip coin...', 'https://cdn.discordapp.com/attachments/816363507482230844/849760080211738644/loading.gif')
                .setColor('2f3136') 
            message.channel.send(embed).then(async msg => {

                setTimeout(() => {

                    msg.edit(embed.setAuthor(getRandomElement(cfElements), 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png'))

                }, 2500);

            })
        }
        

    }
}

function getRandomElement(cfElements) {

    return cfElements[Math.floor((Math.random() * cfElements.length))];

}
