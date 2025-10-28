const {
  SlashCommandBuilder,
  EmbedBuilder,
  AttachmentBuilder,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const { dbAsync } = require("../db");

const fantasyKasa = [
  "kasa_king.jpg",
  "kasa_cook.jpg",
  "kasa_lily.jpg",
  "kasa_knight.jpg",
];

const costumes = {
  흑마기사: { r: "rui_magic.jpg", t: "kasa_knight.jpg" },
  로제기사: { r: "rui_rose.jpg", t: "kasa_knight.jpg" },
  gmrakrltk: { r: "rui_magic.jpg", t: "kasa_knight.jpg" },
  액터릴리: { r: "rui_actor.jpg", t: "kasa_lily.jpg" },
  dorxjflffl: { r: "rui_actor.jpg", t: "kasa_lily.jpg" },
  존웬디: { r: "rui_john.jpg", t: "kasa_wendy.jpg" },
  whsdnpsel: { r: "rui_john.jpg", t: "kasa_wendy.jpg" },
  신유닛복: { r: "rui_ori2.jpg", t: "kasa_ori2.jpg" },
  tlsdbsltqhr: { r: "rui_ori2.jpg", t: "kasa_ori2.jpg" },
  인어킹: { r: "rui_jellyFish.jpg", t: "kasa_king.jpg" },
  해파리킹: { r: "rui_jellyFish.jpg", t: "kasa_king.jpg" },
  dlsdjzld: { r: "rui_jellyFish.jpg", t: "kasa_king.jpg" },
  참모장교: { r: "rui_staff.jpg", t: "kasa_officer.jpg" },
  ckaahwkdry: { r: "rui_staff.jpg", t: "kasa_officer.jpg" },
  제갈히나: { r: "rui_advisor.jpg", t: "kasa_hina.jpg" },
  wprkfglsk: { r: "rui_advisor.jpg", t: "kasa_hina.jpg" },
  rnsglsk: { r: "rui_advisor.jpg", t: "kasa_hina.jpg" },
  군히나: { r: "rui_advisor.jpg", t: "kasa_hina.jpg" },
  제갈신수: { r: "rui_advisor.jpg", t: "kasa_dragon.jpg" },
  wprkftlstn: { r: "rui_advisor.jpg", t: "kasa_dragon.jpg" },
  단토르: { r: "rui_dan.jpg", t: "kasa_tor.jpg" },
  eksxhfm: { r: "rui_dan.jpg", t: "kasa_tor.jpg" },
  구유닛복: { r: "rui_ori.jpg", t: "kasa_ori.jpg" },
  rndbsltqhr: { r: "rui_ori.jpg", t: "kasa_ori.jpg" },
  감자: { r: "rui_potato.jpg", t: "kasa_potato.jpg" },
  rkawk: { r: "rui_potato.jpg", t: "kasa_potato.jpg" },
  석별: { r: "rui_farewell.jpg", t: "kasa_farewell.jpg" },
  tjrquf: { r: "rui_farewell.jpg", t: "kasa_farewell.jpg" },
  zjxmszhf: { r: "rui_farewell.jpg", t: "kasa_farewell.jpg" },
  커튼콜: { r: "rui_farewell.jpg", t: "kasa_farewell.jpg" },
  괴도로미: { r: "rui_phantom.jpg", t: "kasa_romeo.webp" },
  zhehfhal: { r: "rui_phantom.jpg", t: "kasa_romeo.webp" },
  가샤코리: { r: "rui_student.jpg", t: "kasa_student.jpg" },
  rktizhfl: { r: "rui_student.jpg", t: "kasa_student.jpg" },
  로제킹: { r: "rui_rose.jpg", t: "kasa_king.jpg" },
  fhwpzld: { r: "rui_rose.jpg", t: "kasa_king.jpg" },
  요원탐정: { r: "rui_agent.jpg", t: "kasa_detective.webp" },
  dydnjsxkawjd: { r: "rui_agent.jpg", t: "kasa_detective.webp" },
  케모케모: { r: "rui_kemo.webp", t: "kasa_kemo.webp" },
  zpahzpah: { r: "rui_kemo.webp", t: "kasa_kemo.webp" },
  몬스터: { r: "rui_kemo.webp", t: "kasa_kemo.webp" },
  학자쿡: { r: "rui_scholar.jpg", t: "kasa_cook.jpg" },
  gkrwkznr: { r: "rui_scholar.jpg", t: "kasa_cook.jpg" },
  사펑: { r: "rui_cyberpunk.jpg", t: "kasa_cyberpunk.jpg" },
  사이버펑크: { r: "rui_cyberpunk.jpg", t: "kasa_cyberpunk.jpg" },
  tkvjd: { r: "rui_cyberpunk.jpg", t: "kasa_cyberpunk.jpg" },
  tkdlqjvjdzm: { r: "rui_cyberpunk.jpg", t: "kasa_cyberpunk.jpg" },
  월드링크: { r: "rui_worldLink.jpg", t: "kasa_worldLink.jpg" },
  dnjfemfldzm: { r: "rui_worldLink.jpg", t: "kasa_worldLink.jpg" },
  월링: { r: "rui_worldLink.jpg", t: "kasa_worldLink.jpg" },
  외계인: { r: "rui_alien.jpg", t: "kasa_alien.jpg" },
  dhlrPdls: { r: "rui_alien.jpg", t: "kasa_alien.jpg" },
  왹져: { r: "rui_alien.jpg", t: "kasa_alien.jpg" },
  dhlrwu: { r: "rui_alien.jpg", t: "kasa_alien.jpg" },
  와풍만두: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  dhkvndaksen: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  칼바람: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  zkfqkfka: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  당고먹밥: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  ekdrhajrqkq: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  무사주군: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  antkwnrns: { r: "rui_japSt.jpg", t: "kasa_japSt.jpg" },
  페스페스: { r: "rui_fes.jpg", t: "kasa_fes.jpg" },
  블페페스: { r: "rui_fes.jpg", t: "kasa_fes.jpg" },
  블페스타: { r: "rui_fes.jpg", t: "kasa_3star.jpg" },
  qmfvptmxk: { r: "rui_fes.jpg", t: "kasa_fes.jpg" },
  qmfvpvptm: { r: "rui_fes.jpg", t: "kasa_fes.jpg" },
  fesfes: { r: "rui_fes.jpg", t: "kasa_fes.jpg" },
  vptmvptm: { r: "rui_fes.jpg", t: "kasa_fes.jpg" },
  박사페가: { r: "rui_douji.jpg", t: "kasa_the_shining.jpg" },
  qkrtkvprk: { r: "rui_douji.jpg", t: "kasa_the_shining.jpg" },
  악춤부: { r: "rui_devilsmanner.jpg", t: "kasa_booo.jpg" },
  dkrcnaqn: { r: "rui_devilsmanner.jpg", t: "kasa_booo.jpg" },
  달스타: { r: "rui_moon.jpg", t: "kasa_3star.jpg" },
  ekftmxk: { r: "rui_moon.jpg", t: "kasa_3star.jpg" },
  달피에: { r: "rui_moon.jpg", t: "kasa_pierrot.jpg" },
  ekfvldp: { r: "rui_moon.jpg", t: "kasa_pierrot.jpg" },
  멍페스: { r: "rui_puppy.jpg", t: "kasa_fes.jpg" },
  ajdvptm: { r: "rui_puppy.jpg", t: "kasa_fes.jpg" },
  해파리기사: { r: "rui_jellyFish.jpg", t: "kasa_knight.jpg" },
  마녀루이: { r: "rui_witch.webp", t: null },
  포니차이: { r: "rui_phony.jpg", t: "kasa_yiEr.jpg" },
  포니이얼: { r: "rui_phony.jpg", t: "kasa_yiEr.jpg" },
  파파마마: { r: "rui_papa.jpg", t: "kasa_mama.jpg" },
  vkvkakak: { r: "rui_papa.jpg", t: "kasa_mama.jpg" },
  딥딥: { r: "rui_papa.jpg", t: "kasa_mama.jpg" },
  양아치: { r: "rui_noir.jpg", t: "kasa_noir.jpg" },
  느와르: { r: "rui_noir.jpg", t: "kasa_noir.jpg" },
  루즈러프: { r: "rui_noir.jpg", t: "kasa_noir.jpg" },
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clothes")
    .setDescription("루이츠카 의상")
    .addStringOption((option) =>
      option
        .setName("type") // 영문 소문자만
        .setDescription("보시고 싶은 의상종류를 입력해주세요")
        .setRequired(true)
    ),

  run: async ({ interaction }) => {
    try {
      // 옵션 키를 "type"으로 맞춰서 받기
      const input = interaction.options.getString("type") ?? interaction.options.getString("의상종류");
      const costume = costumes[input];

      if (!costume) {
        await interaction.reply({
          content: `${input}는(은) 존재하지 않는 의상입니다.`,
          ephemeral: true,
        });
        return;
      }

      const checkFileExists = (filePath) => {
        try {
          return fs.existsSync(filePath);
        } catch {
          return false;
        }
      };

      // 긴 처리 대비
      await interaction.deferReply();

      // 비동기로 검색 카운트 업데이트 (메인 로직 영향 X)
      dbAsync
        .run(
          `INSERT INTO counts (term, count) VALUES (?, 1)
           ON CONFLICT(term) DO UPDATE SET count = count + 1`,
          [input]
        )
        .catch((error) => {
          console.error("검색 카운트 업데이트 실패:", error);
        });

      const ruiImagePath = path.join(process.cwd(), "static", "img", costume.r);
      if (!checkFileExists(ruiImagePath)) {
        await interaction.editReply(
          `죄송합니다. ${input} 의상의 루이 이미지를 찾을 수 없습니다.`
        );
        return;
      }

      const clothesRF = new AttachmentBuilder(ruiImagePath);
      let clothesTF = null;

      if (input === "마녀루이") {
        const randomFantasyKasa =
          fantasyKasa[Math.floor(Math.random() * fantasyKasa.length)];
        const kasaPath = path.join(
          process.cwd(),
          "static",
          "img",
          randomFantasyKasa
        );
        if (checkFileExists(kasaPath)) {
          clothesTF = new AttachmentBuilder(kasaPath);
        }
      } else if (costume.t) {
        const kasaPath = path.join(process.cwd(), "static", "img", costume.t);
        if (checkFileExists(kasaPath)) {
          clothesTF = new AttachmentBuilder(kasaPath);
        }
      }

      const embed = new EmbedBuilder().setTitle(`루이츠카 ${input} 의상`);
      const files = clothesTF ? [clothesRF, clothesTF] : [clothesRF];

      await interaction.editReply({
        embeds: [embed],
        files,
      });
    } catch {
      try {
        const msg = "명령어 실행 중 오류가 발생했어요.";
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({ content: msg, ephemeral: true });
        } else {
          await interaction.reply({ content: msg, ephemeral: true });
        }
      } catch {}
    }
  },

  getSearchCounts: async () => {
    try {
      return await dbAsync.all(
        "SELECT term, count FROM counts ORDER BY count DESC"
      );
    } catch (error) {
      console.error("검색 카운트 조회 실패:", error);
      throw error;
    }
  },
};
