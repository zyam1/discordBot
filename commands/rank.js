const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { dbAsync } = require('../db');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription('루이츠카 파생의상 검색 랭킹'),
  run: async ({ interaction }) => {
    try {
      const rows = await dbAsync.all(
        `SELECT term, count FROM counts ORDER BY count DESC LIMIT 10`
      );

      if (!rows || rows.length === 0) {
        await interaction.reply({
          content: '아직 검색 기록이 없습니다.',
          ephemeral: true
        });
        return;
      }

      const description = rows
        .map((row, index) => `${index + 1}. ${row.term}: ${row.count}번`)
        .join('\n');

      const embed = new EmbedBuilder()
        .setTitle('----- 루이츠카 파생의상 검색 랭킹 -----')
        .setDescription(description)
        .setColor(0x9370db);

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('랭킹 조회 오류:', error);
      
      try {
        const errorMsg = '데이터베이스 조회 중 오류가 발생했습니다.';
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: errorMsg, ephemeral: true });
        } else {
          await interaction.reply({ content: errorMsg, ephemeral: true });
        }
      } catch (replyError) {
        console.error('오류 응답 실패:', replyError);
      }
    }
  },
};
