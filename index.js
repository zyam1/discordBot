//프로그램 실행전 npm i 잊지마세요
require("dotenv").config();//환경변수 안에 토큰값넣는걸 추천
const { CommandHandler } = require("djs-commander");
const { Client, IntentsBitField } = require("discord.js");

const path = require("path");


const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
});




client.login(process.env.TOKEN);