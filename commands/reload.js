const config = require("..\\cfg\\private.json").bot;
const responses = require("..\\cfg\\reload.json");

module.exports = {
	'name': 'reload',
	'description': "Reload a command. The bot owner is the only one to execute this.",
	'usage': '/reload <cmd>',
	'split_args': false,
	'args':
	[
		{
			'name': 'cmd',
			'use': "Command to reload."
		}
	],
	async execute(client, msg, params)
	{
		// If the command is not done by the bot's owner, throw an error.
		if (msg.author.id !== config.owner_id)
		{
			return "You are not the bot's owner."
		}

		// If we're not given a command to reload, throw an error.
		if (!params)
		{
			return "Please provide a command to reload."
		}

		// Set the command to lowercase...
		let command = params.toLowerCase();
		// If the command is this command, throw an error.
		if (command == "reload")
		{
			return responses[Math.floor(Math.random() * responses.length)];
		}

		// Try to remove the command and re-add it to our list of commands.
		try
		{
			delete require.cache[require.resolve(`.\\${command}.js`)];
			delete client.commands[command];
			client.commands[command] = require(`.\\${command}.js`);
		}
		catch (err)
		{
			return `Could not reload \`${command}\``
		}
		msg.inlineReply("Reload successful.");
		return null;
	}
}
