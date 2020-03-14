const Discord = require('discord.js');
const bot = new Discord.Client();
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
        message.channel.send('pong');
    }
    else if (message.content.startsWith(`${prefix}server`))
    {
        message.channel.send(`This server's name is: ${message.guild.name}
Total members: ${message.guild.memberCount}
Created on: ${message.guild.createdAt}
The Region of the server: ${message.guild.region}`);
    }
    else if(message.content.startsWith(`${prefix}user-info`)){
        message.channel.send(`Your username: ${message.author.username}
Your ID: ${message.author.id}`);
    }

    /*else if (command.startsWith('args-info'))
    {
        if(!args.length)
            {
                return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
            }
        
        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }*/
    else if (command.startsWith('args-info')) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if (args[0] === 'foo')
        {
            return message.channel.send('bar');
        }

        message.channel.send(`First argument: ${args[0]}`);
    }
    else if (command === 'kick')
    {   
        if (!message.mentions.users.size)
        {
            return message.reply('You need to tag a user in order to kick them!');
        }
        const taggedUser = message.mentions.users.first();

        message.channel.send(`Are you sure you want to kick: ${taggedUser.username}?`);
    }
    else if (command === 'avatar')
    {
        if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
        }
    const avatarList = message.mentions.users.map(user =>
        {
            return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true})}>`;
        })
    
    message.channel.send(avatarList);
    }

    else if (command === 'prune')
    {
        const amount = parseInt(args[0])+1

        if (isNaN(amount))
        {
            return message.reply('that doesn\'t seem to be a valid number.')
        }
        else if (amount <= 1 || amount > 100)
        {
            return message.reply('you need to input a number between 1 and 99.')
        }

        message.channel.bulkDelete(amount, true).catch(err =>
            {
                console.error(err)
                message.channel.send('there was an error trying to prune messages in this channel!')
            })
    }
})


    /*switch(command)
    {
        case 'hello':
        case 'hey':
        case 'hi':
        case 'heyo':
        case 'hiya':
        case 'hewo':
        case 'heya':
            message.reply("Hiya :3");
            break;
        case 'say':
            if(!args.length)
            {
                return message.channel.send(`You didn't provide anything to say, ${message.author}`);
            }

            for(i in args)
            {
                message.channel.send(`${i} `);
            }
                break;
        case 'server':
            message.channel.send(`This server's name is: ${message.guild.name}
Total members: ${message.guild.memberCount}
Created on: ${message.guild.createdAt}
The Region of the server: ${message.guild.region}`);
            break;
        case 'membersince':
            message.channel.send(`Joined the server on: ${message.guild.joinedAt}`);
            break;
        case 'user-info':
            message.channel.send(`Your username: ${message.author.username}
Your ID: ${message.author.id}`);
            break;
        default:
            break;
    }*/


bot.login(token);