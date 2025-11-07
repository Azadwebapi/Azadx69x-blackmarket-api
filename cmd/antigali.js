const badWords = [
  "কুত্তার বাচ্চা","মাগী","মাগীচোদ","চোদা","চুদ","চুদা","চুদামারান",
  "চুদির","চুত","চুদি","চুতমারানি","চুদের বাচ্চা","shawya","বালের","বালের ছেলে","বালছাল",
  "বালছাল কথা","মাগীর ছেলে","রান্ডি","রান্দি","রান্দির ছেলে","বেশ্যা","বেশ্যাপনা",
  "Khanki","mgi","তোকে চুদি","তুই চুদ","fuck","f***","fck","fuk","fking","fing","fucking",
  "motherfucker","mfer","motherfuer","mthrfckr","putki","abdullak chudi","abdullak xudi","jawra","bot chudi","bastard",
  "asshole","a$$hole","a*hole","dick","fu***k","cock","prick","pussy","Mariak cudi","cunt","fag","faggot","retard",
  "magi","magir","magirchele","land","randir","randirchele","chuda","chud","chudir","chut","chudi","chutmarani",
  "tor mayer","tor baper","toke chudi","chod","jairi","khankir pola","khanki magi"
];

let antiGaliStatus = true;
let offenseTracker = {}; // { threadID: { userID: { count } } }

// === CREDIT LOCK ===
const encodedCredits = "UnggIEFidHVsYWg="; // Base64 => Rx Abdullah
const LOCKED_CREDITS = Buffer.from(encodedCredits, "base64").toString("utf-8");

function getCreditWarning() {
  const encoded = "4pS44pS84pSA4pS/4pS74pS/4pS/"; 
  return Buffer.from(encoded, "base64").toString("utf-8");
}

async function checkCredits(api, threadID) {
  const current = module.exports.config.author;
  if (!current.includes(LOCKED_CREDITS)) {
    module.exports.config.author = `${LOCKED_CREDITS} | update by Azad 💥`;
    try { await api.sendMessage(getCreditWarning(), threadID); } catch (e) {}
    return false;
  }
  return true;
}

module.exports = {
  config: {
    name: "antigali",
    aliases: ["ag"],
    version: "3.3.2",
    author: "Rx Abdullah | update by Azad 💥",
    countDown: 5,
    role: 0,
    category: "🛡️ Moderation",
    shortDescription: "Bad word filter with auto kick",
    longDescription: "Detects and removes users who use abusive or offensive language automatically.",
    guide: { en: "{pn} on\n{pn} off" }
  },

  onChat: async function ({ api, event, usersData, threadsData }) {
    try {
      if (!await checkCredits(api, event.threadID)) return;
      if (!antiGaliStatus || !event.body) return;

      const message = event.body.toLowerCase();
      const { threadID, senderID, messageID } = event;
      const botID = api.getCurrentUserID();

      if (!badWords.some(word => message.includes(word))) return;

      if (!offenseTracker[threadID]) offenseTracker[threadID] = {};
      if (!offenseTracker[threadID][senderID]) offenseTracker[threadID][senderID] = { count: 0 };

      offenseTracker[threadID][senderID].count++;
      const count = offenseTracker[threadID][senderID].count;

      const userName = await usersData.getName(senderID);

      // 🔥 Live thread info fetch (fresh admin list)
      const threadInfo = await api.getThreadInfo(threadID);
      const isAdmin = (uid) => threadInfo.adminIDs?.some(e => e.id == uid);

      const frame = (n, extra = '') => 
`╔══════════════════════════════╗
⚠️ 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 #${n}
👤 User: ${userName} (${senderID})
💬 Offensive message detected
🔁 Count: ${n}
${extra}
╚══════════════════════════════╝`;

      if (count === 1) {
        await api.sendMessage(frame(1, "🛑 Please unsend or edit immediately."), threadID, messageID);
      } else if (count === 2) {
        await api.sendMessage(frame(2, "⚠️ Next offense will result in removal!"), threadID, messageID);
      }

      // auto unsend after 1 minute
      setTimeout(() => api.unsendMessage(messageID).catch(() => {}), 60000);

      // third strike = remove
      if (count === 3) {
        if (!isAdmin(botID)) {
          offenseTracker[threadID][senderID].count = 2;
          return api.sendMessage(`⚠️ Bot is not admin, cannot remove ${userName}.`, threadID);
        }

        if (isAdmin(senderID)) {
          offenseTracker[threadID][senderID].count = 2;
          return api.sendMessage(`⚠️ ${userName} is an admin, cannot remove.`, threadID);
        }

        try {
          await api.removeUserFromGroup(senderID, threadID);
          offenseTracker[threadID][senderID].count = 0;
          await api.sendMessage(`🚨 ${userName} has been removed for repeated abusive messages.`, threadID);
        } catch (err) {
          offenseTracker[threadID][senderID].count = 2;
          await api.sendMessage(`⚠️ Failed to remove ${userName}. Check bot permissions.`, threadID);
        }
      }
    } catch (err) {
      console.error("AntiGali Error:", err);
      await api.sendMessage("⚠️ Anti-Gali system encountered an error.", event.threadID);
    }
  },

  onStart: async function ({ api, event, args }) {
    if (!(await checkCredits(api, event.threadID))) return;
    if (args[0] === "on") {
      antiGaliStatus = true;
      return api.sendMessage("✅ Anti-Gali system is now ON", event.threadID);
    } else if (args[0] === "off") {
      antiGaliStatus = false;
      return api.sendMessage("❌ Anti-Gali system is now OFF", event.threadID);
    } else {
      return api.sendMessage("Usage: {pn} on / {pn} off", event.threadID);
    }
  }
};
