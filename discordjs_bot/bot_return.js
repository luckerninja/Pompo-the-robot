const fs = require('fs');

const Discord = require("discord.js");

const config = require("./config.json");

const intents = new Discord.Intents(32767);

const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	bot.commands.set(command.data.name, command);
}

bot.login(config.test_token);

module.exports.bot = bot;