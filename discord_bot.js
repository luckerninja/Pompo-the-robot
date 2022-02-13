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
        Зайдите на сервер прежде чем залогиниться:
        https://discord.gg/wYQsHB2cuR
        `)

        return
     }

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

    if (result[0].length != 0) {

        if(wallet_sub !== result[0][0]['wallet_metamask'].substring(0, 4)) {
            message.reply('Дискорд или кошелек не совпадают');
        }       
        else {
            
            if(result[0][0]['discord_role'] === 0) {
                message.reply('Щас дам роль');
                const role = guild.roles.cache.find(role => role.name === 'Whitelist member');
                guild_member.roles.add(role);

                const conn = await DB_connect();
                const query = "UPDATE `whitelist` SET discord_role=1 WHERE `discord`= '" + discord + "'";

                await conn.execute(query);

                conn.end()

            } else {
                message.reply('Этот пользователь уже залогинен на сервере');
            }
        }
    } else {
        message.reply('Дискорд или кошелек не совпадают');
    }

    return result;
}



bot.on("messageCreate", message => {

    

    if(!message.content.startsWith(config.prefix)) return;
    
    const args = message.content.substring(config.prefix.length).split(/ +/);

    switch (args[0]) {
        case "commands":
            message.reply(`all commands:
            !check_whitelist - проверить есть ли вы в whitelist. введите команду в формате !check_whitelist [дискорд который вы указали]
            !login - залогинтесь на сервер по данным из whitelist и получите роль на сервере! !login [дискорд который вы указали] [первые четыре символа привязанного кошелька]

            (Квадратные скобки ставить не нужно)
            `)
            break;
        case "check_whitelist":

        
            
        const discord_command = async () => {

            let arr = await discord_check(args[1]);

            if (arr[0].length != 0) {
                message.reply(`Вы были успешно добавлены в whitelist
                Ваш кошелек: XXXXXXXXXXXXXXXXX${arr[0][0]['wallet_metamask'].slice(-4)}
                `);
            }   else {
                message.reply('УПС, мы ничего не нашли');
            }
        } 

        discord_command()    

            break;

        
        case "login":

        const whitelist_catch = async () => {
            await login_whitelist(args[1], args[2], message)
        }

        whitelist_catch();

            break;
    }

})




