const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config = require("..\\cfg\\private.json").commands.derpi;
const cache = [];

module.exports = {
	'name': 'derpi',
	'description': "Search Derpibooru for an image, gif, video etc.",
	'usage': '/derpi <query>',
	'split_args': false,
	'args':
	[
		{
			'name': 'query',
			'use': 'The query to search.'
		}
	],
	async execute(client, msg, params)
	{
		let key = config.key;
		let item_count = 10;
		let filter = msg.channel.nsfw == true ? 56027 : 37431;
		let query = encodeURI(params.replace(" ", "+"));

		let url = `https://www.derpibooru.org/api/v1/json/search/images?key=${key}&per_page=${item_count}&filter_id=${filter}&q=${query}`

		let json = await fetch(url).then((res) => res.json());

		let current_image = json.images[Math.floor(Math.random() * json.images.length)];
		if (json.images.length == 0)
		{
			if (params.search("_"))
			{
				return "I don't think you know how Derpibooru's search works.\nDerpibooru's search works like so:\nTags use spaces to seperate words: `twilight sparkle`.\nCommas are used to sepearate tags: `cute, sleeping`."
			}
			return "Sorry, couldn't find any posts with those tags.";
		}

		const embed = new MessageEmbed();
		embed.setTitle(current_image.name);
		if (json.images.length == 1)
		{
			embed.setDescription("This is the only post with those tags, try broadening your search.");
		}
		embed.setURL('https://www.derpibooru.org/images/' + current_image.id);
		embed.setImage(current_image.representations.full);
		embed.setFooter(`Score: ${current_image.score} | Uploaded: ${current_image.created_at}`)
		msg.inlineReply({'embed': embed});
		return null;
	}
}
