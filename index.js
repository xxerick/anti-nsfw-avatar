const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const deepai = require('deepai');

deepai.setApiKey('DEEP_AI_APIKEY');




client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({
      status: "dnd",
      activity: { name: "baby#1337", type: "WATCHING" },
    });
});


client.on("message", async function (message) {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if(message.content.startsWith("!check-avatar"))
    {
        
        let a =  await get_data(message.author.avatarURL);
        let point = a["output"]["nsfw_score"];
        if(point){
            
            if(point > 0.87)
            {
                return message.channel.send("Inappropriate avatar!")
            }
            else{
                return message.channel.send("Decent avatar!")
            }
        }
        
        
    }
});  



client.on("guildMemberAdd", async (member) => {
   
        let guild = member.guild;
        let log_ch = guild.channels.cache.get("CHANNEL_ID");
        let a =  await get_data(message.author.avatarURL);
        let point = a["output"]["nsfw_score"];
        if(point){
            
            if(point > 0.87)//Anything above 85% is definitely pornographic content 
            {
                return log_ch.channel.send(`Inappropriate avatar, sexual content! (\`${member.tag}\`)`)
            }
            else{
                return log_ch.channel.send(`Decent avatar! (\`${member.tag}\`)`)
            }
        }
        
});  

client.login(config.TOKEN);


function get_data(link) {
    return new Promise(async function(resolve, reject) {
        resolve(await deepai.callStandardApi("nsfw-detector", {
            image: link,
        }));
    })
}
