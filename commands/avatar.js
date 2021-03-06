/* eslint-disable semi */
module.exports =
{
	name: 'avatar',
	aliases: ['icon', 'pfp'],
	description: 'Display user\'s avatar',
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: 'png', dynamic: true })}>`;
		})

		message.channel.send(avatarList);

	},
};