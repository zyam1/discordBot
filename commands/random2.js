const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const rui = [
  '흑마',
  '박사',
  '존',
  '액터',
  '해파리',
  '참모',
  '단장',
  '제갈',
  '괴도',
  '가샤',
  '로제',
  '케모',
  '요원',
  '학자',
  '사펑루이',
  '외계인 루이',
  '블페',
];
const kasa = [
  '페가',
  '기사',
  '릴리',
  '킹',
  '장교',
  '히나',
  '신수',
  '토르페',
  '로미오',
  '코리',
  '케모',
  '탐정',
  '쿡',
  '사펑 츠카사',
  '외계인 츠카사',
  '주군',
  '페스',
  '웬디',
];
module.exports = {
  data: new SlashCommandBuilder()
    .setName('random2')
    .setDescription('이것저것 섞어서 추천'),
  run: async ({ interaction }) => {
    const ruiRandomIndex = Math.floor(Math.random() * rui.length);
    const kasaRandomIndex = Math.floor(Math.random() * kasa.length);
    const ruiRandom = rui[ruiRandomIndex];
    const kasaRandom = kasa[kasaRandomIndex];

    const embed = new EmbedBuilder()
      .setColor('#0099ff')

      .setDescription(
        `💜 **${ruiRandom}** x **${kasaRandom}** 💛 연성 해주세요`
      );

    await interaction.reply({ embeds: [embed] });
  },
};
