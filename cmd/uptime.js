const fs = require("fs-extra");
const path = require("path");
const Canvas = require("canvas");

module.exports = {
  config: {
    name: "uptime",
    aliases: ["ping", "up"],
    version: "0.0.5",
    author: "Azad 💥",//author change korle tor marechudi 
    countDown: 5,
    role: 0,
    shortDescription: "Show bot uptime and ping",
    longDescription: "Displays real ping, uptime, and owner with image, colored ping, glowing effect, and spark effect",
    category: "system",
    guide: "{p}uptime"
  },

  onStart: async function ({ event, message }) {
    try {
      // ====== uptime ======
      const uptime = process.uptime();
      const hours = Math.floor(uptime / 3600);
      const minutes = Math.floor((uptime % 3600) / 60);
      const seconds = Math.floor(uptime % 60);
      const uptimeStr = `${hours}h ${minutes}m ${seconds}s`;

      // ====== ping test ======
      const start = Date.now();
      const tempMsg = await message.reply("⚡ Checking ping...");
      const ping = Date.now() - start;

      if (tempMsg?.messageID) {
        setTimeout(() => message.unsend(tempMsg.messageID), 1000);
      }

      // ====== Ping color ======
      let pingIcon = "🟢";
      let pingColor = "#00FF00"; // green
      if (ping > 400) {
        pingIcon = "🔴";
        pingColor = "#FF0000";
      } else if (ping > 200) {
        pingIcon = "🟡";
        pingColor = "#FFFF00";
      }

      // ====== Canvas setup ======
      const canvas = Canvas.createCanvas(1000, 500);
      const ctx = canvas.getContext("2d");

      // ====== Background images ======
      const backgrounds = [
        "https://files.catbox.moe/edstpy.jpg",
        "https://files.catbox.moe/e6ehm7.jpg",
        "https://files.catbox.moe/rfl3bn.jpg",
        "https://files.catbox.moe/8c8ct2.jpg",
        "https://files.catbox.moe/jwdzmd.jpg",
        "https://files.catbox.moe/9xavl8.jpg",
        "https://files.catbox.moe/jp3xnh.jpg",
        "https://files.catbox.moe/x9mtvn.jpg",
        "https://files.catbox.moe/grrfws.jpg",
        "https://files.catbox.moe/44e53w.jpg",
        "https://files.catbox.moe/fckk6i.jpg",
        "https://files.catbox.moe/lv0ztf.jpg"
      ];

      // background
      const bgUrl = backgrounds[Math.floor(Math.random() * backgrounds.length)];
      const bgImg = await Canvas.loadImage(bgUrl);
      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      //overlay
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0,0,0,0.25)");
      gradient.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const leftMargin = 50;
      let startY = 150;

      // Title
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.shadowBlur = 8;
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 60px Sans";
      ctx.fillText("🤖 BOT STATUS", leftMargin, startY);

      // Info
      ctx.font = "bold 45px Sans";
      startY += 120;

      const info = [
        { text: `⏳ Uptime: ${uptimeStr}`, color: "#FFFFFF", glow: false },
        { text: `⚡ Ping: ${pingIcon} ${ping} ms`, color: pingColor, glow: true, spark: true },
        { text: `👑 Owner: Azad`, color: "#FFFFFF", glow: false }
      ];

      const spacing = 90;

      info.forEach(item => {
        if (item.glow) {
          ctx.shadowColor = item.color;
          ctx.shadowBlur = 20;
        } else {
          ctx.shadowColor = "rgba(0,0,0,0.6)";
          ctx.shadowBlur = 8;
        }

        ctx.fillStyle = item.color;
        ctx.fillText(item.text, leftMargin, startY);

        
        if (item.spark) {
          for (let i = 0; i < 12; i++) {
            const offsetX = Math.random() * 350;
            const offsetY = Math.random() * 10 - 5;
            ctx.fillStyle = item.color;
            ctx.globalAlpha = Math.random() * 0.7 + 0.3;
            ctx.beginPath();
            ctx.arc(leftMargin + offsetX, startY - 35 + offsetY, Math.random() * 3 + 1, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }

        startY += spacing;
      });

      // Save image
      const filePath = path.join(__dirname, "uptime.png");
      await fs.writeFile(filePath, canvas.toBuffer("image/png"));

     
      await message.reply({
        body: "╭───⊙  𝗕𝗢𝗧 𝗦𝗧𝗔𝗧𝗨𝗦  ⊙───╮\n\n│\n│  🤖 𝗡𝗮𝗺𝗲   : nezuko chan chat bot\n│  ⏳ 𝗨𝗽𝘁𝗶𝗺𝗲 : " + uptimeStr + "\n│  ⚡ 𝗣𝗶𝗻𝗴   : " + pingIcon + " " + ping + " ms\n│  👑 𝗢𝘄𝗻𝗲𝗿  : Azad\n│\n╰────────────⊙",
        attachment: fs.createReadStream(filePath)
      });

      await fs.unlink(filePath);

    } catch (err) {
      console.error(err);
      message.reply("❌ Failed to generate uptime image.");
    }
  }
};
