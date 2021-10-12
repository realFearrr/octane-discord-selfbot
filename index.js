const Discord = require("discord.js-light");
const client = new Discord.Client({
    cacheGuilds: true,
    cacheChannels: true,
    cacheOverwrites: true,
    cacheRoles: true,
    cacheEmojis: true,
    cachePresences: true
});

const fs = require('fs')
const clc = require('cli-color')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const { token, prefix } = require(`./config.json`)
let config = require('./config.json')

global.client = client; 
global.Discord = Discord;


client.commands = new Discord.Collection();

const utils = require(`./utils`);
client.login(token).catch(async err => {
    
    readline.question(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Email: `)}`, email => {
        console.clear()
        console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Email: ${email}`)}`)

        readline.question(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Password: `)}`, password => {
            console.clear()
            console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Email: ${email}`)}`)
            console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Password: ${password}`)}`)

            attemptLoginUsingCredentials(email, password).then(res => {
                client.login(res.data.token)

                config.token = res.data.token;
                config.email = email;
                config.password = password;
                config = JSON.stringify(config).replace(/\{/g, "{\n").replace(/,/g,",\n")
                
                fs.writeFileSync(`./config.json`, config);

            })
        })
    })
    

})

const commandFolders = fs.readdirSync(`./commands/`)
for (const _folder of commandFolders) {
    let currentDirectory = fs.readdirSync(`./commands/${_folder}`)
    for (const _file of currentDirectory) {
        if (!_file.endsWith('.js')) continue
        const getCommands = require(`./commands/${_folder}/${_file}`)
        client.commands.set(getCommands.name, getCommands)
    }
}

fs.readdirSync("./events/").forEach((file) => {
    const events = fs.readdirSync("./events/").filter((file) =>
        file.endsWith(".js")
    );

    for (let file of events) {
        let pull = require(`./events/${file}`);

        if (pull.name) {
            client.events.set(pull.name, pull);
        } else {
            continue;
        }
    }
});

global.throwError = function (type, err, usage, message) {
    if (type === 'CONSOLE') {

		return console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`${err} Usage: ${prefix}${usage}`)}`)

	} else {

		let embed = new Discord.MessageEmbed()  
			.setAuthor(`${err}`, 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
			.setColor('2f3136')
		return message.channel.send(embed)

	}
}

global.sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


