const { SlashCommandBuilder } = require('@discordjs/builders');
const { isPermission } = require('../functions/isPermission');
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_presence')
		.setDescription('set presence for bot')
        .addStringOption(option => option.setName('activity').setDescription('activity custom').setRequired(true))
        .addStringOption(option => option.setName('status').setDescription('idle/online/invisible').setRequired(true)),

	async execute(interaction) {

	   if(!await isPermission(interaction, '@pompo')) return;

       interaction.client.user.setPresence({ activities: [{ name: interaction.options.get('activity').value }], status: interaction.options.get('status').value});

	   interaction.reply({ content: `Presence set. ${config.quote}`, ephemeral: true });

	},
};

// random status generator https://www.youtube.com/watch?v=hSXDho-Qm3U