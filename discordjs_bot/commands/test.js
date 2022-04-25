const { SlashCommandBuilder } = require('@discordjs/builders');
const { isPermission } = require('../functions/isPermission');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('test command'),
        
	async execute(interaction) {

        if(!await isPermission(interaction, '@pompo')) return;

            // channel = await interaction.member.createDM('tututu');
            // channel.send('tututut')

            interaction.reply({ content: 'Only you! :)', ephemeral: true });
	
	},
};
