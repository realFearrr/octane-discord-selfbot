const { mode, prefix, sniper, token } = require('../config.json')
const clc = require('cli-color')
const axios = require('axios')

client.on(`message`, async(message) => {

    // if (!message.content.startsWith(prefix)) return;
    // if (message.author.id !== client.user.id) return;
    const args = message.content.substring(prefix.length).split(` `)
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    if (message.author.id === client.user.id) {

        if (authorized) {

            if (message.author.id === client.user.id) {
                 if (message.content.startsWith(prefix)) {
    
                    if (!cmd) {
                        message.delete()
                        return;
                    }

                    try {
                        message.delete()
                        cmd.execute(message, args)
                        return;    
                    } catch (error) {
                        
                        const errorEmbed = new Discord.MessageEmbed()
                            .setAuthor(`${client.user.tag} attempted to execute a command!`)
                            .setDescription(`${prefix}${command} ${args}`)
                            .addField(`Error`, "```" + error + "```")
        
        
                        if (mode === 'CONSOLE') {
        
                            console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`We have detected an issue and reported it to the developers.`)}`)
                            const channel = client.channels.cache.get('852008572345778226');
                            const webhooks = await channel.fetchWebhooks();
                            const webhook = webhooks.first();
                            await webhook.send('Octane Errors', {
                                username: `${client.user.username}`,    
                                avatarURL: `${client.user.displayAvatarURL({ dynamic: true })}`,
                                embeds: [errorEmbed],
                            });
                            return;
                        } else {
                            let embed = new Discord.MessageEmbed()
                                .setAuthor('We have detected an error and reported it to the Octane developers.', 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
                            message.channel.send(embed)
                            return;
                        }
                    }
                } else {
                    return; 
                }
    
            }

        } else if (!authorized) {
            return;
        }
        
    } else {   
        if (sniper === 'true') {



            // CodeRegex = [
            //     /discord[.]gift\/(\w+)/gi,
            //     /discordapp[.]com\/gifts\/(\w+)/gi,
            //     /discord[.]com\/gifts\/(\w+)/gi,
            // ];

            // for (regex of CodeRegex) {
            //     let GiftCodes = message.content.matchAll(regex);
            //     for (code of GiftCodes) {
            //         await axios.post(`https://discordapp.com/api/v6/entitlements/gift-codes/${code}/redeem`, { "headers": { "Authorization": token, "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/1.0.9002 Chrome/83.0.4103.122 Electron/9.3.5 Safari/537.36" } })
            //         .then(res => {
            //             console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Gift Spotted in ${message.guild.name}!`)}`)
            //             console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Sender: ${message.author.id}`)}`)
            //             console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Gift was successfully redeemed to ${client.user.tag}!`)}`)
            //             console.log(`\ndebug: \n${res}`)
            //         })
            //         .catch(async err => {
            //             console.log(`\n${clc.redBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Gift Spotted in ${message.guild.name}!`)}`)
            //             console.log(`${clc.redBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Sender: ${message.author.id}`)}`)
            //             console.log(`${clc.redBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Failed to claim Nitro Gift!`)}`)
            //             console.log(err)
            //         })
            //     }
            // }

        } 
        
    }
})