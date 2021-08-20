const rules = require("..\\cfg\\clean.json");

module.exports = {
	'name': 'clean',
	'description': "Clean some text of some common obscurities based on rules.",
	'usage': '/clean <text>',
	'split_args': false,
	'add_help': true,
	'args':
	[
		{
			'name': 'text',
			'use': 'The URL to clean up.'
		}
	],
	async execute(client, msg, params)
	{
		// If we get a blank message, just return an error.
		if ((params == null) || (params == ""))
		{
			return "This is empty. You must provide some text to parse.";
		}

		// We use `clean.json` to allow custom rules without a massive amount of lines doing the same thing over and over.
		let result = params;
		for (let i = 0; i < rules.length; i++)
		{
			const rule = rules[i];
			result = result.replace(new RegExp(rule[0][0], rule[0][1]), rule[1] == null ? "" : rule[1]);
		}
		msg.inlineReply(result);
		return null;
	}
}
