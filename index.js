//프로그램 실행전 npm i 잊지마세요
// require('dotenv').config(); //환경변수 안에 토큰값넣는걸 추천
// const { CommandHandler } = require('djs-commander');
// const { Client, IntentsBitField } = require('discord.js');
// const config = require('./config.json');

// const path = require('path');

// const client = new Client({
//   intents: [
//     IntentsBitField.Flags.Guilds,
//     IntentsBitField.Flags.GuildMembers,
//     IntentsBitField.Flags.GuildMessages,
//     IntentsBitField.Flags.MessageContent,
//   ],
// });
// new CommandHandler({
//   client,
//   commandsPath: path.join(__dirname, 'commands'),
//   eventsPath: path.join(__dirname, 'events'),
// });

// client.on('ready', (c) => {
//   console.log(`${c.user.tag} is online.`);
// });

// client.login(config.token);
// 프로그램 실행 전: npm i, 그리고 .env에 TOKEN=... 저장
///--------------------------------------------상단은 레거시 코드-----------------------------------------------
require("dns").setDefaultResultOrder("ipv4first"); // IPv6 경로 회피(없어도됨)
const { setGlobalDispatcher, Agent } = require("undici");
setGlobalDispatcher(
  new Agent({
    connect: { timeout: 30_000 },
    headersTimeout: 30_000,
    bodyTimeout: 0,
  })
);

require("dotenv").config();

const { Client, IntentsBitField } = require("discord.js");
const { CommandHandler } = require("djs-commander");
const path = require("path");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,

    // IntentsBitField.Flags.GuildMembers,
    // IntentsBitField.Flags.MessageContent,
  ],
  rest: { timeout: 30000 }, // REST 타임아웃 상향 (네트워크 지연 대비)
});

// djs-commander 설정
new CommandHandler({
  client,
  commandsPath: path.join(__dirname, "commands"),
  eventsPath: path.join(__dirname, "events"),
});

// 디버깅 로그(선택)
client.on("warn", console.warn);
client.on("error", console.error);

client.once("ready", (c) => {
  console.log(`${c.user.tag} is online.`);
  // 활동 상태는 ready 이후에!
  try {
    require("./status")(client);
  } catch (_) {}
});

// 토큰은 .env에서만!
if (!process.env.TOKEN) {
  console.error("환경변수 TOKEN이 없습니다. .env를 확인하세요.");
  process.exit(1);
}

// IPv6 경로 문제 회피가 필요하면 PM2/env에 아래를 추가하세요:
// NODE_OPTIONS=--dns-result-order=ipv4first

client.login(process.env.TOKEN);
