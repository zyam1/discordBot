const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clothes")
    .setDescription("루이츠카 의상")
    .addStringOption((option) =>
      option
        .setName("의상종류")
        .setDescription("보시고 싶은 의상종류를 입력해주세요")
        .setRequired(true)
    ),
  run: async ({ interaction }) => {
    let clothesRF, clothesTF;
    let clothesR, clothesT;
    // const file = new AttachmentBuilder('../assets/discordjs.png');
    if (interaction.options.get("의상종류").value == "흑마기사") {
      clothesRF = new AttachmentBuilder( "static/img/rui_magic.jpg");
      clothesTF =  new AttachmentBuilder("static/img/kasa_knight.jpg");
      clothesR ="static/img/rui_magic.jpg";
      clothesT ="static/img/kasa_knight.jpg";
    
    }else if (interaction.options.get("의상종류").value == "액터릴리") {
      clothesRF =  new AttachmentBuilder("static/img/rui_actor.jpg");
      clothesTF =  new AttachmentBuilder("static/img/kasa_lily.jpg");
      clothesR ="static/img/rui_actor.jpg";
      clothesT ="static/img/kasa_lily.jpg";
    }else if(interaction.options.get("의상종류").value == "존웬디"){
      clothesRF =  new AttachmentBuilder("static/img/rui_john.jpg");
      clothesTF =  new AttachmentBuilder("static/img/kasa_wendy.jpg");
      clothesR ="static/img/rui_john.jpg";
      clothesT ="static/img/kasa_wendy.jpg";

    }else if(interaction.options.get("의상종류").value == "신유닛복"){
      clothesRF =  new AttachmentBuilder("static/img/rui_ori2.jpg");
      clothesTF =  new AttachmentBuilder("static/img/kasa_ori2.jpg");
      clothesR ="static/img/rui_ori2.jpg";
      clothesT ="static/img/kasa_ori2.jpg";

    }
    else{
      await interaction.reply(`${interaction.options.get("의상종류").value}는(은) 존재하지않는 의상 입니다.`);
      return
    }

    const embed = new EmbedBuilder()
      .setTitle(`루이츠카 ${interaction.options.get("의상종류").value} 의상`)
      .setImage(`attachment://${clothesR}`)
      .setImage(`attachment://${clothesT}`);

    await interaction.reply({
      embeds: [embed],
      files:[clothesRF,clothesTF]
    });
  },
};
