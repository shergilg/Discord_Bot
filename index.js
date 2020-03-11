const Discord = require('discord.js');
const bot = new Discord.Client();
const {prefix, token, channelID} = require("./config/default.json");

bot.on('ready', ()=>
    console.log("This bot is online!"));
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
        case 'hewo':
            message.reply("Hiya :3");
            break;
        case 'say':
            if (!args[1]){
                message.reply("Empty message!!!")
            }
            else{
                message.channel.send(args[1]);
            }
        default:
            break;
    }
})

bot.login(token);