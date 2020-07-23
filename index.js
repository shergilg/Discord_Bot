/* eslint-disable semi */
/* eslint-disable brace-style */
// Node.js module
const fs = require('fs');

// Discord module
const Discord = require('discord.js');
// -------------------------------------------------------------------------------------------------------
const perspective = require('./perspective');

require('dotenv').config();

// Set your emoji "awards" here
const emojiMap = {
	'FLIRTATION': '💋',
	'TOXICITY': '🧨',
	'INSULT': '👊',
	'INCOHERENT': '🤪',
	'SPAM': '🐟',
};

// Store some state about user karma.
// TODO: Migrate to a DB, like Firebase
const users = {};

/**
 * Kick bad members out of the guild
 * @param {user} user - user to kick
 * @param {guild} guild - guild to kick user from
 */
async function kickBaddie(user, guild) {
	const member = guild.member(user);
	if (!member) return;
	try {
		await member.kick('Was a jerk');
	} catch (err) {
		console.log(`Could not kick user ${user.username}: ${err}`);
	}
}

/**
 * Analyzes a user's message for attribues
 * and reacts to it.
 * @param {string} message - message the user sent
 * @return {bool} shouldKick - whether or not we should
 * kick the users
 */
async function evaluateMessage(message) {
	let scores;
	try {
		scores = await perspective.analyzeText(message.content);
	} catch (err) {
		console.log(err);
		return false;
	}

	const userid = message.author.id;

	for (const attribute in emojiMap) {
		if (scores[attribute]) {
			message.react(emojiMap[attribute]);
			users[userid][attribute] =
				users[userid][attribute] ?
					users[userid][attribute] + 1 : 1;
		}
	}
	// Return whether or not we should kick the user
	return (users[userid]['TOXICITY'] > process.env.KICK_THRESHOLD);
}

/**
 * Writes current user scores to the channel
 * @return {string} karma - printable karma scores
 */
function getKarma() {
	const scores = [];
	for (const user in users) {
		if (!Object.keys(users[user]).length) continue;
		let score = `<@${user}> - `;
		for (const attr in users[user]) {
			score += `${emojiMap[attr]} : ${users[user][attr]}\t`;
		}
		scores.push(score);
	}
	console.log(scores);
	if (!scores.length) {
		return '';
	}
	return scores.join('\n');
}
// -------------------------------------------------------------------------------------------------------
// create a new Discord client(bot)
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
	const command = require(`./commands/${file}`);
	bot.commands.set(command.name, command);
}

const { prefix, token, channelID} = require('./config/default.json');
const cooldowns = new Discord.Collection();

bot.on('ready', ()=>
	console.log('This bot is online!'));


bot.on('message', message =>
{
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if(command.guildOnly && message.channel.type != 'text')
	{
		return message.reply('I can\'t execute that command inside DMs!')
	}
	if(command.args && !args.length)
	{
		let reply = `You didn't provide any arguments, ${message.author}!`

		if(command.usage)
		{
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
		}

		return message.channel.send(reply)
	}

	if(!cooldowns.has(command.name))
	{
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;


	if (timestamps.has(message.author.id))
	{
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime)
		{
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(
				`Please wait ${timeLeft.toFixed(1)} more second(s) before resusing the '${command.name
				}' command`);
		}
	}
	else
	{
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}
	try
	{
		command.execute(message, args);
	}
	catch (error)
	{
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});

bot.login(token);