const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("의상리스트")
    .setDescription("존재하는 의상 명령어 목록"),
  run: async ({ interaction }) => {
    await interaction.reply(
        "신유닛복, 흑마기사, 존웬디, 액터릴리 "//여러분은 리스트에 값담아서 돌리세요...하드코딩하지마시고 저는 머리쓰기 싫었어요
    );
  },
}

