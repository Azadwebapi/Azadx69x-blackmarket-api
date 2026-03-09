const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

module.exports = {
    config: {
        name: "bank",
        version: "3.0-ultimate",
        author: "Azadx69x",
        role: 0,
        shortDescription: "𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐁𝐚𝐧𝐤𝐢𝐧𝐠 𝐒𝐲𝐬𝐭𝐞𝐦",
        longDescription: "𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞 𝐝𝐢𝐠𝐢𝐭𝐚𝐥 𝐛𝐚𝐧𝐤𝐢𝐧𝐠 𝐰𝐢𝐭𝐡 𝐀𝐓𝐌, 𝐥𝐨𝐚𝐧, 𝐅𝐃, 𝐬𝐚𝐯𝐢𝐧𝐠𝐬, 𝐜𝐫𝐞𝐝𝐢𝐭 𝐬𝐜𝐨𝐫𝐞 & 𝐦𝐨𝐫𝐞",
        category: "finance",
        guide: `{𝐩𝐧} - 𝐕𝐢𝐞𝐰 𝐦𝐞𝐧𝐮
{𝐩𝐧} 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 - 𝐎𝐩𝐞𝐧 𝐚𝐜𝐜𝐨𝐮𝐧𝐭
{𝐩𝐧} 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 - 𝐂𝐡𝐞𝐜𝐤 𝐛𝐚𝐥𝐚𝐧𝐜𝐞
{𝐩𝐧} 𝐝𝐞𝐩𝐨𝐬𝐢𝐭 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐝𝐝 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐓𝐚𝐤𝐞 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐬𝐞𝐧𝐝 <@𝐮𝐬𝐞𝐫> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐒𝐞𝐧𝐝 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐜𝐚𝐫𝐝 - 𝐕𝐢𝐞𝐰 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝
{𝐩𝐧} 𝐚𝐭𝐦𝐜𝐨𝐝𝐞 - 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
{𝐩𝐧} 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐜𝐨𝐝𝐞> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐔𝐬𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
{𝐩𝐧} 𝐡𝐢𝐬𝐭𝐨𝐫𝐲 - 𝐓𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧 𝐡𝐢𝐬𝐭𝐨𝐫𝐲
{𝐩𝐧} 𝐥𝐨𝐚𝐧 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐩𝐩𝐥𝐲 𝐟𝐨𝐫 𝐥𝐨𝐚𝐧
{𝐩𝐧} 𝐫𝐞𝐩𝐚𝐲 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐑𝐞𝐩𝐚𝐲 𝐥𝐨𝐚𝐧
{𝐩𝐧} 𝐟𝐝 𝐜𝐫𝐞𝐚𝐭𝐞 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐅𝐢𝐱𝐞𝐝 𝐃𝐞𝐩𝐨𝐬𝐢𝐭
{𝐩𝐧} 𝐟𝐝 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 - 𝐖𝐢𝐭𝐡𝐝𝐫𝐚𝐰 𝐅𝐃 𝐰𝐢𝐭𝐡 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭
{𝐩𝐧} 𝐬𝐚𝐯𝐢𝐧𝐠𝐬 - 𝐕𝐢𝐞𝐰 𝐬𝐚𝐯𝐢𝐧𝐠𝐬
{𝐩𝐧} 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭 - 𝐂𝐨𝐥𝐥𝐞𝐜𝐭 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭
{𝐩𝐧} 𝐥𝐞𝐚𝐝𝐞𝐫𝐛𝐨𝐚𝐫𝐝 - 𝐓𝐨𝐩 𝟏𝟎 𝐫𝐢𝐜𝐡
{𝐩𝐧} 𝐦𝐢𝐧𝐢𝐬𝐭𝐚𝐭𝐞𝐦𝐞𝐧𝐭 - 𝐋𝐚𝐬𝐭 𝟓 𝐭𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧𝐬
{𝐩𝐧} 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 - 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐝𝐞𝐭𝐚𝐢𝐥𝐬
{𝐩𝐧} 𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫 <𝐚𝐜𝐜𝐨𝐮𝐧𝐭#> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐓𝐫𝐚𝐧𝐬𝐟𝐞𝐫 𝐛𝐲 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 𝐧𝐮𝐦𝐛𝐞𝐫`
    },

    // Helper Functions
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

    generateAccountNumber() {
        return `𝐆𝐁${Math.floor(10000000 + Math.random() * 90000000)}${Math.floor(1000 + Math.random() * 9000)}`;
    },

    getExpiry() {
        const now = new Date();
        return `${now.getMonth() + 1}/${(now.getFullYear() + 4).toString().slice(-2)}`;
    },

    nowISO() {
        return new Date().toISOString();
    },

    calculateInterest(amount, days) {
        const rate = 0.05; // 5% interest rate
        return amount * rate * (days / 365);
    },

    calculateLoanInterest(amount, days) {
        const rate = 0.12; // 12% interest rate for loans
        return amount * rate * (days / 365);
    },

    calculateCreditScore(transactions, balance, loanHistory) {
        let score = 500; // Base score
        
        // More transactions = higher score
        score += Math.min(transactions.length * 5, 200);
        
        // Higher balance = higher score
        score += Math.min(Math.floor(balance / 10000) * 2, 200);
        
        // Loan repayment history
        if (loanHistory) {
            if (loanHistory.repaidOnTime) score += 100;
            if (loanHistory.defaulted) score -= 200;
        }
        
        return Math.min(Math.max(score, 300), 850); // Clamp between 300-850
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
        },
        emerald: {
            gradient: ["#134e5e", "#71b280", "#1b813e"],
            chipColor: "#e5e5e5",
            hologramColors: ["#0b8793", "#360033"],
        },
        royal: {
            gradient: ["#141e30", "#243b55", "#4b6cb7"],
            chipColor: "#f1c40f",
            hologramColors: ["#c0392b", "#8e44ad"],
        }
    },

    async createRealCard(card, username, balance, transactions = [], design = "default", creditScore = 700) {
        const width = 900, height = 540;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        const d = this.cardDesigns[design] || this.cardDesigns.default;
        
        // Gradient Background
        const bg = ctx.createLinearGradient(0, 0, width, height);
        bg.addColorStop(0, d.gradient[0]);
        bg.addColorStop(0.5, d.gradient[1]);
        bg.addColorStop(1, d.gradient[2]);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, width, height);
        
        // Bank Name
        ctx.font = "bold 48px 'Arial'";
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;
        ctx.fillText("𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐁𝐚𝐧𝐤", 40, 80);
        ctx.shadowBlur = 0;
        
        // Chip
        ctx.fillStyle = d.chipColor;
        ctx.fillRect(40, 160, 120, 80);
        ctx.strokeStyle = "#8d7d47";
        ctx.lineWidth = 3;
        ctx.strokeRect(40, 160, 120, 80);

        // Chip lines
        ctx.strokeStyle = "#b6a46b";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 190); ctx.lineTo(160, 190);
        ctx.moveTo(40, 210); ctx.lineTo(160, 210);
        ctx.stroke();
        
        // Card Number
        ctx.font = "42px monospace";
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 10;
        ctx.fillText(card.number, 40, 340);
        ctx.shadowBlur = 0;
        
        // Card Holder
        ctx.font = "36px sans-serif";
        ctx.fillStyle = "#eeeeee";
        ctx.fillText(username.toUpperCase(), 40, 430);
        
        // Valid Thru
        ctx.font = "28px sans-serif";
        ctx.fillStyle = "#bbbbbb";
        ctx.fillText("𝐕𝐀𝐋𝐈𝐃 𝐓𝐇𝐑𝐔", 600, 300);
        ctx.font = "44px monospace";
        ctx.fillStyle = "white";
        ctx.fillText(card.expiry, 600, 350);
        
        // CVV
        ctx.font = "26px sans-serif";
        ctx.fillStyle = "#dddddd";
        ctx.fillText("𝐂𝐕𝐕: ***", 600, 430);
        
        // Balance and Credit Score
        ctx.font = "28px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "right";
        ctx.fillText(`𝐁𝐚𝐥: ${this.formatMoney(balance)} 𝐁𝐃𝐓`, 860, 200);
        ctx.fillText(`𝐂𝐫𝐞𝐝𝐢𝐭: ${creditScore}`, 860, 250);
        
        // Last Transaction
        if (transactions.length) {
            const lastTx = transactions[transactions.length - 1];
            const typeSymbol = lastTx.type === "sent" ? "➡️" : "⬅️";
            const amountText = `${this.formatMoney(lastTx.amount)} 𝐁𝐃𝐓`;
            const info = `${typeSymbol} ${amountText}`;
            ctx.font = "26px sans-serif";
            ctx.fillStyle = "#ffd700";
            ctx.textAlign = "left";
            ctx.fillText(info, 40, 500);
        }
        
        // Hologram
        ctx.globalAlpha = 0.85;
        ctx.fillStyle = d.hologramColors[0];
        ctx.beginPath(); ctx.arc(750, 140, 35, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = d.hologramColors[1];
        ctx.beginPath(); ctx.arc(790, 140, 35, 0, Math.PI*2); ctx.fill();
        ctx.globalAlpha = 1;
        
        // Visa/Mastercard Logo
        ctx.font = "bold 32px 'Arial'";
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillText("𝐕𝐈𝐒𝐀", 750, 480);
        
        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `${Date.now()}_card.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async onStart({ message, args, usersData, event, api }) {
        const uid = event.senderID;
        const action = args[0]?.toLowerCase();
        let data = await usersData.get(uid);
        
        // Initialize bank data if not exists
        if (!data.data) data.data = {};
        if (!data.data.bank) {
            data.data.bank = {
                balance: 0,
                registered: false,
                card: null,
                transactions: [],
                accountNumber: this.generateAccountNumber(),
                createdAt: null,
                savings: 0,
                atmCodes: [],
                loan: {
                    amount: 0,
                    takenAt: null,
                    dueDate: null,
                    interest: 0
                },
                fixedDeposits: [],
                creditScore: 500,
                lastInterestClaim: null,
                accountType: "𝐒𝐭𝐚𝐧𝐝𝐚𝐫𝐝", // Standard, Premium, Gold, Platinum
                dailyLimit: 100000,
                usedToday: 0,
                lastReset: new Date().setHours(0,0,0,0)
            };
        }
        
        const bank = data.data.bank;
        
        // Reset daily limit if new day
        const today = new Date().setHours(0,0,0,0);
        if (bank.lastReset < today) {
            bank.usedToday = 0;
            bank.lastReset = today;
        }
        
        // Update account type based on balance
        if (bank.balance >= 10000000) bank.accountType = "𝐏𝐥𝐚𝐭𝐢𝐧𝐮𝐦";
        else if (bank.balance >= 5000000) bank.accountType = "𝐆𝐨𝐥𝐝";
        else if (bank.balance >= 1000000) bank.accountType = "𝐏𝐫𝐞𝐦𝐢𝐮𝐦";
        else bank.accountType = "𝐒𝐭𝐚𝐧𝐝𝐚𝐫𝐝";
        
        // Update credit score
        bank.creditScore = this.calculateCreditScore(bank.transactions, bank.balance, bank.loan);

        // Register Command
        if (action === "register") {
            if (bank.registered) return message.reply("⚠️ 𝐘𝐨𝐮 𝐚𝐥𝐫𝐞𝐚𝐝𝐲 𝐡𝐚𝐯𝐞 𝐚 𝐛𝐚𝐧𝐤 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.");
            
            bank.registered = true;
            bank.balance = 1000; // Welcome bonus
            bank.createdAt = this.nowISO();
            bank.transactions.push({
                type: "received",
                amount: 1000,
                from: "𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐁𝐨𝐧𝐮𝐬",
                time: Date.now()
            });
            
            await usersData.set(uid, { data: data.data });

            return message.reply(
`✅ 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐓𝐈𝐎𝐍 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋!
━━━━━━━━━━━━━━━━━━━
🏦 𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐃𝐢𝐠𝐢𝐭𝐚𝐥 𝐁𝐚𝐧𝐤
📈 𝐀𝐜𝐜𝐨𝐮𝐧𝐭: ${bank.accountNumber}
💰 𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐁𝐨𝐧𝐮𝐬: 𝟏,𝟎𝟎𝟎 𝐁𝐃𝐓
📅 𝐎𝐩𝐞𝐧𝐞𝐝: ${bank.createdAt}
💳 𝐓𝐲𝐩𝐞: ${bank.accountType}

𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐜𝐚𝐫𝐝\` 𝐭𝐨 𝐯𝐢𝐞𝐰 𝐲𝐨𝐮𝐫 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝`
            );
        }

        if (!bank.registered)
            return message.reply("❌ 𝐘𝐨𝐮 𝐝𝐨𝐧'𝐭 𝐡𝐚𝐯𝐞 𝐚 𝐛𝐚𝐧𝐤 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.\n𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫\`");

        // Balance Command
        if (action === "balance") {
            return message.reply(
`💰 𝐁𝐀𝐋𝐀𝐍𝐂𝐄 𝐈𝐍𝐅𝐎
━━━━━━━━━━━━━━━━━━━
💳 𝐀𝐜𝐜𝐨𝐮𝐧𝐭: ${bank.accountNumber}
💴 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
🏦 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐓𝐲𝐩𝐞: ${bank.accountType}
📊 𝐂𝐫𝐞𝐝𝐢𝐭 𝐒𝐜𝐨𝐫𝐞: ${bank.creditScore}
💎 𝐒𝐚𝐯𝐢𝐧𝐠𝐬: ${this.formatMoney(bank.savings)} 𝐁𝐃𝐓
━━━━━━━━━━━━━━━━━━━`
            );
        }

        // ATM Code Generation
        if (action === "atmcode") {
            const newCode = this.generateATMCode();
            const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
            
            if (!bank.atmCodes) bank.atmCodes = [];
            bank.atmCodes.push({
                code: newCode,
                createdAt: Date.now(),
                expiresAt: expiryTime,
                used: false,
                maxAmount: Math.min(bank.balance, bank.dailyLimit - bank.usedToday)
            });
            
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`🏧 𝐀𝐓𝐌 𝐂𝐎𝐃𝐄 𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃
━━━━━━━━━━━━━━━━━━━
🔐 𝐂𝐨𝐝𝐞: \`${newCode}\`
⏰ 𝐄𝐱𝐩𝐢𝐫𝐞𝐬: ${new Date(expiryTime).toLocaleString()}
💰 𝐌𝐚𝐱 𝐀𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(Math.min(bank.balance, bank.dailyLimit - bank.usedToday))} 𝐁𝐃𝐓
📊 𝐃𝐚𝐢𝐥𝐲 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓

📌 𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 ${newCode} <𝐚𝐦𝐨𝐮𝐧𝐭>\`

⚠️ 𝐄𝐱𝐩𝐢𝐫𝐞𝐬 𝐢𝐧 𝟐𝟒𝐡 | 𝐎𝐧𝐞 𝐭𝐢𝐦𝐞 𝐮𝐬𝐞`
            );
        }
        
        // ATM Withdrawal
        if (action === "atmwithdraw") {
            const code = args[1]?.toUpperCase();
            const amount = parseFloat(args[2]);
            
            if (!code) return message.reply("❌ 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞.\n𝐔𝐬𝐚𝐠𝐞: 𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐜𝐨𝐝𝐞> <𝐚𝐦𝐨𝐮𝐧𝐭>");
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐕𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝.");
            
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
                return message.reply("❌ 𝐈𝐧𝐯𝐚𝐥𝐢𝐝/𝐞𝐱𝐩𝐢𝐫𝐞𝐝 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞.");
            }
            
            if (amount > foundCode.maxAmount) {
                return message.reply(`❌ 𝐌𝐚𝐱 𝐚𝐥𝐥𝐨𝐰𝐞𝐝: ${this.formatMoney(foundCode.maxAmount)} 𝐁𝐃𝐓`);
            }
            
            if (amount > foundUser.data.bank.balance) {
                return message.reply(`❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 𝐢𝐧 𝐬𝐨𝐮𝐫𝐜𝐞 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.`);
            }
            
            // Process transaction
            foundUser.data.bank.balance -= amount;
            foundCode.used = true;
            foundCode.usedAt = Date.now();
            foundCode.usedBy = uid;
            
            bank.balance += amount;
            bank.usedToday += amount;
            
            // Transaction records
            foundUser.data.bank.transactions.push({
                type: "sent",
                amount: amount,
                to: data.name || "𝐀𝐓𝐌 𝐔𝐬𝐞𝐫",
                time: Date.now(),
                method: "𝐀𝐓𝐌 𝐂𝐨𝐝𝐞",
                balance: foundUser.data.bank.balance
            });
            
            bank.transactions.push({
                type: "received",
                amount: amount,
                from: foundUser.name || "𝐀𝐓𝐌 𝐒𝐞𝐧𝐝𝐞𝐫",
                time: Date.now(),
                method: "𝐀𝐓𝐌 𝐂𝐨𝐝𝐞",
                balance: bank.balance
            });
            
            await usersData.set(foundUserId, { data: foundUser.data });
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`✅ 𝐀𝐓𝐌 𝐖𝐈𝐓𝐇𝐃𝐑𝐀𝐖𝐀𝐋 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!
━━━━━━━━━━━━━━━━━━━
💰 𝐀𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(amount)} 𝐁𝐃𝐓
👤 𝐅𝐫𝐨𝐦: ${foundUser.name || "𝐔𝐬𝐞𝐫"}
💳 𝐘𝐨𝐮𝐫 𝐁𝐚𝐥: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
📊 𝐃𝐚𝐢𝐥𝐲 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓

📝 𝐓𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐞𝐝`
            );
        }

        // Card Command
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
            if (!this.cardDesigns[chosenDesign] && chosenDesign !== "default") {
                return message.reply(`𝐀𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐝𝐞𝐬𝐢𝐠𝐧𝐬: ${Object.keys(this.cardDesigns).join(', ')}`);
            }
            
            const image = await this.createRealCard(
                bank.card, 
                data.name || "𝐔𝐬𝐞𝐫", 
                bank.balance, 
                bank.transactions, 
                chosenDesign,
                bank.creditScore
            );
            
            return message.reply({
                body:
                    `💳 𝐘𝐨𝐮𝐫 𝐀𝐓𝐌 𝐂𝐚𝐫𝐝\n` +
                    `━━━━━━━━━━━━━━━━━━━\n` +
                    `💳 𝐂𝐚𝐫𝐝: ${bank.card.number}\n` +
                    `📅 𝐄𝐱𝐩: ${bank.card.expiry}\n` +
                    `🔐 𝐏𝐈𝐍: ${bank.card.pin}\n` +
                    `📊 𝐂𝐒: ${bank.creditScore}\n` +
                    `💰 𝐁𝐚𝐥: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓\n` +
                    `━━━━━━━━━━━━━━━━━━━\n` +
                    `🎨 𝐃𝐞𝐬𝐢𝐠𝐧: ${chosenDesign}\n` +
                    `🏧 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞: \`𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐜𝐨𝐝𝐞\``,
                attachment: fs.createReadStream(image),
            });
        }

        // Loan Command
        if (action === "loan") {
            const amount = parseFloat(args[1]);
            
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐕𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝.");
            
            // Credit score check
            if (bank.creditScore < 600) {
                return message.reply(`❌ 𝐋𝐨𝐚𝐧 𝐫𝐞𝐣𝐞𝐜𝐭𝐞𝐝! 𝐘𝐨𝐮𝐫 𝐜𝐫𝐞𝐝𝐢𝐭 𝐬𝐜𝐨𝐫𝐞 (${bank.creditScore}) 𝐢𝐬 𝐭𝐨𝐨 𝐥𝐨𝐰. 𝐌𝐢𝐧 𝟔𝟎𝟎 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝.`);
            }
            
            // Maximum loan amount based on credit score
            let maxLoan = bank.balance * 2; // 2x current balance
            if (bank.creditScore >= 750) maxLoan = bank.balance * 5;
            else if (bank.creditScore >= 700) maxLoan = bank.balance * 3;
            
            if (amount > maxLoan) {
                return message.reply(`❌ 𝐌𝐚𝐱 𝐥𝐨𝐚𝐧 𝐚𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(maxLoan)} 𝐁𝐃𝐓`);
            }
            
            // Check existing loan
            if (bank.loan && bank.loan.amount > 0) {
                return message.reply(`❌ 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐚𝐧 𝐞𝐱𝐢𝐬𝐭𝐢𝐧𝐠 𝐥𝐨𝐚𝐧 𝐨𝐟 ${this.formatMoney(bank.loan.amount)} 𝐁𝐃𝐓`);
            }
            
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + 6); // 6 months loan period
            
            bank.loan = {
                amount: amount,
                takenAt: Date.now(),
                dueDate: dueDate.getTime(),
                interest: this.calculateLoanInterest(amount, 180),
                repaid: false
            };
            
            bank.balance += amount;
            
            bank.transactions.push({
                type: "received",
                amount: amount,
                from: "𝐁𝐚𝐧𝐤 𝐋𝐨𝐚𝐧",
                time: Date.now(),
                method: "𝐋𝐨𝐚𝐧 𝐃𝐢𝐬𝐛𝐮𝐫𝐬𝐞𝐦𝐞𝐧𝐭",
                balance: bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`✅ 𝐋𝐎𝐀𝐍 𝐀𝐏𝐏𝐑𝐎𝐕𝐄𝐃!
━━━━━━━━━━━━━━━━━━━
💰 𝐀𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(amount)} 𝐁𝐃𝐓
📊 𝐈𝐧𝐭𝐞𝐫𝐞𝐬𝐭: ${this.formatMoney(bank.loan.interest)} 𝐁𝐃𝐓 (𝟏𝟐%)
📅 𝐃𝐮𝐞 𝐃𝐚𝐭𝐞: ${new Date(dueDate).toLocaleDateString()}
💳 𝐍𝐞𝐰 𝐁𝐚𝐥: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
📈 𝐂𝐫𝐞𝐝𝐢𝐭 𝐒𝐜𝐨𝐫𝐞: ${bank.creditScore}

𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐫𝐞𝐩𝐚𝐲 <𝐚𝐦𝐨𝐮𝐧𝐭>\` 𝐭𝐨 𝐫𝐞𝐩𝐚𝐲`
            );
        }

        // Repay Loan
        if (action === "repay") {
            const amount = parseFloat(args[1]);
            
            if (!bank.loan || bank.loan.amount <= 0) {
                return message.reply("❌ 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐧𝐨 𝐚𝐜𝐭𝐢𝐯𝐞 𝐥𝐨𝐚𝐧.");
            }
            
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐕𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝.");
            
            const totalDue = bank.loan.amount + bank.loan.interest;
            
            if (amount > bank.balance) {
                return message.reply(`❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞. 𝐍𝐞𝐞𝐝: ${this.formatMoney(amount)} 𝐁𝐃𝐓`);
            }
            
            if (amount > totalDue) {
                return message.reply(`❌ 𝐘𝐨𝐮 𝐨𝐧𝐥𝐲 𝐨𝐰𝐞 ${this.formatMoney(totalDue)} 𝐁𝐃𝐓`);
            }
            
            bank.balance -= amount;
            bank.loan.amount -= amount;
            
            if (bank.loan.amount < 0) {
                // Overpayment handling
                const overpaid = Math.abs(bank.loan.amount);
                bank.balance += overpaid;
                bank.loan.amount = 0;
            }
            
            if (bank.loan.amount <= 0) {
                bank.loan = { amount: 0, takenAt: null, dueDate: null, interest: 0 };
            } else {
                // Recalculate interest on remaining amount
                const daysRemaining = (bank.loan.dueDate - Date.now()) / (1000 * 60 * 60 * 24);
                bank.loan.interest = this.calculateLoanInterest(bank.loan.amount, daysRemaining);
            }
            
            bank.transactions.push({
                type: "sent",
                amount: amount,
                to: "𝐋𝐨𝐚𝐧 𝐑𝐞𝐩𝐚𝐲𝐦𝐞𝐧𝐭",
                time: Date.now(),
                method: "𝐋𝐨𝐚𝐧 𝐑𝐞𝐩𝐚𝐲𝐦𝐞𝐧𝐭",
                balance: bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`✅ 𝐋𝐎𝐀𝐍 𝐑𝐄𝐏𝐀𝐘𝐌𝐄𝐍𝐓 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!
━━━━━━━━━━━━━━━━━━━
💰 𝐏𝐚𝐢𝐝: ${this.formatMoney(amount)} 𝐁𝐃𝐓
💳 𝐑𝐞𝐦𝐚𝐢𝐧𝐢𝐧𝐠: ${this.formatMoney(bank.loan.amount)} 𝐁𝐃𝐓
📊 𝐍𝐞𝐰 𝐁𝐚𝐥: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓`
            );
        }

        // Fixed Deposit
        if (action === "fd") {
            const subAction = args[1]?.toLowerCase();
            
            if (subAction === "create") {
                const amount = parseFloat(args[2]);
                
                if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐕𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝.");
                
                if (amount > bank.balance) {
                    return message.reply(`❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞. 𝐍𝐞𝐞𝐝: ${this.formatMoney(amount)} 𝐁𝐃𝐓`);
                }
                
                const maturityDate = new Date();
                maturityDate.setMonth(maturityDate.getMonth() + 3); // 3 months FD
                
                const fd = {
                    amount: amount,
                    createdAt: Date.now(),
                    maturityDate: maturityDate.getTime(),
                    interestRate: 0.05, // 5% interest
                    interest: this.calculateInterest(amount, 90),
                    withdrawn: false
                };
                
                if (!bank.fixedDeposits) bank.fixedDeposits = [];
                bank.fixedDeposits.push(fd);
                bank.balance -= amount;
                
                bank.transactions.push({
                    type: "sent",
                    amount: amount,
                    to: "𝐅𝐢𝐱𝐞𝐝 𝐃𝐞𝐩𝐨𝐬𝐢𝐭",
                    time: Date.now(),
                    method: "𝐅𝐃 𝐂𝐫𝐞𝐚𝐭𝐢𝐨𝐧",
                    balance: bank.balance
                });
                
                await usersData.set(uid, { data: data.data });
                
                return message.reply(
`✅ 𝐅𝐈𝐗𝐄𝐃 𝐃𝐄𝐏𝐎𝐒𝐈𝐓 𝐂𝐑𝐄𝐀𝐓𝐄𝐃!
━━━━━━━━━━━━━━━━━━━
💰 𝐀𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(amount)} 𝐁𝐃𝐓
📈 𝐈𝐧𝐭𝐞𝐫𝐞𝐬𝐭: ${this.formatMoney(fd.interest)} 𝐁𝐃𝐓 (𝟓%)
📅 𝐌𝐚𝐭𝐮𝐫𝐢𝐭𝐲: ${new Date(maturityDate).toLocaleDateString()}
💰 𝐌𝐚𝐭𝐮𝐫𝐢𝐭𝐲 𝐕𝐚𝐥𝐮𝐞: ${this.formatMoney(amount + fd.interest)} 𝐁𝐃𝐓

𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐟𝐝 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰\` 𝐚𝐟𝐭𝐞𝐫 𝐦𝐚𝐭𝐮𝐫𝐢𝐭𝐲`
                );
            }
            
            if (subAction === "withdraw") {
                if (!bank.fixedDeposits || bank.fixedDeposits.length === 0) {
                    return message.reply("❌ 𝐘𝐨𝐮 𝐡𝐚𝐯𝐞 𝐧𝐨 𝐅𝐃.");
                }
                
                let totalWithdrawn = 0;
                const now = Date.now();
                
                bank.fixedDeposits = bank.fixedDeposits.filter(fd => {
                    if (fd.withdrawn) return false;
                    
                    if (now >= fd.maturityDate) {
                        const maturityValue = fd.amount + fd.interest;
                        bank.balance += maturityValue;
                        totalWithdrawn += maturityValue;
                        
                        bank.transactions.push({
                            type: "received",
                            amount: maturityValue,
                            from: "𝐅𝐃 𝐌𝐚𝐭𝐮𝐫𝐢𝐭𝐲",
                            time: Date.now(),
                            method: "𝐅𝐃 𝐖𝐢𝐭𝐡𝐝𝐫𝐚𝐰𝐚𝐥",
                            balance: bank.balance
                        });
                        
                        return false; // Remove from list
                    }
                    return true; // Keep in list
                });
                
                if (totalWithdrawn === 0) {
                    return message.reply("❌ 𝐍𝐨 𝐅𝐃 𝐡𝐚𝐬 𝐦𝐚𝐭𝐮𝐫𝐞𝐝 𝐲𝐞𝐭.");
                }
                
                await usersData.set(uid, { data: data.data });
                
                return message.reply(
`✅ 𝐅𝐃 𝐖𝐈𝐓𝐇𝐃𝐑𝐀𝐖𝐀𝐋 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!
━━━━━━━━━━━━━━━━━━━
💰 𝐓𝐨𝐭𝐚𝐥 𝐑𝐞𝐜𝐞𝐢𝐯𝐞𝐝: ${this.formatMoney(totalWithdrawn)} 𝐁𝐃𝐓
💳 𝐍𝐞𝐰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓`
                );
            }
            
            // Show FD summary
            let fdText = "🏦 𝐅𝐈𝐗𝐄𝐃 𝐃𝐄𝐏𝐎𝐒𝐈𝐓𝐒\n━━━━━━━━━━━━━━━━━━━\n";
            
            if (!bank.fixedDeposits || bank.fixedDeposits.length === 0) {
                fdText += "𝐍𝐨 𝐚𝐜𝐭𝐢𝐯𝐞 𝐅𝐃.\n";
            } else {
                bank.fixedDeposits.forEach((fd, i) => {
                    const maturityDate = new Date(fd.maturityDate);
                    const status = fd.maturityDate > Date.now() ? "⏳ 𝐀𝐜𝐭𝐢𝐯𝐞" : "✅ 𝐌𝐚𝐭𝐮𝐫𝐞𝐝";
                    fdText += `${i+1}. ${status}\n`;
                    fdText += `   💰 ${this.formatMoney(fd.amount)} 𝐁𝐃𝐓\n`;
                    fdText += `   📈 +${this.formatMoney(fd.interest)} 𝐁𝐃𝐓\n`;
                    fdText += `   📅 ${maturityDate.toLocaleDateString()}\n\n`;
                });
            }
            
            fdText += "━━━━━━━━━━━━━━━━━━━\n";
            fdText += "𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐟𝐝 𝐜𝐫𝐞𝐚𝐭𝐞 <𝐚𝐦𝐨𝐮𝐧𝐭>\`\n";
            fdText += "𝐔𝐬𝐞: \`𝐛𝐚𝐧𝐤 𝐟𝐝 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰\`";
            
            return message.reply(fdText);
        }

        // Interest Collection
        if (action === "interest") {
            const now = Date.now();
            const lastClaim = bank.lastInterestClaim || bank.createdAt ? new Date(bank.createdAt).getTime() : now;
            
            if (lastClaim && (now - lastClaim) < 24 * 60 * 60 * 1000) {
                const timeLeft = 24 * 60 * 60 * 1000 - (now - lastClaim);
                const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000));
                return message.reply(`⏳ 𝐈𝐧𝐭𝐞𝐫𝐞𝐬𝐭 𝐚𝐯𝐚𝐢𝐥𝐚𝐛𝐥𝐞 𝐢𝐧 ${hoursLeft} 𝐡𝐨𝐮𝐫𝐬.`);
            }
            
            const savingsInterest = bank.savings * 0.02; // 2% on savings
            const balanceInterest = bank.balance * 0.01; // 1% on balance
            
            const totalInterest = savingsInterest + balanceInterest;
            
            if (totalInterest < 1) {
                return message.reply("❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 𝐟𝐨𝐫 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭.");
            }
            
            bank.balance += totalInterest;
            bank.lastInterestClaim = now;
            
            bank.transactions.push({
                type: "received",
                amount: totalInterest,
                from: "𝐈𝐧𝐭𝐞𝐫𝐞𝐬𝐭 𝐏𝐚𝐲𝐦𝐞𝐧𝐭",
                time: now,
                method: "𝐃𝐚𝐢𝐥𝐲 𝐈𝐧𝐭𝐞𝐫𝐞𝐬𝐭",
                balance: bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`✅ 𝐈𝐍𝐓𝐄𝐑𝐄𝐒𝐓 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐄𝐃!
━━━━━━━━━━━━━━━━━━━
💰 𝐒𝐚𝐯𝐢𝐧𝐠𝐬 𝐈𝐧𝐭: ${this.formatMoney(savingsInterest)} 𝐁𝐃𝐓
💰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞 𝐈𝐧𝐭: ${this.formatMoney(balanceInterest)} 𝐁𝐃𝐓
💳 𝐓𝐨𝐭𝐚𝐥: ${this.formatMoney(totalInterest)} 𝐁𝐃𝐓
📊 𝐍𝐞𝐰 𝐁𝐚𝐥: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓

𝐍𝐞𝐱𝐭 𝐢𝐧 𝟐𝟒 𝐡𝐨𝐮𝐫𝐬`
            );
        }

        // Transfer by Account Number
        if (action === "transfer") {
            const targetAccount = args[1];
            const amount = parseFloat(args[2]);
            
            if (!targetAccount) return message.reply("❌ 𝐏𝐫𝐨𝐯𝐢𝐝𝐞 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 𝐧𝐮𝐦𝐛𝐞𝐫.");
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐕𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝.");
            if (amount > bank.balance) return message.reply("❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞.");
            if (amount > bank.dailyLimit - bank.usedToday) {
                return message.reply(`❌ 𝐃𝐚𝐢𝐥𝐲 𝐥𝐢𝐦𝐢𝐭 𝐞𝐱𝐜𝐞𝐞𝐝𝐞𝐝. 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓`);
            }
            
            let targetUser = null;
            let targetUserId = null;
            const allUsers = await usersData.getAll();
            
            for (const [userId, userData] of Object.entries(allUsers)) {
                if (userData.data?.bank?.accountNumber === targetAccount) {
                    targetUser = userData;
                    targetUserId = userId;
                    break;
                }
            }
            
            if (!targetUser) {
                return message.reply("❌ 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐧𝐮𝐦𝐛𝐞𝐫 𝐧𝐨𝐭 𝐟𝐨𝐮𝐧𝐝.");
            }
            
            if (targetUserId === uid) {
                return message.reply("❌ 𝐂𝐚𝐧𝐧𝐨𝐭 𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐨𝐰𝐧 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.");
            }
            
            // Process transfer
            bank.balance -= amount;
            bank.usedToday += amount;
            
            targetUser.data.bank.balance += amount;
            
            bank.transactions.push({
                type: "sent",
                amount: amount,
                to: targetUser.name || "𝐔𝐬𝐞𝐫",
                time: Date.now(),
                method: "𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐓𝐫𝐚𝐧𝐬𝐟𝐞𝐫",
                account: targetAccount,
                balance: bank.balance
            });
            
            targetUser.data.bank.transactions.push({
                type: "received",
                amount: amount,
                from: data.name || "𝐔𝐬𝐞𝐫",
                time: Date.now(),
                method: "𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐓𝐫𝐚𝐧𝐬𝐟𝐞𝐫",
                account: bank.accountNumber,
                balance: targetUser.data.bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            await usersData.set(targetUserId, { data: targetUser.data });
            
            return message.reply(
`✅ 𝐓𝐑𝐀𝐍𝐒𝐅𝐄𝐑 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!
━━━━━━━━━━━━━━━━━━━
💰 𝐀𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(amount)} 𝐁𝐃𝐓
📋 𝐓𝐨: ${targetUser.name || "𝐔𝐬𝐞𝐫"}
📈 𝐀𝐜𝐜𝐨𝐮𝐧𝐭: ${targetAccount}
💳 𝐘𝐨𝐮𝐫 𝐁𝐚𝐥: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
📊 𝐃𝐚𝐢𝐥𝐲 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓`
            );
        }

        // Mini Statement
        if (action === "ministatement") {
            let statementText = "📋 𝐌𝐈𝐍𝐈 𝐒𝐓𝐀𝐓𝐄𝐌𝐄𝐍𝐓\n━━━━━━━━━━━━━━━━━━━\n";
            
            if (!bank.transactions.length) {
                statementText += "𝐍𝐨 𝐭𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧𝐬 𝐲𝐞𝐭.\n";
            } else {
                const last5 = bank.transactions.slice(-5).reverse();
                last5.forEach((tx, i) => {
                    const date = new Date(tx.time).toLocaleString();
                    const symbol = tx.type === "received" ? "📥" : "📤";
                    statementText += `${symbol} ${this.formatMoney(tx.amount)} 𝐁𝐃𝐓\n`;
                    statementText += `   ${tx.type === "received" ? "𝐅𝐫𝐨𝐦" : "𝐓𝐨"}: ${tx.from || tx.to}\n`;
                    statementText += `   ${date}\n\n`;
                });
            }
            
            statementText += `💳 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓`;
            
            return message.reply(statementText);
        }

        // Leaderboard
        if (action === "leaderboard") {
            const allUsers = await usersData.getAll();
            const richList = [];
            
            for (const [userId, userData] of Object.entries(allUsers)) {
                if (userData.data?.bank?.registered && userData.data.bank.balance > 0) {
                    richList.push({
                        name: userData.name || "𝐔𝐬𝐞𝐫",
                        balance: userData.data.bank.balance,
                        type: userData.data.bank.accountType || "𝐒𝐭𝐚𝐧𝐝𝐚𝐫𝐝",
                        id: userId
                    });
                }
            }
            
            richList.sort((a, b) => b.balance - a.balance);
            
            let lbText = "👑 𝐖𝐄𝐀𝐋𝐓𝐇 𝐋𝐄𝐀𝐃𝐄𝐑𝐁𝐎𝐀𝐑𝐃\n━━━━━━━━━━━━━━━━━━━\n";
            
            if (richList.length === 0) {
                lbText += "𝐍𝐨 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫𝐞𝐝 𝐮𝐬𝐞𝐫𝐬 𝐲𝐞𝐭.\n";
            } else {
                richList.slice(0, 10).forEach((user, index) => {
                    const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `${index+1}.`;
                    lbText += `${medal} ${user.name}\n`;
                    lbText += `   💰 ${this.formatMoney(user.balance)} 𝐁𝐃𝐓\n`;
                    lbText += `   🏦 ${user.type}\n\n`;
                });
            }
            
            return message.reply(lbText);
        }

        // Account Details
        if (action === "account") {
            const activeCodes = bank.atmCodes?.filter(c => !c.used && c.expiresAt > Date.now()).length || 0;
            const activeFD = bank.fixedDeposits?.filter(fd => !fd.withdrawn).length || 0;
            
            let loanInfo = "𝐍𝐨 𝐚𝐜𝐭𝐢𝐯𝐞 𝐥𝐨𝐚𝐧";
            if (bank.loan && bank.loan.amount > 0) {
                loanInfo = `${this.formatMoney(bank.loan.amount)} 𝐁𝐃𝐓 (𝐃𝐮𝐞: ${new Date(bank.loan.dueDate).toLocaleDateString()})`;
            }
            
            return message.reply(
`💳 𝐀𝐂𝐂𝐎𝐔𝐍𝐓 𝐃𝐄𝐓𝐀𝐈𝐋𝐒
━━━━━━━━━━━━━━━━━━━
🏦 𝐁𝐚𝐧𝐤: 𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐁𝐚𝐧𝐤
👤 𝐇𝐨𝐥𝐝𝐞𝐫: ${data.name || "𝐔𝐬𝐞𝐫"}
📈 𝐀𝐜𝐜𝐨𝐮𝐧𝐭: ${bank.accountNumber}
🏷️ 𝐓𝐲𝐩𝐞: ${bank.accountType}
💴 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
💎 𝐒𝐚𝐯𝐢𝐧𝐠𝐬: ${this.formatMoney(bank.savings || 0)} 𝐁𝐃𝐓
📊 𝐂𝐫𝐞𝐝𝐢𝐭 𝐒𝐜𝐨𝐫𝐞: ${bank.creditScore}
🏧 𝐀𝐓𝐌 𝐂𝐨𝐝𝐞𝐬: ${activeCodes} 𝐚𝐜𝐭𝐢𝐯𝐞
🏦 𝐅𝐃 𝐂𝐨𝐮𝐧𝐭: ${activeFD}
💰 𝐋𝐨𝐚𝐧: ${loanInfo}
📅 𝐉𝐨𝐢𝐧𝐞𝐝: ${bank.createdAt ? new Date(bank.createdAt).toLocaleDateString() : "𝐍/𝐀"}
━━━━━━━━━━━━━━━━━━━`
            );
        }

        // Deposit Command
        if (action === "deposit") {
            const amount = parseFloat(args[1]);
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐄𝐧𝐭𝐞𝐫 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭.");
            
            bank.balance += amount;
            bank.transactions.push({
                type: "received",
                amount,
                from: "𝐃𝐞𝐩𝐨𝐬𝐢𝐭",
                time: Date.now(),
                balance: bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`✅ 𝐃𝐄𝐏𝐎𝐒𝐈𝐓 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!
━━━━━━━━━━━━━━━━━━━
💰 +${this.formatMoney(amount)} 𝐁𝐃𝐓
💳 𝐍𝐞𝐰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓`
            );
        }

        // Withdraw Command
        if (action === "withdraw") {
            const amount = parseFloat(args[1]);
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐄𝐧𝐭𝐞𝐫 𝐚 𝐯𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭.");
            if (amount > bank.balance) return message.reply("❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞.");
            if (amount > bank.dailyLimit - bank.usedToday) {
                return message.reply(`❌ 𝐃𝐚𝐢𝐥𝐲 𝐥𝐢𝐦𝐢𝐭 𝐞𝐱𝐜𝐞𝐞𝐝𝐞𝐝. 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓`);
            }
            
            bank.balance -= amount;
            bank.usedToday += amount;
            
            bank.transactions.push({
                type: "sent",
                amount,
                to: "𝐖𝐢𝐭𝐡𝐝𝐫𝐚𝐰𝐚𝐥",
                time: Date.now(),
                balance: bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            
            return message.reply(
`✅ 𝐖𝐈𝐓𝐇𝐃𝐑𝐀𝐖𝐀𝐋 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!
━━━━━━━━━━━━━━━━━━━
💰 -${this.formatMoney(amount)} 𝐁𝐃𝐓
💳 𝐍𝐞𝐰 𝐁𝐚𝐥𝐚𝐧𝐜𝐞: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
📊 𝐃𝐚𝐢𝐥𝐲 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓`
            );
        }

        // Send Command
        if (action === "send") {
            if (!args[1] || !args[2]) {
                return message.reply("❌ 𝐔𝐬𝐚𝐠𝐞: 𝐛𝐚𝐧𝐤 𝐬𝐞𝐧𝐝 <@𝐮𝐬𝐞𝐫> <𝐚𝐦𝐨𝐮𝐧𝐭>");
            }
            
            let targetId;
            if (args[1].startsWith("@")) {
                const mentions = Object.keys(event.mentions || {});
                if (mentions.length === 0) return message.reply("❌ 𝐏𝐥𝐞𝐚𝐬𝐞 𝐦𝐞𝐧𝐭𝐢𝐨𝐧 𝐚 𝐮𝐬𝐞𝐫.");
                targetId = mentions[0];
            } else {
                targetId = args[1];
            }
            
            const amount = parseFloat(args[2]);
            
            if (isNaN(amount) || amount <= 0) return message.reply("❌ 𝐕𝐚𝐥𝐢𝐝 𝐚𝐦𝐨𝐮𝐧𝐭 𝐫𝐞𝐪𝐮𝐢𝐫𝐞𝐝.");
            if (amount > bank.balance) return message.reply("❌ 𝐈𝐧𝐬𝐮𝐟𝐟𝐢𝐜𝐢𝐞𝐧𝐭 𝐛𝐚𝐥𝐚𝐧𝐜𝐞.");
            if (amount > bank.dailyLimit - bank.usedToday) {
                return message.reply(`❌ 𝐃𝐚𝐢𝐥𝐲 𝐥𝐢𝐦𝐢𝐭 𝐞𝐱𝐜𝐞𝐞𝐝𝐞𝐝. 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓`);
            }
            
            let targetData = await usersData.get(targetId);
            if (!targetData.data) targetData.data = {};
            if (!targetData.data.bank) {
                targetData.data.bank = {
                    balance: 0,
                    registered: false,
                    card: null,
                    transactions: [],
                    accountNumber: this.generateAccountNumber(),
                    atmCodes: []
                };
            }
            
            if (!targetData.data.bank.registered) {
                return message.reply("❌ 𝐑𝐞𝐜𝐢𝐩𝐢𝐞𝐧𝐭 𝐝𝐨𝐞𝐬 𝐧𝐨𝐭 𝐡𝐚𝐯𝐞 𝐚 𝐛𝐚𝐧𝐤 𝐚𝐜𝐜𝐨𝐮𝐧𝐭.");
            }
            
            // Process send
            bank.balance -= amount;
            bank.usedToday += amount;
            targetData.data.bank.balance += amount;
            
            bank.transactions.push({
                type: "sent",
                amount,
                to: targetData.name || "𝐔𝐬𝐞𝐫",
                time: Date.now(),
                method: "𝐃𝐢𝐫𝐞𝐜𝐭 𝐒𝐞𝐧𝐝",
                balance: bank.balance
            });
            
            targetData.data.bank.transactions.push({
                type: "received",
                amount,
                from: data.name || "𝐔𝐬𝐞𝐫",
                time: Date.now(),
                method: "𝐃𝐢𝐫𝐞𝐜𝐭 𝐒𝐞𝐧𝐝",
                balance: targetData.data.bank.balance
            });
            
            await usersData.set(uid, { data: data.data });
            await usersData.set(targetId, { data: targetData.data });
            
            return message.reply(
`✅ 𝐓𝐑𝐀𝐍𝐒𝐅𝐄𝐑 𝐒𝐔𝐂𝐂𝐄𝐒𝐒!
━━━━━━━━━━━━━━━━━━━
💰 𝐀𝐦𝐨𝐮𝐧𝐭: ${this.formatMoney(amount)} 𝐁𝐃𝐓
👤 𝐓𝐨: ${targetData.name || "𝐔𝐬𝐞𝐫"}
💳 𝐘𝐨𝐮𝐫 𝐁𝐚𝐥: ${this.formatMoney(bank.balance)} 𝐁𝐃𝐓
📊 𝐃𝐚𝐢𝐥𝐲 𝐋𝐞𝐟𝐭: ${this.formatMoney(bank.dailyLimit - bank.usedToday)} 𝐁𝐃𝐓`
            );
        }

        // History Command
        if (action === "history") {
            let historyText = "📝 𝐓𝐑𝐀𝐍𝐒𝐀𝐂𝐓𝐈𝐎𝐍 𝐇𝐈𝐒𝐓𝐎𝐑𝐘\n━━━━━━━━━━━━━━━━━━━\n";
            
            if (!bank.transactions.length) {
                historyText += "𝐍𝐨 𝐭𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧𝐬 𝐲𝐞𝐭.\n";
            } else {
                bank.transactions.slice(-15).reverse().forEach((tx, i) => {
                    const date = tx.time ? new Date(tx.time).toLocaleString() : "𝐈𝐧𝐯𝐚𝐥𝐢𝐝 𝐃𝐚𝐭𝐞";
                    const method = tx.method ? ` [${tx.method}]` : '';
                    
                    if (tx.type === "received") {
                        historyText += `${i + 1}. 📥 𝐑𝐄𝐂𝐄𝐈𝐕𝐄𝐃${method}\n`;
                        historyText += `   +${this.formatMoney(tx.amount)} 𝐁𝐃𝐓\n`;
                        historyText += `   𝐅𝐫𝐨𝐦: ${tx.from || "𝐔𝐧𝐤𝐧𝐨𝐰𝐧"}\n`;
                        historyText += `   📅 ${date}\n\n`;
                    } else {
                        historyText += `${i + 1}. 📤 𝐒𝐄𝐍𝐓${method}\n`;
                        historyText += `   -${this.formatMoney(tx.amount)} 𝐁𝐃𝐓\n`;
                        historyText += `   𝐓𝐨: ${tx.to || "𝐔𝐧𝐤𝐧𝐨𝐰𝐧"}\n`;
                        historyText += `   📅 ${date}\n\n`;
                    }
                });
            }
            
            // Active ATM Codes
            if (bank.atmCodes && bank.atmCodes.length > 0) {
                const activeCodes = bank.atmCodes.filter(c => !c.used && c.expiresAt > Date.now());
                if (activeCodes.length > 0) {
                    historyText += "\n🏧 𝐀𝐂𝐓𝐈𝐕𝐄 𝐀𝐓𝐌 𝐂𝐎𝐃𝐄𝐒\n";
                    activeCodes.forEach((c, i) => {
                        const expires = new Date(c.expiresAt).toLocaleString();
                        historyText += `${i+1}. 𝐂𝐨𝐝𝐞: ${c.code}\n`;
                        historyText += `   ⏰ 𝐄𝐱𝐩: ${expires}\n`;
                    });
                }
            }
            
            return message.reply(historyText);
        }

        // Default Menu
        return message.reply(
`🏦 𝐔𝐋𝐓𝐈𝐌𝐀𝐓𝐄 𝐁𝐀𝐍𝐊 𝐌𝐄𝐍𝐔
━━━━━━━━━━━━━━━━━━━
💳 𝐀𝐂𝐂𝐎𝐔𝐍𝐓:
• 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 - 𝐎𝐩𝐞𝐧 𝐚𝐜𝐜𝐨𝐮𝐧𝐭
• 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 - 𝐂𝐡𝐞𝐜𝐤 𝐛𝐚𝐥𝐚𝐧𝐜𝐞
• 𝐚𝐜𝐜𝐨𝐮𝐧𝐭 - 𝐀𝐜𝐜𝐨𝐮𝐧𝐭 𝐝𝐞𝐭𝐚𝐢𝐥𝐬

💸 𝐓𝐑𝐀𝐍𝐒𝐀𝐂𝐓𝐈𝐎𝐍𝐒:
• 𝐝𝐞𝐩𝐨𝐬𝐢𝐭 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐝𝐝 𝐦𝐨𝐧𝐞𝐲
• 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐓𝐚𝐤𝐞 𝐦𝐨𝐧𝐞𝐲
• 𝐬𝐞𝐧𝐝 <@𝐮𝐬𝐞𝐫> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐒𝐞𝐧𝐝 𝐦𝐨𝐧𝐞𝐲
• 𝐭𝐫𝐚𝐧𝐬𝐟𝐞𝐫 <𝐚𝐜𝐜#> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐁𝐲 𝐚𝐜𝐜𝐨𝐮𝐧𝐭

🏧 𝐀𝐓𝐌 𝐒𝐄𝐑𝐕𝐈𝐂𝐄𝐒:
• 𝐜𝐚𝐫𝐝 - 𝐕𝐢𝐞𝐰 𝐀𝐓𝐌 𝐜𝐚𝐫𝐝
• 𝐚𝐭𝐦𝐜𝐨𝐝𝐞 - 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐀𝐓𝐌 𝐜𝐨𝐝𝐞
• 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐜𝐨𝐝𝐞> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐔𝐬𝐞 𝐀𝐓𝐌

💰 𝐈𝐍𝐕𝐄𝐒𝐓𝐌𝐄𝐍𝐓𝐒:
• 𝐟𝐝 - 𝐅𝐢𝐱𝐞𝐝 𝐃𝐞𝐩𝐨𝐬𝐢𝐭 𝐦𝐞𝐧𝐮
• 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭 - 𝐂𝐨𝐥𝐥𝐞𝐜𝐭 𝐢𝐧𝐭𝐞𝐫𝐞𝐬𝐭

🏦 𝐋𝐎𝐀𝐍𝐒:
• 𝐥𝐨𝐚𝐧 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐩𝐩𝐥𝐲 𝐟𝐨𝐫 𝐥𝐨𝐚𝐧
• 𝐫𝐞𝐩𝐚𝐲 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐑𝐞𝐩𝐚𝐲 𝐥𝐨𝐚𝐧

📊 𝐎𝐓𝐇𝐄𝐑𝐒:
• 𝐡𝐢𝐬𝐭𝐨𝐫𝐲 - 𝐅𝐮𝐥𝐥 𝐡𝐢𝐬𝐭𝐨𝐫𝐲
• 𝐦𝐢𝐧𝐢𝐬𝐭𝐚𝐭𝐞𝐦𝐞𝐧𝐭 - 𝐋𝐚𝐬𝐭 𝟓 𝐭𝐫𝐚𝐧𝐬
• 𝐥𝐞𝐚𝐝𝐞𝐫𝐛𝐨𝐚𝐫𝐝 - 𝐓𝐨𝐩 𝟏𝟎 𝐫𝐢𝐜𝐡

━━━━━━━━━━━━━━━━━━━
💡 𝐄𝐱𝐚𝐦𝐩𝐥𝐞:
𝐛𝐚𝐧𝐤 𝐚𝐭𝐦𝐜𝐨𝐝𝐞
𝐛𝐚𝐧𝐤 𝐟𝐝 𝐜𝐫𝐞𝐚𝐭𝐞 𝟏𝟎𝟎𝟎𝟎`
        );
    }
};
