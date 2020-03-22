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

    if (!bot.commands.has(command)) return;

    try
    {
        bot.commands.get(command).execute(message, args);
    }
    catch (error)
    {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
})

bot.login(token);