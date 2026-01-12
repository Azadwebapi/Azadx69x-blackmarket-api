const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "developer",
    aliases: ["dev"],
    version: "3.0",
    author: "Azadx69x",
    countDown: 5,
    role: 4,
    description: {
      en: "Add, remove developer role with canvas display"
    },
    category: "owner",
    guide: {
      en: "{pn} [add/remove/list/canvas] [uid/@tag/reply]"
    }
  },

  langs: {
    en: {
      added: "✅ | Added developer role for %1 users:\n%2",
      alreadyDev: "\n⚠️ | %1 users already have developer role:\n%2",
      missingIdAdd: "⚠️ | Reply / tag / UID required to add developer",
      removed: "✅ | Removed developer role of %1 users:\n%2",
      notDev: "⚠️ | %1 users don't have developer role:\n%2",
      missingIdRemove: "⚠️ | Reply / tag / UID required to remove developer"
    }
  },

  onStart: async function ({ message, args, usersData, event, getLang, api }) {
    // Load Canvas
    let Canvas, canvas, ctx;
    try {
      Canvas = require('canvas');
      // Register rounded rectangle function
      if (Canvas && Canvas.Context2d) {
        Canvas.Context2d.prototype.roundRect = function (x, y, width, height, radius) {
          if (width < 2 * radius) radius = width / 2;
          if (height < 2 * radius) radius = height / 2;
          this.beginPath();
          this.moveTo(x + radius, y);
          this.arcTo(x + width, y, x + width, y + height, radius);
          this.arcTo(x + width, y + height, x, y + height, radius);
          this.arcTo(x, y + height, x, y, radius);
          this.arcTo(x, y, x + width, y, radius);
          this.closePath();
          return this;
        };
      }
    } catch (e) {
      return message.reply("⚠️ | Canvas module not installed. Please install it with: npm install canvas");
    }

    // Check all possible keys for developer array
    let devArray = [];
    
    // Priority: developer -> devUsers -> developers
    if (config.developer && Array.isArray(config.developer)) {
      devArray = config.developer;
    } else if (config.devUsers && Array.isArray(config.devUsers)) {
      devArray = config.devUsers;
    } else if (config.developers && Array.isArray(config.developers)) {
      devArray = config.developers;
    }
    
    // Clean array (remove empty strings)
    const cleanDevArray = devArray.filter(uid => 
      uid && uid.toString().trim() !== "" && !isNaN(uid)
    );

    // Function to get user info
    const getUserInfo = async (uid) => {
      try {
        let name = `User_${uid.substring(0, 8)}`;
        let profilePic = `https://graph.facebook.com/${uid}/picture?width=720&height=720`;
        
        // Try API to get user info
        try {
          const userInfo = await api.getUserInfo(uid);
          if (userInfo && userInfo[uid]) {
            name = userInfo[uid].name || userInfo[uid].firstName || name;
          }
        } catch (e) {
          // Try usersData as fallback
          try {
            const userData = await usersData.get(uid);
            if (userData && userData.name && userData.name !== "Unknown User") {
              name = userData.name;
            }
          } catch (e2) {}
        }
        
        return { uid, name, profilePic };
        
      } catch (error) {
        console.error("Error getting user info for", uid, error.message);
        return { 
          uid, 
          name: `User_${uid.substring(0, 8)}`,
          profilePic: `https://graph.facebook.com/${uid}/picture?width=720&height=720`
        };
      }
    };

    // Function to download image
    const downloadImage = async (url, filepath) => {
      try {
        const response = await axios({
          url,
          responseType: 'stream',
          timeout: 10000
        });
        
        return new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(filepath);
          response.data.pipe(writer);
          writer.on('finish', resolve);
          writer.on('error', reject);
        });
      } catch (error) {
        console.error("Error downloading image:", url);
        return null;
      }
    };

    // Function to wrap text
    const wrapText = (ctx, text, maxWidth) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    };

    // Function to create MAIN canvas (all in one)
    const createMainCanvas = async (devs, action = null, targetUsers = []) => {
      try {
        // Calculate total height needed
        const headerHeight = 180;
        const footerHeight = 80;
        const devCardHeight = 120;
        const padding = 20;
        const devsPerPage = 6;
        
        const pages = Math.ceil(Math.max(devs.length, 1) / devsPerPage);
        let totalHeight = headerHeight + footerHeight;
        
        if (action === 'list' || action === 'canvas') {
          totalHeight += (Math.min(devs.length, devsPerPage) * devCardHeight) + (padding * 2);
        } else if (action === 'add') {
          totalHeight += 250; // For added users display
        } else if (action === 'remove') {
          totalHeight += 250; // For removed users display
        } else {
          totalHeight += 400; // For help/command list
        }
        
        // Create canvas
        canvas = Canvas.createCanvas(900, Math.min(totalHeight, 2000));
        ctx = canvas.getContext('2d');
        
        // Create gradient background
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#0a0a2a');
        gradient.addColorStop(0.5, '#1a1a3a');
        gradient.addColorStop(1, '#0a0a2a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw decorative patterns
        ctx.fillStyle = 'rgba(0, 255, 136, 0.05)';
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 3 + 1;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Draw top border
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(0, 0, canvas.width, 5);
        
        // Draw main header
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, 120);
        
        // Add title
        ctx.font = 'bold 40px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#00ff88';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0, 255, 136, 0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText('⚡ GOATBOT DEVELOPER SYSTEM', canvas.width / 2, 60);
        
        ctx.font = '22px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.fillText('Version 3.0 | By Azadx69x', canvas.width / 2, 95);
        
        // Add current date and time
        const now = new Date();
        ctx.font = '16px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#888888';
        ctx.fillText(`Generated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, canvas.width / 2, 120);
        
        let currentY = 150;
        
        // ========== ACTION-SPECIFIC DISPLAYS ==========
        
        if (action === 'list' || action === 'canvas') {
          // Display developer list
          ctx.font = 'bold 30px "Segoe UI", Arial, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'left';
          ctx.fillText('👨‍💻 ACTIVE DEVELOPERS', 50, currentY);
          
          currentY += 40;
          
          if (devs.length === 0) {
            ctx.font = '24px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#ff5555';
            ctx.textAlign = 'center';
            ctx.fillText('❌ NO DEVELOPERS FOUND', canvas.width / 2, currentY + 50);
            
            ctx.font = '20px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#888888';
            ctx.fillText('Use /dev add [uid] to add developers', canvas.width / 2, currentY + 100);
          } else {
            // Draw developers in a grid
            const devsPerRow = 2;
            const cardWidth = 400;
            const cardHeight = 100;
            const cardPadding = 15;
            
            for (let i = 0; i < Math.min(devs.length, devsPerPage); i++) {
              const dev = devs[i];
              const row = Math.floor(i / devsPerRow);
              const col = i % devsPerRow;
              
              const x = 50 + (col * (cardWidth + 30));
              const y = currentY + (row * (cardHeight + 20));
              
              // Draw developer card
              ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
              ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
              ctx.lineWidth = 2;
              ctx.roundRect(x, y, cardWidth, cardHeight, 10);
              ctx.fill();
              ctx.stroke();
              
              // Add number badge
              ctx.fillStyle = '#00ff88';
              ctx.roundRect(x + 10, y + 10, 30, 30, 5);
              ctx.fill();
              
              ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
              ctx.fillStyle = '#000000';
              ctx.textAlign = 'center';
              ctx.fillText(`${i + 1}`, x + 25, y + 30);
              
              // Developer name
              ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
              ctx.fillStyle = '#ffffff';
              ctx.textAlign = 'left';
              const displayName = dev.name.length > 20 ? dev.name.substring(0, 20) + '...' : dev.name;
              ctx.fillText(displayName, x + 60, y + 30);
              
              // UID
              ctx.font = '16px "Segoe UI", Arial, sans-serif';
              ctx.fillStyle = '#888888';
              ctx.fillText(`UID: ${dev.uid}`, x + 60, y + 55);
              
              // Status
              ctx.font = 'bold 14px "Segoe UI", Arial, sans-serif';
              ctx.fillStyle = '#00ff88';
              ctx.fillText('⚡ ACTIVE DEVELOPER', x + 60, y + 80);
            }
            
            currentY += (Math.ceil(Math.min(devs.length, devsPerPage) / devsPerRow) * (cardHeight + 20)) + 40;
            
            // Add statistics
            ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
            ctx.roundRect(50, currentY, 800, 60, 10);
            ctx.fill();
            
            ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText(`📊 TOTAL DEVELOPERS: ${devs.length}`, canvas.width / 2, currentY + 40);
          }
        }
        else if (action === 'add') {
          // Display added users
          ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
          ctx.fillStyle = '#00ff88';
          ctx.textAlign = 'center';
          ctx.fillText('✅ DEVELOPERS ADDED', canvas.width / 2, currentY);
          
          currentY += 50;
          
          if (targetUsers.length === 0) {
            ctx.font = '24px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#ff5555';
            ctx.fillText('No users specified to add', canvas.width / 2, currentY);
          } else {
            const addedInfo = await Promise.all(targetUsers.map(uid => getUserInfo(uid)));
            
            ctx.font = '20px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            
            let yPos = currentY;
            for (const user of addedInfo) {
              ctx.fillText(`• ${user.name} (${user.uid})`, 100, yPos);
              yPos += 35;
            }
            
            currentY = yPos + 20;
            
            ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#00ff88';
            ctx.textAlign = 'center';
            ctx.fillText(`🎉 ${targetUsers.length} User(s) Added Successfully!`, canvas.width / 2, currentY);
          }
        }
        else if (action === 'remove') {
          // Display removed users
          ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
          ctx.fillStyle = '#ff5555';
          ctx.textAlign = 'center';
          ctx.fillText('❌ DEVELOPERS REMOVED', canvas.width / 2, currentY);
          
          currentY += 50;
          
          if (targetUsers.length === 0) {
            ctx.font = '24px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#ff5555';
            ctx.fillText('No users specified to remove', canvas.width / 2, currentY);
          } else {
            const removedInfo = await Promise.all(targetUsers.map(uid => getUserInfo(uid)));
            
            ctx.font = '20px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'left';
            
            let yPos = currentY;
            for (const user of removedInfo) {
              ctx.fillText(`• ${user.name} (${user.uid})`, 100, yPos);
              yPos += 35;
            }
            
            currentY = yPos + 20;
            
            ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#ff5555';
            ctx.textAlign = 'center';
            ctx.fillText(`🗑️ ${targetUsers.length} User(s) Removed Successfully!`, canvas.width / 2, currentY);
          }
        }
        else {
          // Display help/commands
          ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
          ctx.fillStyle = '#00ff88';
          ctx.textAlign = 'center';
          ctx.fillText('📖 AVAILABLE COMMANDS', canvas.width / 2, currentY);
          
          currentY += 60;
          
          // Commands box
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.roundRect(50, currentY, 800, 300, 15);
          ctx.fill();
          
          ctx.strokeStyle = 'rgba(0, 255, 136, 0.3)';
          ctx.lineWidth = 2;
          ctx.roundRect(50, currentY, 800, 300, 15);
          ctx.stroke();
          
          const commands = [
            { cmd: '/dev list', desc: 'Show all developers' },
            { cmd: '/dev canvas', desc: 'Generate developer list image' },
            { cmd: '/dev add [uid]', desc: 'Add developer by UID' },
            { cmd: '/dev add @mention', desc: 'Add developer by mention' },
            { cmd: '/dev add', desc: 'Add yourself as developer' },
            { cmd: '/dev remove [uid]', desc: 'Remove developer by UID' },
            { cmd: '/dev remove @mention', desc: 'Remove developer by mention' }
          ];
          
          ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
          ctx.fillStyle = '#00ff88';
          ctx.textAlign = 'left';
          
          let yPos = currentY + 50;
          for (const command of commands) {
            ctx.fillText(command.cmd, 80, yPos);
            ctx.font = '20px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#cccccc';
            ctx.fillText(`- ${command.desc}`, 250, yPos);
            ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
            ctx.fillStyle = '#00ff88';
            yPos += 40;
          }
          
          currentY = yPos + 30;
          
          // Current stats
          ctx.fillStyle = 'rgba(0, 255, 136, 0.1)';
          ctx.roundRect(50, currentY, 800, 60, 10);
          ctx.fill();
          
          ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.fillText(`👥 Current Developers: ${devs.length}`, canvas.width / 2, currentY + 40);
        }
        
        // Draw footer
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, canvas.height - 60, canvas.width, 60);
        
        ctx.font = '16px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#888888';
        ctx.textAlign = 'center';
        ctx.fillText('Powered by GoatBot | Type /dev for commands', canvas.width / 2, canvas.height - 25);
        
        // Draw bottom border
        ctx.fillStyle = '#00ff88';
        ctx.fillRect(0, canvas.height - 5, canvas.width, 5);
        
        // Save the image
        const imagePath = path.join(__dirname, 'cache', `dev_system_${Date.now()}.png`);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(imagePath, buffer);
        
        return imagePath;
        
      } catch (error) {
        console.error("Error creating canvas:", error);
        throw error;
      }
    };

    const getUIDs = () => {
      let uids = [];

      // Check for mentions
      if (event.mentions && Object.keys(event.mentions).length > 0) {
        uids = Object.keys(event.mentions);
      }
      // Check for reply
      else if (event.messageReply && event.messageReply.senderID) {
        uids.push(event.messageReply.senderID);
      }
      // Check for arguments
      else if (args.length > 1) {
        uids = args.slice(1).filter(id => !isNaN(id) && id.trim() !== "");
      }
      // If only "add" command with no UID
      else if (args[0] === "add" && args.length === 1) {
        uids.push(event.senderID);
      }

      return [...new Set(uids.map(id => id.toString().trim()))];
    };

    const sub = (args[0] || "").toLowerCase();

    // ========= ALL COMMANDS RETURN IMAGES =========
    
    try {
      // Get current developers info
      const devs = await Promise.all(
        cleanDevArray.map(uid => getUserInfo(uid))
      );
      
      let imagePath;
      let attachmentMessage = "📸 Developer System Image Generated!";
      
      // ========= LIST / CANVAS =========
      if (sub === "list" || sub === "-l" || sub === "canvas" || sub === "-c" || !sub) {
        if (!sub || sub === "list" || sub === "-l" || sub === "canvas" || sub === "-c") {
          imagePath = await createMainCanvas(devs, 'list');
          if (devs.length === 0) {
            attachmentMessage = "⚠️ No developers found! Use /dev add to add yourself.";
          }
        }
      }
      
      // ========= ADD =========
      else if (sub === "add" || sub === "-a") {
        const uids = getUIDs();
        
        if (!uids.length) {
          imagePath = await createMainCanvas(devs, 'help');
          attachmentMessage = "⚠️ Please provide UID(s) to add!";
        } else {
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
            
            // Get updated developers list
            const updatedDevs = await Promise.all(
              newDevArray.map(uid => getUserInfo(uid))
            );
            
            imagePath = await createMainCanvas(updatedDevs, 'add', added);
            attachmentMessage = `✅ Added ${added.length} developer(s)!`;
          } else if (already.length > 0) {
            imagePath = await createMainCanvas(devs, 'help');
            attachmentMessage = `⚠️ ${already.length} user(s) already have developer role!`;
          }
        }
      }
      
      // ========= REMOVE =========
      else if (sub === "remove" || sub === "-r") {
        const uids = getUIDs();
        
        if (!uids.length) {
          imagePath = await createMainCanvas(devs, 'help');
          attachmentMessage = "⚠️ Please provide UID(s) to remove!";
        } else {
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
            
            // Get updated developers list
            const updatedDevs = await Promise.all(
              newDevArray.map(uid => getUserInfo(uid))
            );
            
            imagePath = await createMainCanvas(updatedDevs, 'remove', removed);
            attachmentMessage = `✅ Removed ${removed.length} developer(s)!`;
          } else if (notDev.length > 0) {
            imagePath = await createMainCanvas(devs, 'help');
            attachmentMessage = `⚠️ ${notDev.length} user(s) don't have developer role!`;
          }
        }
      }
      
      // ========= HELP =========
      else {
        imagePath = await createMainCanvas(devs, 'help');
        attachmentMessage = "📖 Developer System Commands";
      }
      
      // Send the image
      if (imagePath) {
        await message.reply({
          body: attachmentMessage,
          attachment: fs.createReadStream(imagePath)
        });
        
        // Clean up after 5 seconds
        setTimeout(() => {
          try { fs.unlinkSync(imagePath); } catch (e) {}
        }, 5000);
      }
      
    } catch (error) {
      console.error("Error in developer system:", error);
      return message.reply("❌ Error generating image. Please try again.");
    }
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
