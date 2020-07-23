module.exports =
{
	name: 'commands',
	description: 'All the commands available',
	usage: '[command name]',
	execute(message, args) {
		message.channel.send('!avatar\n!kick\n!ping\n!prune\n!say\n!server\n!user-info\n!icon');
	},
};