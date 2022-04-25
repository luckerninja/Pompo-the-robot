const mysql = require("mysql2/promise");

const { bot } = require("./bot_return");

bot.on("ready", () => {
    console.log("bot is ready");

})

bot.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	const command = bot.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}


});
