const { mode, prefix } = require('../../config.json')
const clc = require('cli-color')

module.exports = {
    name: '8ball',
    aliases: ['magicball'],
    async execute(message, args) {

        const question = args.slice(0).join(' ')

        if (mode === 'CONSOLE') {

            if (!question) {
                return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Missing argument "text". Usage: ${prefix}8ball ["text string"] `)}`)
            }

            console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Original Question: ${question}`)}`)
            console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Answer: ${getNewAnswer(eightBallAnswers)}`)}`)
            return 
        } else {

            if (!question) {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Missing argument "text".', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            } 

            let embed = new Discord.MessageEmbed()
                .setAuthor('Magic 8-Ball', 'https://cdn.discordapp.com/attachments/809063667156254761/836291311794389032/8ball.png')
                .setColor('2f3136')
                .addField('Original Question', question, true)
                .setThumbnail('https://cdn.discordapp.com/attachments/809063667156254761/836290400406601798/8ball.png')
                .addField('Answer', getNewAnswer(eightBallAnswers), true)
            return message.channel.send(embed)

        }

        
    }
}

const eightBallAnswers = [
    "As I see it, yes",
    "It is certain",
    "It is decidedly so",
    "Most likely",
    "Outlook good",
    "Signs point to yes",
    "Without a doubt",
    "Yes",
    "Yes - definitely",
    "You may rely on it",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
]

var oldAnswer;

function getNewAnswer(eightBallAnswers) {
    newAnswer = Math.floor(Math.random() * eightBallAnswers.length)
    if (newAnswer === oldAnswer) newAnswer + Math.floor(Math.random() * 2);
    oldAnswer = newAnswer
    return eightBallAnswers[newAnswer];
}