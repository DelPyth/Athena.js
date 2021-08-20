# What is this bot?
This bot is a simple fun/tool bot. No moderation! I think there's enough moderation bots out there and to add my own way of doing it would just confuse a lot of people, so no moderation, just simple stuff.
The list of commands will keep growing and growing, for now there's only four. Adding more is really easy, just add your own documentation, the command function, include it into `index.js`, and you're on your way.

# Why in JavaScript?
I found it to be easier on the mind:
- I don't have to worry about the confusing (to me, mostly because I don't fucking care about it) nature of the @property thing in Python.
- I'd rather not work with C# or C just for a discord bot, mostly because I'm in experianced.
- [AutoHotkey](https://www.autohotkey.com/), which I normally use for nearly every project, doesn't have an updated (or even usable) library for Discord's API. Nor a simple one, at least for now ;)

# How do I use this?
Super simple:
1. You can download the project one of two ways:
	- Click on the "Code" button with the download symbol, and click "Download Zip".
	- Go to the "Releases" second on the right and click a newer version to save.
2. Save the file where ever you want and extract it to a folder you'd like.
3. Go to [NodeJS's website](https://nodejs.org/) and click the download button (depending on screen size, you might have to scroll). Save it somewhere and install it to your computer.
4. Run `init.sh` and give it the information it asks for. Don't worry, all it does it create a new JSON file for your bot to work with.
5. Run `run.sh` and let the bot do its thing.
I always check to make sure all of my projects are running properly before sharing them publicly, if you run into an error trying to start the bot, try looking on Google for an error before sprinting to me.

# What are these files?
|File Name       |Location            |Use                                                                                                                                                                                                                                                         |
|----------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|app.js          |.\app.js            |The main bot script, this is what's run to get the bot started.                                                                                                                                                                                             |
|run.sh          |.\run.sh            |This is what you should run. If you can't run a .sh file install Git Shell or rename it to `run.bat` and go from there.                                                                                                                                     |
|clean.js        |commands\clean.js   |A text cleaner. Soon to add a custom user exception evaluation for users to set their own cleaning stuff.                                                                                                                                                   |
|derpi.js        |commands\derpi.js   |Derpibooru post finder. Bascically searches Derpibooru for an image based on tags you give. If the current channel is NSFW, it will use the "everything" filter, otherwise uses the default filter.                                                         |
|eval.js         |commands\eval.js    |An eval command. If you're going to use this command, you MUST only allow your own user ID. Recommended to disable altogether.                                                                                                                              |
|help.js         |commands\help.js    |The "help" command for the bot.                                                                                                                                                                                                                             |
|index.js        |commands\index.js   |In order for JavaScript to include multiple files.                                                                                                                                                                                                          |
|reply.js        |commands\reply.js   |Repeat a message back, just says "Hi" if nothing was given.                                                                                                                                                                                                 |
|clean.json      |cfg\clean.json      |The "algorithm" used to clean up some text. You set this yourself.                                                                                                                                                                                          |
|eval.json       |cfg\eval.json       |The list of replies for when someone besides the bot owner is trying to use the command.                                                                                                                                                                    |
|private.json    |cfg\private.json    |Private information you should NEVER give to anyone. `private.bot` is the object for all of the bot's info (as well as the owner ID). While the `commands` object is used for controlling private information tied to specific commands such as an API key. |

# What lies ahead?
I've got plans for many things, new commands, new tools, etc.
- Modify command parameters to dynamically create help string.
- Add more commands:
  - Google Search
  - Calculator
  - Dictionary
  - Thesaurus
  - Reminders
  - Music Player
- Create INIT.SH to create CFG/PRIVATE.JSON for bot.
