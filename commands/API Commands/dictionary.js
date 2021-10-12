const axios = require('axios')
const { mode, prefix } = require('../../config.json')
const clc = require('cli-color')

module.exports = {
    name: 'define',
    aliases: ['def', 'dictionary'],
    async execute(message, args) {
        
        const errorEmbed = new Discord.MessageEmbed()
            .setAuthor(`${client.user.tag} attempted to execute a command!`, 'https://images-ext-1.discordapp.net/external/cUMVjvcBz3VXec2N6JpfTp_oStyfYWoNlZYLEIUazFo/https/i.postimg.cc/gcTfsMD4/console.png')
            .setDescription(`${prefix}def ${args.slice(0).join(' ')}`)
            .setColor('2f3136')


        let apiKey = '00533d5b-072f-485f-be08-fe484db01857';
        let defQuery = args.slice(0).join(' ')

        if (!defQuery) {

            if (mode === 'CONSOLE') {
                return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Missing argument "query". Usage: ${prefix}define ["text string"] `)}`)
            } else {
                let embed = new Discord.MessageEmbed()
                    .setAuthor('Missing argument "text".', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                    .setColor('2f3136')
                return message.channel.send(embed)
            }

        }


        await axios
            .get(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${defQuery}?key=${apiKey}`)
            .then(async res => {

                data = JSON.parse(JSON.stringify(res.data));
                let finalDef = data[0].shortdef;

                try {
                    if (mode === 'CONSOLE') {

                        console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Input (Word/Phrase): ${data[0].meta.id}`)}`)
                        console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Output (Definition): ${finalDef}`)}`)
    
                        return;
                    } else {
                        let e = new Discord.MessageEmbed() 
                            .setAuthor('Dictionary', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                            .addField(`Definition of ${data[0].meta.id}`, finalDef + ".", true)
                            .setFooter('Dictionary provided by the Merriam-Webster API.')
                            .setThumbnail('https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                            .setColor('2f3136')
                        return message.channel.send(e) 
                    }
                } catch (error) {
                    console.log( error )
                    await errorLogging(errorEmbed)
                }
                

            })

    }
}


async function errorLogging(errorEmbed) {

    if (mode === 'CONSOLE') {

        console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`We have detected an issue and reported it to the developers.`)}`)

        const channel = await client.channels.fetch('852008572345778226');

        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();

        await webhook.send('', {
            username: `${client.user.username}`,    
            avatarURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
            embeds: [errorEmbed],
        });
    
        return;

    }

}