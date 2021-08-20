const { MessageEmbed } = require('discord.js');
const invite = require("..\\cfg\\private.json").bot.invite;

module.exports = {
	'name': 'help',
	'description': "Display a list of available commands.",
	'usage': '/help [cmd]',
	'split_args': false,
	'args':
	[
		{
			'name': 'cmd',
			'use': "Command to explain into further detail."
		}
	],
	async execute(client, msg, params)
	{
		const commands = client.commands

		const embed = new MessageEmbed()

		if (params !== "")
		{
			if (params in commands)
			{
				let curr_cmd = commands[params]
				embed.setTitle(curr_cmd.usage)
				embed.setDescription(`This command has ${curr_cmd.args.length} parameter(s).\n\
					All parameters surrounded in block brackets ("[" and "]") are optional.\n\
					All paramters surrounded in arrow brackets ("<" and ">") are required.`)
				for (const index in curr_cmd.args)
				{
					embed.addField(curr_cmd.args[index].name, curr_cmd.args[index].use);
				}
				embed.setFooter("I hope this helped, please talk to TopHatCat#3775 if you need more help or if this explaination is too confusing.")
			}
			else if (params.toLowerCase() === "invite")
			{
				embed.setTitle("Here's the invite for you to invite me to a server of yours!")
				embed.setDescription(invite);
				embed.setFooter("Be sure to talk to TopHatCat#3775 if you have any problems with me or if something went wrong.")
			}
			else
			{
				embed.setTitle("I don't know that command, sorry.")
				embed.setDescription("My list of commands are:")
				for (const key in commands)
				{
					embed.addField(commands[key].usage, commands[key].description);
				}
				embed.setFooter("Send a private message to TopHatCat#3775 to talk with my developer!")
			}
		}
		else
		{
			embed.setTitle("Hi, I'm DelBot. Did ya need something?")
			embed.setDescription("My list of commands are:")
			for (const key in commands)
			{
				embed.addField(commands[key].usage, commands[key].description);
			}
			embed.setFooter("Send a private message to TopHatCat#3775 to talk with my developer!")
		}

		embed.setColor(msg.guild.me.displayHexColor);
		msg.inlineReply({'embed': embed, 'allowedMentions': {'repliedUser': true}})
		return null;
	}
}
