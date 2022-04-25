const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('commands')
		.setDescription('command list'),
	async execute(interaction) {

            interaction.reply({ content: `
            Hello! 
            I am POMPO the robot AI. My functionality is pretty limited now on this server, but my owner and creator Leo are always working on my additional functionality. So soon I could be more intelligent, versatile and multifunctional as my real-life prototypes. Below you can check my main commands at this time. POM-POM.
            All POMPO available commands:
            /commands – show all POMPO available commands     
            /check_whitelist - check if you are in the whitelist. enter the command in the format 
            /check_whitelist
            /login - log to the server according the data you share in the whitelist form and get a role on the server! 
            /login [the first four characters of the linked wallet]*
                        * Square brackets are not required.
            `, ephemeral: true });
	},
      
};