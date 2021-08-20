const replies = require("..\\cfg\\eval.json");
const owner_id = require("..\\cfg\\private.json").bot.owner_id;
var safe_eval = require('safe-eval');

module.exports = {
	'name': 'eval',
	'description': "Evaluate an expression and execute it. This command can only be used by the bot owner.",
	'usage': '/eval <expression>',
	'split_args': false,
	'add_help': false,
	'args':
	[
		{
			'name': 'expression',
			'use': 'The expression to parse.'
		}
	],
	async execute(client, msg, params)
	{
		// If the author of the message wasn't the bot owner (YOU), return a message.
		if (msg.author.id !== owner_id)
		{
			return replies[Math.floor(Math.random() * replies.length)];
		}

		let evaled;
		try
		{
			// Safe Eval.
			// I don't know if this is actually at least 99% safe, all I know is it said it's safer than normal eval, so I'll take it.
			// If you can provide with a better solution, be my guest.
			evaled = safe_eval(params);
		}
		catch (err)
		{
			return err.toString();
		}

		if (typeof(evaled) !== "string")
		{
			// This inspects it (???)
			evaled = require("util").inspect(evaled);
		}

		msg.channel.send(clean(evaled), {'code': 'xl'});
		return null;
	}
}

// This cleans of the returned text. I don't know what char(8203) is, but it does something with it.
function clean(text)
{
	if (typeof(text) === 'string')
	{
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	}
	return text;
}
