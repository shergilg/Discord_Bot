const fs = require('fs');

const Discord = require('discord.js');

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const {prefix, token, channelID} = require("./config/default.json");

bot.on('ready', ()=>
    console.log("This bot is online!"));


bot.on('message', message =>
{
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args =message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(message.content.startsWith(`${prefix}ping`))
    {
        bot.commands.get('ping').execute(message, args);
    }
    else if (message.content.startsWith(`${prefix}server`))
    {
        bot.commands.get('server').execute(message, args);
    }
    else if (command.startsWith('say')) {
        bot.commands.get('say').execute(message, args);
    }
    else if (command === 'kick')
    {   
        bot.commands.get('kick').execute(message, args);
    }
    else if (command === 'avatar')
    {
        bot.commands.get('avatar').execute(message, args);
    }
    else if (command === 'prune')
    {
        bot.commands.get('prune').execute(message, args);
    }
    else if (command === 'user-info') {
        bot.commands.get('user-info').execute(message, args);
    }
    else if (command === 'commands') {
        bot.commands.get('commands').execute(message, args);
    }
})

bot.login(token);