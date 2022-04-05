const mysql = require("mysql2/promise");

const Discord = require("discord.js");

const config = require("./config.json");

const intents = new Discord.Intents(32767);

const bot = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"], partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

bot.login(config.token);

bot.on("ready", () => {
    console.log("bot is ready");
})

const DB_connect = async () => {
    let conn = await mysql.createConnection({
        host: "XXXXXXXXXXXXXXX", 
        user: "XXXXXXXXXXXXXXX",
        database: "XXXXXXXXXXXX",
        password: "XXXXXXXXXXXXX"
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

const login_whitelist = async (discord, wallet_sub, message) => {

    const author = message.author;


    const guild = await bot.guilds.fetch('922421434104553512').then(guild => {
        return guild
    })

    let guild_member = null;

    try {
       guild_member = await guild.members.fetch(author.id).then(guild_user => {return guild_user});
     }
     catch (e) {
        console.log(e);

        message.reply(`
        Log into the server before logging in. POM-POM:
        https://discord.gg/wYQsHB2cuR
        `)

        return
     }

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
            message.reply('POMPO apologizes, but discord name or wallet don`t match. POM-POM');
        }       
        else {
            
            if(result[0][0]['discord_role'] === 0) {
                message.reply('POMPO glad to see you, dear whitelisted! One second, I will give you a role. POM-POM');
                const role = guild.roles.cache.find(role => role.name === 'Whitelist member');
                guild_member.roles.add(role);

                const conn = await DB_connect();
                const query = "UPDATE `whitelist` SET discord_role=1 WHERE `discord`= '" + discord.toLowerCase() + "'";

                await conn.execute(query);

                conn.end()

            } else {
                message.reply('POMPO warns: this user is already logged in to the server! POM-POM');
            }
        }
    } else {
        message.reply('POMPO apologizes, but discord name or wallet don`t match. POM-POM');
    }

    return result;
}



bot.on("messageCreate", message => {

    

    if(!message.content.startsWith(config.prefix)) return;
    
    const args = message.content.substring(config.prefix.length).split(/ +/);

    switch (args[0]) {
        case "commands":
            message.reply(`
            Hello! 
            I am POMPO the robot AI. My functionality is pretty limited now on this server, but my owner and creator Leo are always working on my additional functionality. So soon I could be more intelligent, versatile and multifunctional as my real-life prototypes. Below you can check my main commands at this time. POM-POM.
            All POMPO available commands:
            /commands – show all POMPO available commands     
            /check_whitelist - check if you are in the whitelist. enter the command in the format 
            /check_whitelist
            /login - log to the server according the data you share in the whitelist form and get a role on the server! 
            /login [the first four characters of the linked wallet]*
                        * Square brackets are not required.
            `)
            break;
        case "check_whitelist":

        
            
        const discord_command = async () => {

            let arr = await discord_check(message.author.tag);

            if (arr[0].length != 0) {
                message.reply(`POMPO have the good news: you have been successfully added to whitelist!
                Your wallet: XXXXXXXXXXXXXXXXX${arr[0][0]['wallet_metamask'].slice(-4)}
                POM-POM
                `);
            }   else {
                message.reply('Oops, POMPO didn`t find anything. POM-POM');
            }
        } 

        discord_command()    

            break;

        
        case "login":

        const whitelist_catch = async () => {
            try {
            await login_whitelist(message.author.tag, args[1], message)
            } catch(e) {
                console.log(e);
            }
        }

        whitelist_catch();

            break;
    }

})
