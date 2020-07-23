module.exports =
{
	name: 'server',
	description: 'Details about the server',
	guildOnly: true,
	execute(message, args) {
		message.channel.send(`This server's name is: ${message.guild.name}
Total members: ${message.guild.memberCount}
Created on: ${message.guild.createdAt}
The Region of the server: ${message.guild.region}`);
	},
};