const { SlashCommandBuilder } = require('@discordjs/builders');
const messageFunctions = require('../functions/message');
const { isPermission } = require('../functions/isPermission');
const config = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('tell_pompo')
		.setDescription('Sends messages to channels on behalf of a bot')
        .addStringOption(option => option.setName('channel_id').setDescription('send to this channel').setRequired(true))
        .addStringOption(option => option.setName('message_id').setDescription('send this message').setRequired(true))
		.addStringOption(option => option.setName('put_away_pompom').setDescription('type something to put away POM-POM')),
        
	async execute(interaction) {

        if(!await isPermission(interaction, '@pompo')) return;

        messageFunctions.send_message_to_channel(interaction, 
		interaction.options.get("message_id").value, 
		interaction.options.get("channel_id").value,
		interaction.options.get("put_away_pompom"));
		
		interaction.reply({ content: `POMPO sent message. ${config.quote}`, ephemeral: true });
		
	},
};

