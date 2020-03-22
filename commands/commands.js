module.exports =
{
    name: 'commands',
    description: 'All the commands available',
    execute(message, args) {
        message.channel.send(`!avatar\n!kick\n!ping\n!prune\n!say(only works with one word so far)\n!server\n!user-info`);

    },
};