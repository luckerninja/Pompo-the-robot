const mysql = require("mysql2/promise");
const config = require("../config.json");

const DB_connect = async () => {    

    const config = require("../config.json");

    const conn = await mysql.createConnection({
        host: config.host, 
        user: config.user,
        database: config.database,
        password: config.password
    });

    return conn;
}

const discord_check = async (discord) => {    

    const conn = await DB_connect();
    const query = "SELECT * FROM `whitelist` WHERE `discord`= '" + discord + "'";


    result = await conn.execute(query);

    conn.end(err => {
        if(err) {
            console.log(err);
            return err;
        } else {
            console.log("Database ------- OK");
        }
    })

    return result;
}

const login_whitelist = async (discord, wallet_sub, interaction) => {

    const author = interaction.user;

    const guild = interaction.guild;

    let guild_member = interaction.member;

    const conn = await DB_connect();
    const query = "SELECT * FROM `whitelist` WHERE `discord`= '" + discord.toLowerCase() + "'";

    result = await conn.execute(query);
    

    conn.end(err => {
        if(err) {
            console.log(err);
            return err;
        } else {
            console.log("Database ------- OK");
        }
    })

    if (result[0].length != 0) {

        if(wallet_sub.toLowerCase() !== result[0][0]['wallet_metamask'].substring(0, 4).toLowerCase()) {

            interaction.reply({ content: `POMPO apologizes, but discord name or wallet don't match. ${config.quote}`, ephemeral: true });

        }       
        else {
            
            if(result[0][0]['discord_role'] === 0) {

                interaction.reply({ content: `POMPO glad to see you, dear whitelisted! One second, I will give you a role. ${config.quote}`, ephemeral: true });

                const role = guild.roles.cache.find(role => role.name === 'Whitelist member');
                guild_member.roles.add(role);

                const conn = await DB_connect();
                const query = "UPDATE `whitelist` SET discord_role=1 WHERE `discord`= '" + discord.toLowerCase() + "'";

                await conn.execute(query);

                conn.end()

            } else {

                interaction.reply({ content: `POMPO warns: this user is already logged in to the server! ${config.quote}`, ephemeral: true });
                
            }
        }
    } else {

        interaction.reply({ content: `POMPO apologizes, but discord name or wallet don't match. ${config.quote}`, ephemeral: true });
        
    }

    return result;
}


module.exports.DB_connect = DB_connect;
module.exports.discord_check = discord_check;
module.exports.login_whitelist = login_whitelist; 
