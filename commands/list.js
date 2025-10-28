const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const costumes = [
  "구유닛복",
  "신유닛복",
  "박사페가",
  "흑마기사",
  "존웬디",
  "액터릴리",
  "인어킹",
  "참모장교",
  "제갈히나",
  "제갈신수",
  "단토르",
  "감자",
  "괴도로미",
  "가샤코리",
  "로제킹",
  "케모케모",
  "요원탐정",
  "석별",
  "학자쿡",
  "사펑",
  "월드링크",
  "외계인",
  "무사주군",
  "블페페스",
  "악춤부",
  "달스타",
  "멍페스",
  "달피에",
  "마녀루이",
  "포니차이",
  "파파마마",
  "느와르",
];

function formatCostumesInRows(list, perRow = 3) {
  return list
    .reduce((acc, cur, idx) => {
      const rowIdx = Math.floor(idx / perRow);
      acc[rowIdx] = acc[rowIdx] || [];
      acc[rowIdx].push(cur);
      return acc;
    }, [])
    .map((row) => row.join(", "))
    .join("\n");
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("의상리스트")
    .setDescription("존재하는 의상 명령어 목록"),
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder()
      .setTitle("🎈 루이츠카 의상 목록 🌟")
      .setDescription(formatCostumesInRows(costumes, 3))
      .setColor(0x9370db);

    await interaction.reply({ embeds: [embed] });
  },
};
