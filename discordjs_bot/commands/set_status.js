const { SlashCommandBuilder } = require('@discordjs/builders');
const { isPermission } = require('../functions/isPermission');
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_status')
		.setDescription('set status for bot')
        .addStringOption(option => option.setName('status').setDescription('idle/online/invisible').setRequired(true)),

	async execute(interaction) {

		if(!await isPermission(interaction, '@pompo')) return;

        interaction.client.user.setStatus(interaction.options.get('status').value);

		interaction.reply({ content: `Status set. ${config.quote}`, ephemeral: true });
	
	},
};
