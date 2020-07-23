module.exports =
{
	name: 'user-info',
	description: 'Information for the user',
	execute(message, args) {
		message.channel.send(`Your username: ${message.author.username}
Your ID: ${message.author.id}`);
	},
};