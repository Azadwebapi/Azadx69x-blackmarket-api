const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

module.exports = {
    config: {
        name: "bank",
        version: "2.0-premium",
        author: "Azadx69x",
        role: 0,
        shortDescription: "𝐁𝐚𝐧𝐤𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦 𝐰𝐢𝐭𝐡 𝐀𝐓𝐌",
        longDescription: "𝐅𝐮𝐥𝐥 𝐛𝐚𝐧𝐤𝐢𝐧𝐠 𝐰𝐢𝐭𝐡 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐨𝐫, 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞, 𝐦𝐮𝐥𝐭𝐢𝐩𝐥𝐞 𝐝𝐞𝐬𝐢𝐠𝐧𝐬 𝐰𝐢𝐭𝐡 𝐩𝐫𝐨𝐟𝐞𝐬𝐬𝐢𝐨𝐧𝐚𝐥 𝐥𝐚𝐲𝐨𝐮𝐭.",
        category: "finance",
        guide: `{𝐩𝐧} - 𝐕𝐢𝐞𝐰 𝐛𝐚𝐧𝐤 𝐦𝐞𝐧𝐮
{𝐩𝐧} 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 - 𝐑𝐞𝐠𝐢𝐬𝐭𝐞𝐫 𝐚𝐜𝐜𝐨𝐮𝐧𝐭
{𝐩𝐧} 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 - 𝐂𝐡𝐞𝐜𝐤 𝐛𝐚𝐥𝐚𝐧𝐜𝐞  
{𝐩𝐧} 𝐝𝐞𝐩𝐨𝐬𝐢𝐭 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐃𝐞𝐩𝐨𝐬𝐢𝐭 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐖𝐢𝐭𝐡𝐝𝐫𝐚𝐰 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐡𝐢𝐬𝐭𝐨𝐫𝐲 - 𝐓𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧 𝐡𝐢𝐬𝐭𝐨𝐫𝐲
{𝐩𝐧} 𝐜𝐚𝐫𝐝 - 𝐕𝐢𝐞𝐰 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝
{𝐩𝐧} 𝐚𝐭𝐦𝐜𝐨𝐝𝐞 - 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞/𝐕𝐢𝐞𝐰 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
{𝐩𝐧} 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐜𝐨𝐝𝐞> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐖𝐢𝐭𝐡𝐝𝐫𝐚𝐰 𝐮𝐬𝐢𝐧𝐠 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
{𝐩𝐧} 𝐬𝐞𝐧𝐝 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐒𝐞𝐧𝐝 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 - 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐢𝐧𝐟𝐨𝐫𝐦𝐚𝐭𝐢𝐨𝐧`
    },
  
    formatMoney(amount) {
        if (isNaN(amount)) return "𝟎";
        amount = Number(amount);
        const scales = [
            { value: 1e15, suffix: '𝐐' },
            { value: 1e12, suffix: '𝐓' },
            { value: 1e9, suffix: '𝐁' },
            { value: 1e6, suffix: '𝐌' },
            { value: 1e3, suffix: '𝐤' }
        ];
        for (let scale of scales) {
            if (amount >= scale.value) {
                let val = amount / scale.value;
                return val % 1 === 0 ? `${val}${scale.suffix}` : `${val.toFixed(2)}${scale.suffix}`;
            }
        }
        return amount.toString();
    },

    generateCardNumber() {
        return "𝟓𝟐𝟖𝟒 " +
            Math.floor(1000 + Math.random() * 9000) + " " +
            Math.floor(1000 + Math.random() * 9000) + " " +
            Math.floor(1000 + Math.random() * 9000);
    },

    generateCVV() { return Math.floor(100 + Math.random() * 900).toString(); },
    generatePIN() { return Math.floor(1000 + Math.random() * 9000).toString(); },
    
    generateATMCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 8; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    },

    getExpiry() {
        const now = new Date();
        return `${now.getMonth() + 1}/${(now.getFullYear() + 4).toString().slice(-2)}`;
    },

    nowISO() {
        return new Date().toISOString();
    },

    cardDesigns: {
        default: {
            gradient: ["#0a0f24", "#16233f", "#1c2b4a"],
            chipColor: "#d4c28f",
            hologramColors: ["#d97c30", "#d9b130"],
        },
        ocean: {
            gradient: ["#004e92", "#000428", "#002f4b"],
            chipColor: "#b5c99a",
            hologramColors: ["#1ca3ec", "#50c9ce"],
        },
        sunset: {
            gradient: ["#ff512f", "#f09819", "#ff7e5f"],
            chipColor: "#ffd700",
            hologramColors: ["#ff4500", "#ff6347"],
        }
    },
  
    async createRealCard(card, username, balance, transactions = [], design = "default") {
        const width = 900, height = 540;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        const d = this.cardDesigns[design] || this.cardDesigns.default;
      
        const bg = ctx.createLinearGradient(0, 0, width, height);
        bg.addColorStop(0, d.gradient[0]);
        bg.addColorStop(0.5, d.gradient[1]);
        bg.addColorStop(1, d.gradient[2]);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
      
        ctx.font = "48px sans-serif";
        ctx.fillStyle = "white";
        ctx.fillText("𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐁𝐚𝐧𝐤 𝐖𝐚𝐥𝐥𝐞𝐭", 40, 80);
      
        ctx.fillStyle = d.chipColor;
        ctx.fillRect(40, 160, 120, 80);
        ctx.strokeStyle = "#8d7d47";
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 160, 120, 80);

        ctx.strokeStyle = "#b6a46b";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 190); ctx.lineTo(160, 190);
        ctx.moveTo(40, 210); ctx.lineTo(160, 210);
        ctx.stroke();
      
        ctx.font = "42px monospace";
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 10;
        ctx.fillText(card.number, 40, 340);
        ctx.shadowBlur = 0;
      
        ctx.font = "36px sans-serif";
        ctx.fillStyle = "#eeeeee";
        ctx.fillText(username.toUpperCase(), 40, 430);
      
        ctx.font = "28px sans-serif";
        ctx.fillStyle = "#bbbbbb";
        ctx.fillText("𝐕𝐀𝐋𝐈𝐃 𝐓𝐇𝐑𝐔", 600, 300);
        ctx.font = "44px monospace";
        ctx.fillStyle = "white";
        ctx.fillText(card.expiry, 600, 350);
      
        ctx.font = "26px sans-serif";
        ctx.fillStyle = "#dddddd";
        ctx.fillText("𝐂𝐕𝐕: *** (𝐇𝐢𝐝𝐝𝐞𝐧)", 600, 430);
      
        ctx.font = "34px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.fillText(`𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(balance)} 𝐁𝐃𝐓`, 860, 470);
      
        if (transactions.length) {
            const lastTx = transactions[transactions.length - 1];
            const typeSymbol = lastTx.type === "sent" ? "➡️" : "⬅️";
            const amountText = `${this.formatMoney(lastTx.amount)} 𝐁𝐃𝐓`;
            const info = `${typeSymbol} ${amountText} ${lastTx.type === "sent" ? "𝐒𝐞𝐧𝐭" : "𝐑𝐞𝐜𝐞𝐢𝐯𝐞𝐝"}`;
            ctx.font = "26px sans-serif";
            ctx.fillStyle = "#ffd700";
            ctx.textAlign = "left";
            ctx.fillText(info, 40, 470);
        }
      
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = d.hologramColors[0];
        ctx.beginPath(); ctx.arc(750, 140, 35, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = d.hologramColors[1];
        ctx.beginPath(); ctx.arc(790, 140, 35, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
      
        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `${Date.now()}_card.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },
  
    async onStart({ message, args, usersData, event }) {
        const uid = event.senderID;
        const action = args[0]?.toLowerCase();
        let data = await usersData.get(uid);
        if (!data.data) data.data = {};
        if (!data.data.bank)
            data.data.bank = {
                balance: 0,
                registered: false,
                card: null,
                transactions: [],
                accountNumber: `𝐆𝐁${Math.floor(1000000000000 + Math.random() * 9000000000000)}`,
                createdAt: null,
                savings: 0,
                atmCodes: []
            };
        const bank = data.data.bank;
      
        if (action === "register") {
            if (bank.registered) return message.reply("⚠️ 𝐘𝐨𝐮 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐡𝐚𝐯𝐞 𝐚 𝐛𝐚𝐧𝐤 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.");
            bank.registered = true;
            bank.balance = 0;
            bank.createdAt = this.nowISO();
            await usersData.set(uid, { data: data.data });

            return message.reply(
`✅ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐓𝐈𝐎𝐍 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋!
🏦 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐃𝐢𝐠𝐢𝐭𝐚𝐥 𝐁𝐚𝐧𝐤
📈 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐍𝐨: ${bank.accountNumber}
📅 𝐎𝐩𝐞𝐧𝐞𝐝: ${bank.createdAt}`
            );
        }

        if (!bank.registered)
            return message.reply("❌ 𝐘𝐨𝐮 𝐝𝐨𝐧'𝐭 𝐡𝐚𝐯𝐞 𝐚 𝐛𝐚𝐧𝐤 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.\n𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫\`");
      
        if (action === "atmcode") {
            const newCode = this.generateATMCode();
            const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
            
            if (!bank.atmCodes) bank.atmCodes = [];
            bank.atmCodes.push({
                code: newCode,
                createdAt: Date.now(),
                expiresAt: expiryTime,
                used: false,
                maxAmount: bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`🏧 𝐀𝐓𝐌 𝐂𝐎𝐃𝐄 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃
━━━━━━━━━━━━━━━━━━━
🔐 𝐘𝐨𝐮𝐫 𝐀𝐓𝐌 𝐂𝐨𝐝𝐞: \`${newCode}\`
⏰ 𝐄𝐱𝐩𝐢𝐫𝐞𝐬: ${new Date(expiryTime).toLocaleString()}
💰 𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓

📌 𝐇𝐨𝐰 𝐭𝐨 𝐮𝐬𝐞:
𝐒𝐞𝐧𝐝 𝐭𝐡𝐢𝐬 𝐜𝐨𝐝𝐞 𝐭𝐨 𝐬𝐨𝐦𝐞𝐨𝐧𝐞 𝐨𝐫 𝐮𝐬𝐞 𝐢𝐭 𝐲𝐨𝐮𝐫𝐬𝐞𝐥𝐟 𝐰𝐢𝐭𝐡:
\`𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 ${newCode} <𝐚𝐦𝐨𝐮𝐧𝐭>\`

⚠️ 𝐂𝐨𝐝𝐞 𝐞𝐱𝐩𝐢𝐫𝐞𝐬 𝐢𝐧 𝟐𝟒 𝐡𝐨𝐮𝐫𝐬 𝐚𝐧𝐝 𝐜𝐚𝐧 𝐨𝐧𝐥𝐲 𝐛𝐞 𝐮𝐬𝐞𝐝 𝐨𝐧𝐜𝐞!`
            );
        }
        
        if (action === "atmwithdraw") {
            const code = args[1]?.toUpperCase();
            const amount = parseFloat(args[2]);
            
            if (!code) return message.reply("❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞.\n𝐔𝐬𝐚𝐠𝐞: 𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐜𝐨𝐝𝐞> <𝐚𝐦𝐨𝐮𝐧𝐭>");
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐩𝐫𝐨𝐯𝐢𝐝𝐞 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭.");
            
            let foundUser = null;
            let foundCode = null;
            let foundUserId = null;
            
            const allUsers = await usersData.getAll();
            
            for (const [userId, userData] of Object.entries(allUsers)) {
                if (userData.data?.bank?.atmCodes) {
                    const atmCode = userData.data.bank.atmCodes.find(
                        c => c.code === code && !c.used && c.expiresAt > Date.now()
                    );
                    if (atmCode) {
                        foundUser = userData;
                        foundCode = atmCode;
                        foundUserId = userId;
                        break;
                    }
                }
            }
            
            if (!foundCode) {
                return message.reply("❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐨𝐫 𝐞𝐱𝐩𝐢𝐫𝐞𝐝 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞. 𝐂𝐨𝐝𝐞 𝐦𝐚𝐲 𝐡𝐚𝐯𝐞 𝐛𝐞𝐞𝐧 𝐮𝐬𝐞𝐝 𝐨𝐫 𝐞𝐱𝐩𝐢𝐫𝐞𝐝.");
            }
            
            if (amount > foundCode.maxAmount) {
                return message.reply(`❌ 𝐂𝐚𝐧𝐧𝐨𝐭 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 𝐦𝐨𝐫𝐞 𝐭𝐡𝐚𝐧 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐛𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(foundCode.maxAmount)} 𝐁𝐃𝐓`);
            }
            
            foundUser.data.bank.balance -= amount;
            foundCode.used = true;
            foundCode.usedAt = Date.now();
            foundCode.usedBy = uid;
            
            bank.balance += amount;
            
            foundUser.data.bank.transactions.push({
                type: "sent",
                amount: amount,
                to: data.name || "𝐀𝐓𝐌 𝐔𝐬𝐞𝐫",
                time: Date.now(),
                method: "𝐀𝐓𝐌 𝐂𝐨𝐝𝐞"
            });
            
            bank.transactions.push({
                type: "received",
                amount: amount,
                from: foundUser.name || "𝐀𝐓𝐌 𝐒𝐞𝐧𝐝𝐞𝐫",
                time: Date.now(),
                method: "𝐀𝐓𝐌 𝐂𝐨𝐝𝐞"
            });
            
            await usersData.set(foundUserId, { data: foundUser.data });
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`✅ 𝐀𝐓𝐌 𝐖𝐈𝐓𝐇𝐃𝐑𝐀𝐖𝐀𝐋 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋!
━━━━━━━━━━━━━━━━━━━
💰 𝐀𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(amount)} 𝐁𝐃𝐓
👤 𝐅𝐫𝐨𝐦: ${foundUser.name || "𝐔𝐬𝐞𝐫"}
👤 𝐓𝐨: ${data.name || "𝐘𝐨𝐮"}
💳 𝐘𝐨𝐮𝐫 𝐍𝐞𝐰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓

📝 𝐓𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐞𝐝 𝐯𝐢𝐚 𝐀𝐓𝐌 𝐂𝐨𝐝𝐞`
            );
        }

        if (action === "card") {
            if (!bank.card) {
                bank.card = {
                    number: this.generateCardNumber(),
                    cvv: this.generateCVV(),
                    pin: this.generatePIN(),
                    expiry: this.getExpiry(),
                };
                await usersData.set(uid, { data: data.data });
            }
            const chosenDesign = args[1]?.toLowerCase() || "default";
            const image = await this.createRealCard(bank.card, data.name || "𝐔𝐬𝐞𝐫", bank.balance, bank.transactions, chosenDesign);
            return message.reply({
                body:
                    `💳 𝐘𝐨𝐮𝐫 𝐀𝐓𝐌 𝐂𝐚𝐫𝐝\n\n` +
                    `𝐂𝐚𝐫𝐝 𝐍𝐮𝐦𝐛𝐞𝐫: ${bank.card.number}\n` +
                    `𝐄𝐱𝐩𝐢𝐫𝐲: ${bank.card.expiry}\n` +
                    `𝐏𝐈𝐍: ${bank.card.pin}\n` +
                    `𝐂𝐕𝐕: (𝐇𝐢𝐝𝐝𝐞𝐧)\n` +
                    `𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓\n\n` +
                    `🏧 𝐓𝐨 𝐠𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞, 𝐮𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐜𝐨𝐝𝐞\``,
                attachment: fs.createReadStream(image),
            });
        }
      
        if (action === "deposit") {
            const amount = parseFloat(args[1]);
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐄𝐧𝐭𝐞𝐫 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭.");
            bank.balance += amount;
            bank.transactions.push({ type: "received", amount, from: "𝐃𝐞𝐩𝐨𝐬𝐢𝐭", time: Date.now() });
            await usersData.set(uid, { data: data.data });
            return message.reply(`✅ 𝐃𝐞𝐩𝐨𝐬𝐢𝐭𝐞𝐝 **${this.formatMoney(amount)} 𝐁𝐃𝐓**\n💰 𝐍𝐞𝐰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: **${this.formatMoney(bank.balance)} 𝐁𝐃𝐓**`);
        }
      
        if (action === "withdraw") {
            const amount = parseFloat(args[1]);
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐄𝐧𝐭𝐞𝐫 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭.");
            if (amount > bank.balance) return message.reply("❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞.");
            bank.balance -= amount;
            bank.transactions.push({ type: "sent", amount, to: "𝐖𝐢𝐭𝐡𝐝𝐫𝐚𝐰𝐚𝐥", time: Date.now() });
            await usersData.set(uid, { data: data.data });
            return message.reply(`✅ 𝐖𝐢𝐭𝐡𝐝𝐫𝐞𝐰 **${this.formatMoney(amount)} 𝐁𝐃𝐓**\n💰 𝐍𝐞𝐰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: **${this.formatMoney(bank.balance)} 𝐁𝐃𝐓**`);
        }
      
        if (action === "send") {
            const target = args[1];
            const amount = parseFloat(args[2]);
            if (!target) return message.reply("❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐬𝐩𝐞𝐜𝐢𝐟𝐲 𝐫𝐞𝐜𝐢𝐩𝐢𝐞𝐧𝐭.");
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐄𝐧𝐭𝐞𝐫 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭.");
            if (amount > bank.balance) return message.reply("❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞.");
            let targetData = await usersData.get(target);
            if (!targetData.data) targetData.data = {};
            if (!targetData.data.bank) targetData.data.bank = { balance: 0, registered: false, card: null, transactions: [], atmCodes: [] };
            if (!targetData.data.bank.registered) return message.reply("❌ 𝐑𝐞𝐜𝐢𝐩𝐢𝐞𝐧𝐭 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐡𝐚𝐯𝐞 𝐚 𝐛𝐚𝐧𝐤 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.");
            bank.balance -= amount;
            targetData.data.bank.balance += amount;
            bank.transactions.push({ type: "sent", amount, to: targetData.name || "𝐔𝐬𝐞𝐫", time: Date.now() });
            targetData.data.bank.transactions.push({ type: "received", amount, from: data.name || "𝐔𝐬𝐞𝐫", time: Date.now() });
            await usersData.set(uid, { data: data.data });
            await usersData.set(target, { data: targetData.data });
            return message.reply(`✅ 𝐒𝐞𝐧𝐭 **${this.formatMoney(amount)} 𝐁𝐃𝐓** 𝐭𝐨 ${targetData.name || "𝐔𝐬𝐞𝐫"}.\n💰 𝐍𝐞𝐰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: **${this.formatMoney(bank.balance)} 𝐁𝐃𝐓**`);
        }
      
        if (action === "history") {
            let historyText = "📝 𝐓𝐑𝐀𝐍𝐒𝐀𝐂𝐓𝐈𝐎𝐍 𝐇𝐈𝐒𝐓𝐎𝐑𝐘\n━━━━━━━━━━━━━━━━━\n";
            if (!bank.transactions.length) {
                historyText += "𝐍𝐨 𝐭𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧𝐬 𝐲𝐞𝐭.";
            } else {
                bank.transactions.slice(-10).reverse().forEach((tx, i) => {
                    const date = tx.time ? new Date(tx.time).toLocaleString() : "𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐃𝐚𝐭𝐞";
                    const method = tx.method ? ` [${tx.method}]` : '';
                    if (tx.type === "received") {
                        historyText += `${i + 1}. 📥 𝐑𝐄𝐂𝐄𝐈𝐕𝐄𝐃${method}\n   +${this.formatMoney(tx.amount)} 𝐁𝐃𝐓 | ${date}\n   𝐅𝐫𝐨𝐦: ${tx.from || "𝐔𝐧𝐤𝐧𝐨𝐰𝐧"}\n\n`;
                    } else if (tx.type === "sent") {
                        historyText += `${i + 1}. 📤 𝐒𝐄𝐍𝐓${method}\n   -${this.formatMoney(tx.amount)} 𝐁𝐃𝐓 | ${date}\n   𝐓𝐨: ${tx.to || "𝐔𝐧𝐤𝐧𝐨𝐰𝐧"}\n\n`;
                    }
                });
            }
            
            if (bank.atmCodes && bank.atmCodes.length > 0) {
                historyText += "\n🏧 𝐀𝐂𝐓𝐈𝐕𝐄 𝐀𝐓𝐌 𝐂𝐎𝐃𝐄𝐒\n";
                const activeCodes = bank.atmCodes.filter(c => !c.used && c.expiresAt > Date.now());
                if (activeCodes.length > 0) {
                    activeCodes.forEach((c, i) => {
                        historyText += `${i+1}. 𝐂𝐨𝐝𝐞: ${c.code} | 𝐄𝐱𝐩: ${new Date(c.expiresAt).toLocaleString()}\n`;
                    });
                } else {
                    historyText += "𝐍𝐨 𝐚𝐜𝐭𝐢𝐯𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞𝐬.\n";
                }
            }
            
            return message.reply(historyText);
        }
      
        if (action === "account") {
            return message.reply(
`💳 𝐀𝐂𝐂𝐎𝐔𝐍𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍

🏦 𝐏𝐫𝐞𝐦𝐢𝐮𝐦 𝐃𝐢𝐠𝐢𝐭𝐚𝐥 𝐁𝐚𝐧𝐤
━━━━━━━━━━━━━━━━━
👤 𝐇𝐨𝐥𝐝𝐞𝐫: ${data.name || "𝐔𝐬𝐞𝐫"}
📈 𝐀𝐜𝐜𝐨𝐮𝐧𝐭: ${bank.accountNumber}
💴 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
💎 𝐒𝐚𝐯𝐢𝐧𝐠𝐬: ${this.formatMoney(bank.savings || 0)} 𝐁𝐃𝐓
🏧 𝐀𝐓𝐌 𝐂𝐨𝐝𝐞𝐬: ${bank.atmCodes?.filter(c => !c.used && c.expiresAt > Date.now()).length || 0} 𝐚𝐜𝐭𝐢𝐯𝐞
━━━━━━━━━━━━━━━━━`
            );
        }

        return message.reply(
`🏦 𝐏𝐑𝐄𝐌𝐈𝐔𝐌 𝐁𝐀𝐍𝐊 𝐌𝐄𝐍𝐔
━━━━━━━━━━━━━━━━━━━
💳 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬:
• 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 - 𝐂𝐫𝐞𝐚𝐭𝐞 𝐚𝐜𝐜𝐨𝐮𝐧𝐭
• 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 - 𝐂𝐡𝐞𝐜𝐤 𝐛𝐚𝐥𝐚𝐧𝐜𝐞
• 𝐜𝐚𝐫𝐝 - 𝐕𝐢𝐞𝐰 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝
• 𝐚𝐭𝐦𝐜𝐨𝐝𝐞 - 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
• 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 - 𝐔𝐬𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
• 𝐝𝐞𝐩𝐨𝐬𝐢𝐭 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐝𝐝 𝐦𝐨𝐧𝐞𝐲
• 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐓𝐚𝐤𝐞 𝐦𝐨𝐧𝐞𝐲
• 𝐬𝐞𝐧𝐝 <𝐮𝐢𝐝> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐒𝐞𝐧𝐝 𝐦𝐨𝐧𝐞𝐲
• 𝐡𝐢𝐬𝐭𝐨𝐫𝐲 - 𝐕𝐢𝐞𝐰 𝐭𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧𝐬
• 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 - 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐝𝐞𝐭𝐚𝐢𝐥𝐬

💡 𝐄𝐱𝐚𝐦𝐩𝐥𝐞:
𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐜𝐨𝐝𝐞
𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 𝐀𝐁𝐂𝟏𝟐𝟑𝟒𝟓 𝟏𝟎𝟎𝟎

━━━━━━━━━━━━━━━━━━━`
        );
    }
};
