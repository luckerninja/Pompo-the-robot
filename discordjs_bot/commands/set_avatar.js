const { SlashCommandBuilder } = require('@discordjs/builders');
const { isPermission } = require('../functions/isPermission');
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set_avatar')
		.setDescription('set avatar for bot')
        .addStringOption(option => option.setName('link').setDescription('link for bot avatar, enter name of image').setRequired(true)),

	async execute(interaction) {

		if(!await isPermission(interaction, '@pompo')) return;

        interaction.client.user.setAvatar(`./avatars/${interaction.options.get('link').value}.png`);

		interaction.reply({ content: `Avatar set. ${config.quote}`, ephemeral: true });
	
	},
};
