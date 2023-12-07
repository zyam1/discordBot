const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("의상리스트")
    .setDescription("존재하는 의상 명령어 리스트"),
  run: async ({ interaction }) => {
    await interaction.reply(
        "신유닛복, 흑마기사, 존웬디, 액터릴리 "
    );
  },
}

