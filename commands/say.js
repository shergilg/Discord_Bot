module.exports =
{
	name: 'say',
	description: 'say something',
	args: true,
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		let saying = '';
		for (let i = 0; i < args.length; i++) { saying += args[i] + ' '; }
		message.channel.send(`${saying}`);
	},
};