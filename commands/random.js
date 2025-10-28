const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const ruiKasaAuList = [
  '박사페가',
  '흑마기사',
  '존웬디',
  '액터릴리',
  '인어킹',
  '참모장교',
  '제갈히나',
  '제갈신수',
  '단토르',
  '괴도로미',
  '가샤코리',
  '로제킹',
  '케모케모',
  '요원탐정',
  '학자쿡',
  '사펑',
  '외계인',
  '무사주군',
  '블페페스',
  '로제기사',
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random')
    .setDescription('루이츠카 파생 연성 추천'),
  run: async ({ interaction }) => {
    const randomIndex = Math.floor(Math.random() * ruiKasaAuList.length);
    const randomChoice = ruiKasaAuList[randomIndex];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')

      .setDescription(`**${randomChoice}** 연성 해주세요`);

    await interaction.reply({ embeds: [embed] });
  },
};
