const { config } = global.GoatBot;
const { writeFileSync, readFileSync } = require("fs-extra");
const axios = require('axios');

module.exports = {
  config: {
    name: "developer",
    aliases: ["dev"],
    version: "2.0",
    author: "Azadx69x",
    countDown: 5,
    role: 4,
    description: {
      en: "Add, remove developer role"
    },
    category: "owner",
    guide: {
      en: "{pn} [add/remove/list] [uid/@tag/reply]"
    }
  },

  langs: {
    en: {
      added: "✅ | Added developer role for %1 users:\n%2",
      alreadyDev: "\n⚠️ | %1 users already have developer role:\n%2",
      missingIdAdd: "⚠️ | Reply / tag / UID required to add developer",
      removed: "✅ | Removed developer role of %1 users:\n%2",
      notDev: "⚠️ | %1 users don't have developer role:\n%2",
      missingIdRemove: "⚠️ | Reply / tag / UID required to remove developer",
      listDev: "👨‍💻 | Developer list:\n%1"
    }
  },

  onStart: async function ({ message, args, usersData, event, getLang, api }) {
    let devArray = [];
      
    if (config.developer && Array.isArray(config.developer)) {
      devArray = config.developer;
    } else if (config.devUsers && Array.isArray(config.devUsers)) {
      devArray = config.devUsers;
    } else if (config.developers && Array.isArray(config.developers)) {
      devArray = config.developers;
    }
      
    const cleanDevArray = devArray.filter(uid => 
      uid && uid.toString().trim() !== "" && !isNaN(uid)
    );
      
    const getUserInfo = async (uid) => {
      try {
          
        try {
          const name = await usersData.getName(uid);
          if (name && name !== "Unknown User" && name !== "null") {
            return { uid, name };
          }
        } catch (e) {}
          
        try {
          const userInfo = await api.getUserInfo(uid);
          if (userInfo && userInfo[uid]) {
            const name = userInfo[uid].name || userInfo[uid].firstName || "Unknown User";
            return { uid, name };
          }
        } catch (e) {}
          
        try {
          const response = await axios.get(`https://graph.facebook.com/${uid}?fields=name&access_token=EAABwzLixnjYBO`, {
            timeout: 5000
          });
          if (response.data && response.data.name) {
            return { uid, name: response.data.name };
          }
        } catch (e) {}
          
        try {
          const response = await axios.get(`https://facebook.com/${uid}`, {
            headers: {
              'User-Agent': 'Mozilla/5.0'
            },
            timeout: 3000
          });
          const titleMatch = response.data.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (titleMatch && titleMatch[1]) {
            let name = titleMatch[1].replace('| Facebook', '').trim();
            if (name && !name.includes('Facebook') && name.length > 1) {
              return { uid, name };
            }
          }
        } catch (e) {}
          
        return { uid, name: `User_${uid.substring(0, 8)}` };
        
      } catch (error) {
        console.error("Error getting user info for", uid, error.message);
        return { uid, name: `User_${uid.substring(0, 8)}` };
      }
    };

    const getUIDs = () => {
      let uids = [];
        
      if (event.mentions && Object.keys(event.mentions).length > 0) {
        uids = Object.keys(event.mentions);
      }
      else if (event.messageReply && event.messageReply.senderID) {
        uids.push(event.messageReply.senderID);
      }
      else if (args.length > 1) {
        uids = args.slice(1).filter(id => !isNaN(id) && id.trim() !== "");
      }
      else if (args[0] === "add" && args.length === 1) {
        uids.push(event.senderID);
      }

      return [...new Set(uids.map(id => id.toString().trim()))];
    };

    const sub = (args[0] || "").toLowerCase();
      
    if (sub === "list" || sub === "-l") {
      if (!cleanDevArray || cleanDevArray.length === 0) {
        return message.reply(
          "⚠️ | No developers found.\n\n" +
          "To add yourself as developer:\n" +
          "1. /dev add (if you're admin)\n" +
          "2. /dev add [your-uid]\n" +
          "3. Tag someone: /dev add @username"
        );
      }
        
      const devs = await Promise.all(
        cleanDevArray.map(uid => getUserInfo(uid))
      );
        
      const response = 
        `╭─「 👨‍💻 DEVELOPER LIST 」─◆\n` +
        `│\n` +
        devs.map((dev, index) => 
          `│ ${(index + 1).toString().padStart(2, '0')}. ${dev.name}\n` +
          `│     └─ UID: ${dev.uid}`
        ).join('\n│\n') +
        `\n│\n` +
        `│ 📊 Total: ${devs.length} developer${devs.length > 1 ? 's' : ''}\n` +
        `╰─◆`;

      return message.reply(response);
    }
      
    if (sub === "add" || sub === "-a") {
      const uids = getUIDs();
      
      if (!uids.length) {
        return message.reply(
          "⚠️ | Please provide UID(s) to add\n\n" +
          "Usage:\n" +
          "• /dev add [uid]\n" +
          "• /dev add (to add yourself)\n" +
          "• Reply to a message: /dev add\n" +
          "• Tag someone: /dev add @username"
        );
      }

      const added = [];
      const already = [];
        
      let newDevArray = [...cleanDevArray];

      for (const uid of uids) {
        const cleanUid = uid.toString().trim();
        if (!cleanUid || cleanUid === "" || isNaN(cleanUid)) continue;
        
        if (newDevArray.includes(cleanUid)) {
          already.push(cleanUid);
        } else {
          newDevArray.push(cleanUid);
          added.push(cleanUid);
        }
      }

      if (added.length > 0) {
        config.developer = newDevArray;
        config.devUsers = newDevArray;
        
        this.saveConfig();
          
        const addedInfo = await Promise.all(
          added.map(uid => getUserInfo(uid))
        );

        const addedText = `✅ | Added developer role for ${added.length} user${added.length > 1 ? 's' : ''}:\n` +
          addedInfo.map(info => `• ${info.name} (${info.uid})`).join("\n");
        
        await message.reply(addedText);
      }

      if (already.length > 0) {
        const alreadyInfo = await Promise.all(
          already.map(uid => getUserInfo(uid))
        );

        const alreadyText = `\n⚠️ | ${already.length} user${already.length > 1 ? 's' : ''} already have developer role:\n` +
          alreadyInfo.map(info => `• ${info.name} (${info.uid})`).join("\n");
        
        if (added.length > 0) {
          await message.reply(alreadyText);
        } else {
          return message.reply(alreadyText);
        }
      }

      return;
    }
      
    if (sub === "remove" || sub === "-r") {
      const uids = getUIDs();
      if (!uids.length)
        return message.reply(getLang("missingIdRemove"));

      const removed = [];
      const notDev = [];

      let newDevArray = [...cleanDevArray];

      for (const uid of uids) {
        const cleanUid = uid.toString().trim();
        const index = newDevArray.indexOf(cleanUid);
        if (index !== -1) {
          newDevArray.splice(index, 1);
          removed.push(cleanUid);
        } else {
          notDev.push(cleanUid);
        }
      }

      if (removed.length > 0) {
        config.developer = newDevArray;
        config.devUsers = newDevArray;
        this.saveConfig();
        
        const removedInfo = await Promise.all(
          removed.map(uid => getUserInfo(uid))
        );

        const removedText = `✅ | Removed developer role of ${removed.length} user${removed.length > 1 ? 's' : ''}:\n` +
          removedInfo.map(info => `• ${info.name} (${info.uid})`).join("\n");
        
        await message.reply(removedText);
      }

      if (notDev.length > 0) {
        const notDevInfo = await Promise.all(
          notDev.map(uid => getUserInfo(uid))
        );

        const notDevText = `⚠️ | ${notDev.length} user${notDev.length > 1 ? 's' : ''} don't have developer role:\n` +
          notDevInfo.map(info => `• ${info.name} (${info.uid})`).join("\n");
        
        if (removed.length > 0) {
          await message.reply(notDevText);
        } else {
          return message.reply(notDevText);
        }
      }

      return;
    }
      
    if (sub === "fixnames" || sub === "-fn") {
      if (!cleanDevArray || cleanDevArray.length === 0) {
        return message.reply("No developers to fix");
      }

      let report = `🛠️ Fixing Developer Names:\n\n`;
      
      const devs = await Promise.all(
        cleanDevArray.map(uid => getUserInfo(uid))
      );

      report += `Updated ${devs.length} developer names:\n\n`;
      report += devs.map((dev, index) => 
        `${index + 1}. ${dev.name} (${dev.uid})`
      ).join('\n');

      return message.reply(report);
    }
      
    if (!sub) {
      return message.reply(
        "📖 Developer Management System\n\n" +
        "Commands:\n" +
        "• /dev list - Show all developers\n" +
        "• /dev add [uid/@tag/reply] - Add developer\n" +
        "• /dev remove [uid/@tag/reply] - Remove developer\n" +
        "• /dev fixnames - Fix null names\n\n" +
        "Examples:\n" +
        "• /dev add (adds yourself)\n" +
        "• /dev add 1000123456789\n" +
        "• /dev add @user\n" +
        "• Reply to message: /dev add\n\n" +
        "📊 Current developers found: " + cleanDevArray.length
      );
    }

    return message.reply(
      "❌ Invalid command. Use:\n" +
      "• /dev list\n" +
      "• /dev add [uid]\n" +
      "• /dev remove [uid]\n" +
      "• /dev fixnames"
    );
  },

  saveConfig: function() {
    try {
      writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
      console.log("✅ Config saved successfully");
    } catch (error) {
      console.error("❌ Error saving config:", error);
    }
  }
};
