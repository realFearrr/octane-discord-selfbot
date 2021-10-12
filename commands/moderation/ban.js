const { mode, prefix } = require('../../config.json');
const clc = require('cli-color');

module.exports = {
	name: 'ban',
	async execute(message, args) {

		if (!message.member.hasPermission('BAN_MEMBERS')) return throwError(mode , 'Insufficient Permissions!', 'ban <"user"> ["reason"]', message)
		
		let banReason = args?.slice(1).join(' ');
		const mentionedMember = message.mentions?.members?.first() || await message.guild.members.fetch(args[0])
		const totalGuildBans = await message.guild.fetchBans();
		const memberBans = totalGuildBans.get(mentionedMember.id)

		if (!banReason) banReason = 'N/A';
		if (!mentionedMember) return throwError(mode, `Missing parameter "member" detected!`, 'ban <"user"> ["reason"]', message)
		if (!args[0]) return throwError(mode, `Missing parameter "member" detected!`, 'ban <"user"> ["reason"]', message)
		if (!mentionedMember.bannable) return throwError(mode, 'Specified parameter "member" is not bannable.', 'ban <"user"> ["reason"]', message)
		if (memberBans) return throwError(mode, 'Specified parameter "member" is already banned from this guild.', 'ban, <"user"> ["reason"]', message)
		if (mentionedMember.id === client.user.id) return throwError(mode, 'Specified parameter "member" cannot equal client user.', ' ban <"user"> ["reason"]', message)
		if (message.channel.type === 'dm' || message.channel.type === 'group') return throwError(mode, 'Unable to execute command "ban" in group/dm channel.', ' ban <"user"> ["reason"]', message)

		try {
			
			message.guild.members.ban(mentionedMember)

			if (mode === 'CONSOLE') {

				console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`User ${mentionedMember.user.tag} (${mentionedMember.user.id}) was successfully terminated from ${message.guild.name}.`)}`);
				return 

			} else {

				let embed = new Discord.MessageEmbed()
					.setAuthor(`User ${mentionedMember.user.tag} (${mentionedMember.user.id}) was successfully terminated.`, 'https://cdn.discordapp.com/attachments/762342834820350023/847000607436701697/image0.png')
					.setColor('2f3136')
				return message.channel.send(embed)
				
			}

		} catch (error) {
			
			console.log(`\n${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`Internal error occurred; see below for comp.`)}`);
			console.log(`${clc.blueBright('Octane')} ${clc.blackBright('-')} ${clc.whiteBright(`${error}`)}`);
			return

		}


	}

}	