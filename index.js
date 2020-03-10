const Discord = require('discord.js');
const bot = new Discord.Client();
const {prefix, token, channelID} = require("./config/default.json");

bot.on('ready', ()=>
{
    console.log("This bot is online!");
})

bot.on('message', message=>
{   
    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0])
    {
        case 'hello':
        case 'hey':
        case 'hi':
        case 'heyo':
        case 'hiya':
            message.reply("Hiya :3");
            break;
        default:
            break;
    }
})

bot.login(token);