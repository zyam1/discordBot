const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const path = require("path");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clothes")
    .setDescription("루이츠카 의상")//커맨드 명령어 설명
    .addStringOption((option) =>
      option//옵션이 있는경우 옵션사용(옵션여러개 사용가능)
        .setName("의상종류")
        .setDescription("보시고 싶은 의상종류를 입력해주세요")//옵션 설명
        .setRequired(true)//필수로 적어야하는가? (bool값)
    ),
  run: async ({ interaction }) => {
    
    let clothesRF, clothesTF;
    let clothesR, clothesT;
    //용량이 큰이미지는 불가능
    //공식 홈페이지나 자료가 있는 웹이 있는 장르는 axios같은걸로 불러오세요. 저희는 없어서 로컬에 저장
    //로컬에 저장한 이미지를  new AttachmentBuilder 를 사용하여 디스코드페이지에 추가한뒤=>사용하려했는데.. 뭔가 안됨
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
      return// 예외처리후 함수를 종료시켜주세요 아니면 서버터집니다 
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

//저는 끝없는 if문이되었지만..(다른방법이 생각나지않아요)