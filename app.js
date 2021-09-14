#!/usr/bin/env node

const Discord = require("discord.js");
const config = require(".\\cfg\\private.json");

// Since discord.js v12 doesn't have normal replies added, we add a simple library to append the ability to add replies.
// To send a reply. use msg.inlineReply(my_message);
// To just send a message into chat with no reply, use msg.channel.send();
require(".\\lib\\ExtendedMessage");

class DelBot
{
	/**
	 * @name __new
	 * @brief Create a new instance of DelBot
	 * @author TophatCat
	*/
	constructor()
	{
		this.client = new Discord.Client({
			'allowedMentions': {
				// set repliedUser value to `false` to turn off the mention by default
				'repliedUser': false
			}
		});
		this.client.commands = require('.\\commands');

		// When the bot has started up.
		this.client.on('ready', () => {
			console.log(`Logged in as ${this.client.user.tag}!`);
		});

		// When the bot gets a message.
		this.client.on('message', async (msg) => {
			// Disable if message is from a DM, if the channel isn't viewable by the bot, or if the message was from a bot.
			if (msg.channel.type === 'dm' || !msg.channel.viewable || msg.author.bot)
			{
				return null;
			}

			// Dynamically call command's handle function.
			let obj = this.register_command(msg);

			// If we have the command...
			if (obj.cmd in this.client.commands)
			{
				// If the command calls for its parameters to not be split up, join them back.
				if (this.client.commands[obj.cmd].split_args == false)
				{
					obj.args = obj.args.join(' ');
				}

				// Execute the command.
				let result = await this.client.commands[obj.cmd].execute(this.client, msg, obj.args);

				// If the command returned a string (this is what we use to replace "throw" in a promise function. Hey, it works, don't hit me).
				if ((typeof(result) !== 'undefined') && (result !== "") && (result !== null))
				{
					// Create a new embed to give the error.
					const embed = new Discord.MessageEmbed();
					embed.setDescription(result);

					// If the command doesn't want to add on additonal help, then we skip the title and help fields.
					if (('add_help' in this.client.commands[obj.cmd]) && (this.client.commands[obj.cmd].add_help == true))
					{
						embed.setTitle('Error!');
						embed.addField('Usage:', this.client.commands[obj.cmd].usage);
						embed.addField('For more help:', this.client.commands.help.usage);
					}
					embed.setColor('#B00020');
					msg.inlineReply({'embed': embed});
				}
			}
			return null;
		});

		// When an error occurs with the bot.
		this.client.on('error', async (err) => {
			console.error(err)
			process.exit(1);
		});

		// When the bot tries to reconnect to discord.
		this.client.on('reconnecting', async (msg) => {
			console.log(`Bot Reconnecting`)
		});

		// When the bot is back to being connected again.
		this.client.on('resume', async (msg) => {
			console.log(`Connected ${this.client.user.tag}`)
		});

		// When the bot disconnects (tends to happen when internet cuts).
		this.client.on('disconnect', async (msg) => {
			console.log(`Bot Disconnected`)
			process.exit(1);
		});

		// Make the bot log in to discord.
		this.client.login(config.bot.token);

		return this;
	}

	/**
	 * @name register_command
	 * @argument message The message to split and use for the commands.
	 * @returns Object with command and arguments.
	 * @brief Create a new instance of DelBot
	 * @author TophatCat
	*/
	register_command(message)
	{
		let args = message.content.slice(1).trim().split(/ +/g);
		let cmd = args.shift().toLowerCase();
		return {'args': args, 'cmd': cmd};
	}
}

const client = new DelBot();
