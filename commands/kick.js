module.exports =
{
    name: 'kick',
    description: 'Kick a specific player from the server',
    execute(message, args) {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to kick them!');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`Are you sure you want to kick: ${taggedUser.username}?`);
    },
};