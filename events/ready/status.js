const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.user.setActivity({
    name: "/clothes [cp명]",
    type: ActivityType.Playing,
  });
};