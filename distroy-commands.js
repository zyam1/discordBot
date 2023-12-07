const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const rest = new REST().setToken(token);//봇발급시 받은 토큰값(git에 올릴경우 환경변수처리 추천)


//커맨드 삭제 명령어 :원하는 커맨드의 ID(디스코드 디밸롭모드 사용해서 우클릭후 복사) 갑을 집어넣으시면 됩니다

//아래코드는 특정길드에서만 쓰이는 커맨드처리
// for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// for global commands(글로벌 커맨드 처리)
rest.delete(Routes.applicationCommand(clientId, '1181255611749515375'))//clientId는 봇제작시 주어지는 appId와 동일,뒷부분은 커맨드ID
	.then(() => console.log('Successfully deleted application command'))
	.catch(console.error);


// *삭제할 커맨드의 Id값을 집어넣은다음 이 파일을 실행하면 한시간 뒤쯤 삭제가 적용됩니다*