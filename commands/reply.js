module.exports = {
	'name': 'reply',
	'description': "Display a greeting.",
	'usage': '/reply [message]',
	'split_args': false,
	'args':
	[
		{
			'name': 'message',
			'use': 'Message to repeat.'
		}
	],
	async execute(client, msg, params)
	{
		msg.inlineReply(params.length < 1 ? "Hi" : params);
		return null;
	}
}
