const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

module.exports = {
config: {
name: "pair3",
author: "Azad 💥",//author change korle tor marechudi 
category: "love",
},

onStart: async function ({ api, event, usersData }) {
try {
const threadData = await api.getThreadInfo(event.threadID);
const users = threadData.userInfo;

const mentions = event.mentions || {};  
  const mentionIDs = Object.keys(mentions);  
  const repliedUserID = event.type === "message_reply" ? event.messageReply.senderID : null;  
  const senderID = event.senderID;  

  let user1ID = null;  
  let user2ID = null;  

  if (mentionIDs.length >= 2) {  
    const filtered = mentionIDs.filter(id => id !== senderID);  
    if (filtered.length < 2)  
      return api.sendMessage("⚠️ Please mention two different users.", event.threadID, event.messageID);  
    user1ID = filtered[0];  
    user2ID = filtered[1];  
  } else if (mentionIDs.length === 1 && mentionIDs[0] !== senderID) {  
    user1ID = senderID;  
    user2ID = mentionIDs[0];  
  } else if (repliedUserID && repliedUserID !== senderID) {  
    user1ID = senderID;  
    user2ID = repliedUserID;  
  }  

  let selectedMatch, matchName, baseUserID;  

  if (user1ID && user2ID) {  
    const user1 = users.find(u => u.id === user1ID);  
    const user2 = users.find(u => u.id === user2ID);  
    if (!user1 || !user2)  
      return api.sendMessage("❌ Could not find one or both users.", event.threadID, event.messageID);  

    baseUserID = user1ID;  
    selectedMatch = user2;  
    matchName = user2.name;  
  } else {  
    const senderData = users.find(u => u.id === senderID);  
    if (!senderData)  
      return api.sendMessage("⚠️ Could not determine your info.", event.threadID, event.messageID);  

    const matchCandidates = users.filter(u => u.id !== senderID);  
    if (!matchCandidates.length)  
      return api.sendMessage("❌ No suitable match found.", event.threadID, event.messageID);  

    selectedMatch = matchCandidates[Math.floor(Math.random() * matchCandidates.length)];  
    matchName = selectedMatch.name;  
    baseUserID = senderID;  
  }  

  const baseUserData = await usersData.get(baseUserID);  
  const senderName = baseUserData?.name || "User";  

  const defaultAvatar = "https://files.catbox.moe/4l3pgh.jpg";  
  let sIdImage, pairPersonImage, background;  

  try {  
    background = await loadImage("https://i.imgur.com/iNCZiY1.png");  

    const avatarUrl1 = (await usersData.getAvatarUrl(baseUserID).catch(() => null)) || defaultAvatar;  
    sIdImage = await loadImage(avatarUrl1);  

    const avatarUrl2 = (await usersData.getAvatarUrl(selectedMatch.id).catch(() => null)) || defaultAvatar;  
    pairPersonImage = await loadImage(avatarUrl2);  

  } catch (err) {  
    console.error("Image loading error:", err);  
    return api.sendMessage("❌ Failed to load images.", event.threadID, event.messageID);  
  }  

  const width = 1200;  
  const height = 600;  
  const canvas = createCanvas(width, height);  
  const ctx = canvas.getContext("2d");  

  ctx.drawImage(background, 0, 0, width, height);  

  const leftCircle = { x: 293, y: 300, size: 310 };  
  const rightCircle = { x: 904, y: 309, size: 310 };  

  // Left avatar  
  ctx.save();  
  ctx.beginPath();  
  ctx.arc(leftCircle.x, leftCircle.y, leftCircle.size / 2, 0, Math.PI * 2);  
  ctx.closePath();  
  ctx.clip();  
  ctx.drawImage(sIdImage, leftCircle.x - leftCircle.size / 2, leftCircle.y - leftCircle.size / 2, leftCircle.size, leftCircle.size);  
  ctx.restore();  

  // Right avatar  
  ctx.save();  
  ctx.beginPath();  
  ctx.arc(rightCircle.x, rightCircle.y, rightCircle.size / 2, 0, Math.PI * 2);  
  ctx.closePath();  
  ctx.clip();  
  ctx.drawImage(pairPersonImage, rightCircle.x - rightCircle.size / 2, rightCircle.y - rightCircle.size / 2, rightCircle.size, rightCircle.size);  
  ctx.restore();  

  // Save buffer as temp file  
  const buffer = canvas.toBuffer("image/png");  
  const imgPath = path.join(__dirname, "pair.png");  
  fs.writeFileSync(imgPath, buffer);  

  // Love percentage  
  const tile = Math.floor(Math.random() * 31) + 70;  

  // Send message with mentions  
  return api.sendMessage({  
    body: `╭── 𝐏𝐚𝐢𝐫 𝐑𝐞𝐬𝐮𝐥𝐭 ──╮

✨ 𝐇𝐞𝐲 ${senderName}~!

💘 𝐘𝐨𝐮𝐫 𝐬𝐨𝐮𝐥𝐦𝐚𝐭𝐞 𝐢𝐬: ${matchName}!

❤️ 𝐋𝐨𝐯𝐞 𝐌𝐚𝐭𝐜𝐡: ${tile}%

⛓️ 𝐃𝐞𝐬𝐭𝐢𝐧𝐲 𝐛𝐫𝐨𝐮𝐠𝐡𝐭 𝐲𝐨𝐮 𝐭𝐰𝐨 𝐭𝐨𝐠𝐞𝐭𝐡𝐞𝐫~

╰── ✨ 🌬️ nezuko chan chat bot ✨ ──╯`,
mentions: [
{ tag: senderName, id: baseUserID },
{ tag: matchName, id: selectedMatch.id }
],
attachment: fs.createReadStream(imgPath)
}, event.threadID, () => fs.unlinkSync(imgPath)); // Delete temp file after sending

} catch (error) {  
  console.error("Pair3 error:", error);  
  return api.sendMessage("❌ An unexpected error occurred.", event.threadID, event.messageID);  
}

}
};
