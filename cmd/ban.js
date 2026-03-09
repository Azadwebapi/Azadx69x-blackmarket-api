const fs = require("fs");
const path = require("path");
const { createCanvas } = require("canvas");

module.exports = {
    config: {
        name: "bank",
        version: "4.0-atm-canvas",
        author: "Azadx69x",
        role: 0,
        shortDescription: "𝐀𝐓𝐌 𝐒𝐭𝐲𝐥𝐞 𝐁𝐚𝐧𝐤𝐢𝐧𝐠",
        longDescription: "𝐂𝐨𝐦𝐩𝐥𝐞𝐭𝐞 𝐀𝐓𝐌-𝐬𝐭𝐲𝐥𝐞 𝐛𝐚𝐧𝐤𝐢𝐧𝐠 𝐰𝐢𝐭𝐡 𝐜𝐚𝐧𝐯𝐚𝐬 𝐢𝐧𝐭𝐞𝐫𝐟𝐚𝐜𝐞",
        category: "finance",
        guide: `{𝐩𝐧} - 𝐀𝐓𝐌 𝐌𝐚𝐢𝐧 𝐌𝐞𝐧𝐮
{𝐩𝐧} 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫 - 𝐎𝐩𝐞𝐧 𝐀𝐓𝐌 𝐚𝐜𝐜𝐨𝐮𝐧𝐭
{𝐩𝐧} 𝐛𝐚𝐥𝐚𝐧𝐜𝐞 - 𝐂𝐡𝐞𝐜𝐤 𝐛𝐚𝐥𝐚𝐧𝐜𝐞
{𝐩𝐧} 𝐝𝐞𝐩𝐨𝐬𝐢𝐭 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐝𝐝 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐓𝐚𝐤𝐞 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐬𝐞𝐧𝐝 <@𝐮𝐬𝐞𝐫> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐒𝐞𝐧𝐝 𝐦𝐨𝐧𝐞𝐲
{𝐩𝐧} 𝐜𝐚𝐫𝐝 - 𝐀𝐓𝐌 𝐂𝐚𝐫𝐝 𝐕𝐢𝐞𝐰
{𝐩𝐧} 𝐚𝐭𝐦𝐜𝐨𝐝𝐞 - 𝐆𝐞𝐧𝐞𝐫𝐚𝐭𝐞 𝐀𝐓𝐌 𝐂𝐨𝐝𝐞
{𝐩𝐧} 𝐚𝐭𝐦𝐰𝐢𝐭𝐡𝐝𝐫𝐚𝐰 <𝐜𝐨𝐝𝐞> <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐔𝐬𝐞 𝐀𝐓𝐌 𝐂𝐨𝐝𝐞
{𝐩𝐧} 𝐡𝐢𝐬𝐭𝐨𝐫𝐲 - 𝐓𝐫𝐚𝐧𝐬𝐚𝐜𝐭𝐢𝐨𝐧 𝐇𝐢𝐬𝐭𝐨𝐫𝐲
{𝐩𝐧} 𝐥𝐨𝐚𝐧 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐀𝐩𝐩𝐥𝐲 𝐋𝐨𝐚𝐧
{𝐩𝐧} 𝐫𝐞𝐩𝐚𝐲 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐑𝐞𝐩𝐚𝐲 𝐋𝐨𝐚𝐧
{𝐩𝐧} 𝐟𝐝 <𝐚𝐦𝐨𝐮𝐧𝐭> - 𝐅𝐢𝐱𝐞𝐝 𝐃𝐞𝐩𝐨𝐬𝐢𝐭`
    },

    // Helper Functions
    formatMoney(amount) {
        if (isNaN(amount)) return "0";
        amount = Number(amount);
        const scales = [
            { value: 1e15, suffix: 'Q' },
            { value: 1e12, suffix: 'T' },
            { value: 1e9, suffix: 'B' },
            { value: 1e6, suffix: 'M' },
            { value: 1e3, suffix: 'K' }
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
        return "5284 " +
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
        return `GB${Math.floor(10000000 + Math.random() * 90000000)}${Math.floor(1000 + Math.random() * 9000)}`;
    },

    getExpiry() {
        const now = new Date();
        return `${now.getMonth() + 1}/${(now.getFullYear() + 4).toString().slice(-2)}`;
    },

    nowISO() {
        return new Date().toISOString();
    },

    calculateLoanInterest(amount, days) {
        const rate = 0.12;
        return Math.floor(amount * rate * (days / 365));
    },

    calculateFDInterest(amount, days) {
        const rate = 0.05;
        return Math.floor(amount * rate * (days / 365));
    },

    // Canvas ATM Interface
    async createATMScreen(title, content, userData = null, options = {}) {
        const width = 800, height = 1000;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // ATM Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#1a237e");
        gradient.addColorStop(0.5, "#0d47a1");
        gradient.addColorStop(1, "#01579b");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // ATM Border
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 10;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        // ATM Header
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 48px 'Courier New'";
        ctx.textAlign = "center";
        ctx.fillText("🏧 ATM BANKING 🏧", width/2, 100);

        // Screen Display
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(60, 150, width - 120, 200);
        
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.strokeRect(60, 150, width - 120, 200);

        // Screen Content
        ctx.fillStyle = "#000";
        ctx.font = "bold 32px 'Arial'";
        ctx.fillText(title, width/2, 220);

        ctx.font = "28px 'Arial'";
        ctx.fillStyle = "#333";
        ctx.fillText(content, width/2, 280);

        // User Info Panel
        if (userData) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(60, 380, width - 120, 100);
            ctx.strokeStyle = "#ffd700";
            ctx.lineWidth = 2;
            ctx.strokeRect(60, 380, width - 120, 100);

            ctx.fillStyle = "#000";
            ctx.font = "24px 'Arial'";
            ctx.fillText(`👤 ${userData.name || 'User'}`, 100, 430);
            ctx.fillText(`💰 Balance: ${this.formatMoney(userData.balance)} BDT`, 100, 470);
        }

        // Keypad Area
        ctx.fillStyle = "#333";
        ctx.fillRect(100, 520, 200, 400);
        
        // Keypad Buttons
        const keys = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['*', '0', '#']
        ];

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                const x = 120 + (j * 70);
                const y = 540 + (i * 80);
                
                ctx.fillStyle = "#555";
                ctx.beginPath();
                ctx.arc(x + 25, y + 25, 25, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = "#fff";
                ctx.font = "bold 28px 'Arial'";
                ctx.textAlign = "center";
                ctx.fillText(keys[i][j], x + 25, y + 35);
            }
        }

        // Function Buttons
        const functions = options.buttons || ['CANCEL', 'CLEAR', 'ENTER'];
        for (let i = 0; i < functions.length; i++) {
            const y = 540 + (i * 80);
            
            ctx.fillStyle = "#ffd700";
            ctx.fillRect(500, y, 200, 50);
            
            ctx.fillStyle = "#000";
            ctx.font = "bold 20px 'Arial'";
            ctx.fillText(functions[i], 600, y + 35);
        }

        // Footer
        ctx.fillStyle = "#fff";
        ctx.font = "18px 'Arial'";
        ctx.fillText("Thank you for using ATM Service", width/2, 950);
        ctx.fillText(new Date().toLocaleString(), width/2, 980);

        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `atm_${Date.now()}.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async createBalanceCard(userData) {
        const width = 800, height = 600;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#2c3e50");
        gradient.addColorStop(1, "#3498db");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Balance Card Design
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        ctx.fillRect(50, 50, width - 100, height - 100);

        // Header
        ctx.fillStyle = "#fff";
        ctx.font = "bold 40px 'Arial'";
        ctx.textAlign = "center";
        ctx.fillText("💰 ACCOUNT BALANCE 💰", width/2, 150);

        // Balance Display
        ctx.font = "bold 60px 'Courier New'";
        ctx.fillStyle = "#ffd700";
        ctx.fillText(`${this.formatMoney(userData.balance)} BDT`, width/2, 280);

        // Account Details
        ctx.font = "24px 'Arial'";
        ctx.fillStyle = "#fff";
        ctx.fillText(`Account: ${userData.accountNumber}`, width/2, 380);
        ctx.fillText(`Type: ${userData.accountType || 'Standard'}`, width/2, 430);
        ctx.fillText(`Credit Score: ${userData.creditScore || '700'}`, width/2, 480);

        // Footer
        ctx.font = "20px 'Arial'";
        ctx.fillStyle = "#ecf0f1";
        ctx.fillText(new Date().toLocaleString(), width/2, 550);

        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `balance_${Date.now()}.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async createTransactionHistory(transactions, userData) {
        const width = 800, height = 1000;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // Background
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(0, 0, width, height);

        // Receipt Paper Effect
        ctx.fillStyle = "#ecf0f1";
        ctx.fillRect(40, 40, width - 80, height - 80);

        // Header
        ctx.fillStyle = "#000";
        ctx.font = "bold 36px 'Courier New'";
        ctx.textAlign = "center";
        ctx.fillText("📋 ATM TRANSACTION SLIP 📋", width/2, 100);

        // Account Info
        ctx.font = "24px 'Courier New'";
        ctx.fillText(`Account: ${userData.accountNumber}`, width/2, 160);
        ctx.fillText(`Balance: ${this.formatMoney(userData.balance)} BDT`, width/2, 210);

        // Transactions
        ctx.font = "20px 'Courier New'";
        let y = 280;
        
        if (!transactions || transactions.length === 0) {
            ctx.fillText("No transactions yet", width/2, y);
        } else {
            transactions.slice(-8).reverse().forEach((tx, i) => {
                const date = new Date(tx.time).toLocaleString();
                const symbol = tx.type === 'received' ? '📥' : '📤';
                const amount = tx.type === 'received' ? `+${tx.amount}` : `-${tx.amount}`;
                
                ctx.fillText(`${symbol} ${this.formatMoney(amount)} BDT`, width/2, y);
                ctx.font = "16px 'Courier New'";
                ctx.fillText(`${date}`, width/2, y + 30);
                ctx.fillText(`${tx.type === 'received' ? 'From' : 'To'}: ${tx.from || tx.to}`, width/2, y + 60);
                ctx.font = "20px 'Courier New'";
                y += 100;
            });
        }

        // Footer
        ctx.font = "18px 'Courier New'";
        ctx.fillText("══════════════════════════", width/2, 900);
        ctx.fillText("Thank you for banking with us", width/2, 950);

        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `history_${Date.now()}.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async createATMCodeCard(code, userData) {
        const width = 600, height = 400;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // ATM Receipt Style
        ctx.fillStyle = "#fff8e7";
        ctx.fillRect(0, 0, width, height);

        // Border
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, width - 20, height - 20);

        // Header
        ctx.fillStyle = "#000";
        ctx.font = "bold 30px 'Courier New'";
        ctx.textAlign = "center";
        ctx.fillText("🏧 ATM CODE SLIP 🏧", width/2, 60);

        // Code Display
        ctx.font = "bold 48px 'Courier New'";
        ctx.fillStyle = "#d32f2f";
        ctx.fillText(code, width/2, 160);

        // Details
        ctx.font = "20px 'Courier New'";
        ctx.fillStyle = "#000";
        ctx.fillText(`Amount: ${this.formatMoney(userData.balance)} BDT`, width/2, 240);
        ctx.fillText(`Expires: ${new Date(Date.now() + 86400000).toLocaleString()}`, width/2, 290);
        ctx.fillText(`Valid for 24 hours only`, width/2, 340);

        // Footer
        ctx.font = "16px 'Courier New'";
        ctx.fillText("Keep this code secure", width/2, 380);

        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `atmcode_${Date.now()}.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async createLoanCard(loanData, userData) {
        const width = 700, height = 500;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // Professional Loan Card
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#1a2980");
        gradient.addColorStop(1, "#26d0ce");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // White Panel
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillRect(30, 30, width - 60, height - 60);

        // Loan Title
        ctx.fillStyle = "#000";
        ctx.font = "bold 40px 'Arial'";
        ctx.textAlign = "center";
        ctx.fillText("💰 LOAN APPROVED 💰", width/2, 100);

        // Loan Amount
        ctx.font = "bold 50px 'Courier New'";
        ctx.fillStyle = "#27ae60";
        ctx.fillText(`${this.formatMoney(loanData.amount)} BDT`, width/2, 200);

        // Details
        ctx.font = "24px 'Arial'";
        ctx.fillStyle = "#000";
        ctx.fillText(`Interest: ${this.formatMoney(loanData.interest)} BDT`, width/2, 280);
        ctx.fillText(`Due Date: ${new Date(loanData.dueDate).toLocaleDateString()}`, width/2, 330);
        ctx.fillText(`Credit Score: ${userData.creditScore || '700'}`, width/2, 380);

        // Footer
        ctx.font = "18px 'Arial'";
        ctx.fillStyle = "#7f8c8d";
        ctx.fillText("Repay before due date to avoid penalty", width/2, 450);

        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `loan_${Date.now()}.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async createFDCard(fdData, userData) {
        const width = 700, height = 500;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // Gold Theme
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#bf9530");
        gradient.addColorStop(0.5, "#fcf6ba");
        gradient.addColorStop(1, "#b38728");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // FD Certificate
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.fillRect(20, 20, width - 40, height - 40);

        ctx.fillStyle = "#000";
        ctx.font = "bold 36px 'Times New Roman'";
        ctx.textAlign = "center";
        ctx.fillText("📜 FIXED DEPOSIT CERTIFICATE 📜", width/2, 80);

        ctx.font = "bold 48px 'Courier New'";
        ctx.fillStyle = "#8B4513";
        ctx.fillText(`${this.formatMoney(fdData.amount)} BDT`, width/2, 170);

        ctx.font = "24px 'Arial'";
        ctx.fillStyle = "#000";
        ctx.fillText(`Interest Earned: ${this.formatMoney(fdData.interest)} BDT`, width/2, 250);
        ctx.fillText(`Maturity Date: ${new Date(fdData.maturityDate).toLocaleDateString()}`, width/2, 310);
        ctx.fillText(`Maturity Amount: ${this.formatMoney(fdData.amount + fdData.interest)} BDT`, width/2, 370);

        ctx.font = "20px 'Arial'";
        ctx.fillStyle = "#4a4a4a";
        ctx.fillText(`Account: ${userData.accountNumber}`, width/2, 430);

        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `fd_${Date.now()}.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async createMainMenu(userData) {
        const width = 800, height = 1000;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");

        // ATM Main Menu Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#283048");
        gradient.addColorStop(1, "#859398");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // ATM Screen
        ctx.fillStyle = "#2c3e50";
        ctx.fillRect(40, 40, width - 80, height - 80);
        
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 5;
        ctx.strokeRect(40, 40, width - 80, height - 80);

        // ATM Header
        ctx.fillStyle = "#ffd700";
        ctx.font = "bold 48px 'Courier New'";
        ctx.textAlign = "center";
        ctx.fillText("🏧 ATM MAIN MENU 🏧", width/2, 120);

        // User Info
        ctx.fillStyle = "#ecf0f1";
        ctx.font = "24px 'Arial'";
        ctx.fillText(`Welcome, ${userData.name || 'User'}`, width/2, 190);
        ctx.fillText(`Account: ${userData.accountNumber}`, width/2, 230);
        ctx.fillText(`Balance: ${this.formatMoney(userData.balance)} BDT`, width/2, 270);

        // Menu Options
        const menuOptions = [
            "1. CHECK BALANCE",
            "2. DEPOSIT CASH",
            "3. WITHDRAW CASH",
            "4. SEND MONEY",
            "5. VIEW ATM CARD",
            "6. GENERATE ATM CODE",
            "7. TRANSACTION HISTORY",
            "8. APPLY FOR LOAN",
            "9. FIXED DEPOSIT",
            "0. EXIT"
        ];

        ctx.font = "28px 'Courier New'";
        ctx.fillStyle = "#3498db";
        let y = 350;
        menuOptions.forEach(option => {
            ctx.fillStyle = "#3498db";
            ctx.fillText(option, width/2 - 200, y);
            y += 45;
        });

        // Instructions
        ctx.font = "20px 'Arial'";
        ctx.fillStyle = "#f1c40f";
        ctx.fillText("Please select an option or type command", width/2, 850);
        ctx.fillText("Example: bank balance, bank deposit 1000", width/2, 890);

        // Footer
        ctx.font = "18px 'Arial'";
        ctx.fillStyle = "#bdc3c7";
        ctx.fillText(new Date().toLocaleString(), width/2, 950);

        const outputDir = path.join(__dirname, "cache");
        fs.mkdirSync(outputDir, { recursive: true });
        const filePath = path.join(outputDir, `mainmenu_${Date.now()}.png`);
        fs.writeFileSync(filePath, canvas.toBuffer());
        return filePath;
    },

    async onStart({ message, args, usersData, event, api }) {
        const uid = event.senderID;
        const action = args[0]?.toLowerCase();
        let data = await usersData.get(uid);
        
        // Initialize bank data
        if (!data.data) data.data = {};
        if (!data.data.bank) {
            data.data.bank = {
                balance: 0,
                registered: false,
                card: null,
                transactions: [],
                accountNumber: this.generateAccountNumber(),
                createdAt: null,
                atmCodes: [],
                loan: { amount: 0 },
                fixedDeposits: [],
                creditScore: 700,
                accountType: "Standard"
            };
        }
        
        const bank = data.data.bank;

        // Show ATM Main Menu if no action
        if (!action) {
            const menuImage = await this.createMainMenu({
                name: data.name || "User",
                accountNumber: bank.accountNumber,
                balance: bank.balance
            });
            
            return message.reply({
                body: "🏧 **ATM Banking System** 🏧\nPlease select an option:",
                attachment: fs.createReadStream(menuImage)
            });
        }

        // Register Command
        if (action === "register") {
            if (bank.registered) {
                const errorImage = await this.createATMScreen(
                    "ERROR",
                    "Account already exists!",
                    null,
                    { buttons: ['OK'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            bank.registered = true;
            bank.balance = 1000;
            bank.createdAt = this.nowISO();
            bank.transactions.push({
                type: "received",
                amount: 1000,
                from: "Welcome Bonus",
                time: Date.now()
            });
            
            await usersData.set(uid, { data: data.data });

            const successImage = await this.createATMScreen(
                "ACCOUNT CREATED",
                `Welcome Bonus: 1,000 BDT`,
                { name: data.name, balance: bank.balance },
                { buttons: ['PRINT RECEIPT', 'CONTINUE'] }
            );
            
            return message.reply({
                body: `✅ Account opened successfully!\nAccount Number: ${bank.accountNumber}`,
                attachment: fs.createReadStream(successImage)
            });
        }

        if (!bank.registered) {
            const errorImage = await this.createATMScreen(
                "ACCESS DENIED",
                "Please register first",
                null,
                { buttons: ['REGISTER NOW'] }
            );
            return message.reply({ attachment: fs.createReadStream(errorImage) });
        }

        // Balance Command
        if (action === "balance") {
            const balanceImage = await this.createBalanceCard({
                balance: bank.balance,
                accountNumber: bank.accountNumber,
                accountType: bank.accountType,
                creditScore: bank.creditScore
            });
            
            return message.reply({
                body: "💰 **Current Balance** 💰",
                attachment: fs.createReadStream(balanceImage)
            });
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
                maxAmount: bank.balance
            });
            
            await usersData.set(uid, { data: data.data });

            const codeImage = await this.createATMCodeCard(newCode, {
                balance: bank.balance
            });
            
            return message.reply({
                body: "🏧 **ATM Code Generated** 🏧\nValid for 24 hours only!",
                attachment: fs.createReadStream(codeImage)
            });
        }

        // ATM Withdrawal
        if (action === "atmwithdraw") {
            const code = args[1]?.toUpperCase();
            const amount = parseFloat(args[2]);
            
            if (!code || isNaN(amount)) {
                const errorImage = await this.createATMScreen(
                    "INVALID INPUT",
                    "Usage: atmwithdraw CODE AMOUNT",
                    null,
                    { buttons: ['TRY AGAIN'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }

            // Find ATM code
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
                const errorImage = await this.createATMScreen(
                    "INVALID CODE",
                    "ATM code not found or expired",
                    null,
                    { buttons: ['GET NEW CODE'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            if (amount > foundCode.maxAmount) {
                const errorImage = await this.createATMScreen(
                    "AMOUNT EXCEEDED",
                    `Max allowed: ${this.formatMoney(foundCode.maxAmount)} BDT`,
                    null,
                    { buttons: ['TRY AGAIN'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            // Process transaction
            foundUser.data.bank.balance -= amount;
            foundCode.used = true;
            bank.balance += amount;
            
            foundUser.data.bank.transactions.push({
                type: "sent",
                amount: amount,
                to: data.name || "ATM User",
                time: Date.now(),
                method: "ATM Code"
            });
            
            bank.transactions.push({
                type: "received",
                amount: amount,
                from: foundUser.name || "ATM Sender",
                time: Date.now(),
                method: "ATM Code"
            });
            
            await usersData.set(foundUserId, { data: foundUser.data });
            await usersData.set(uid, { data: data.data });

            const successImage = await this.createATMScreen(
                "WITHDRAWAL SUCCESSFUL",
                `${this.formatMoney(amount)} BDT`,
                { name: data.name, balance: bank.balance },
                { buttons: ['PRINT RECEIPT', 'NEW TRANSACTION'] }
            );
            
            return message.reply({
                body: `✅ ATM Withdrawal: ${this.formatMoney(amount)} BDT`,
                attachment: fs.createReadStream(successImage)
            });
        }

        // Transaction History
        if (action === "history") {
            const historyImage = await this.createTransactionHistory(
                bank.transactions,
                {
                    accountNumber: bank.accountNumber,
                    balance: bank.balance
                }
            );
            
            return message.reply({
                body: "📋 **Transaction History** 📋",
                attachment: fs.createReadStream(historyImage)
            });
        }

        // Loan Application
        if (action === "loan") {
            const amount = parseFloat(args[1]);
            
            if (isNaN(amount) || amount <= 0) {
                const errorImage = await this.createATMScreen(
                    "INVALID AMOUNT",
                    "Please enter valid amount",
                    null,
                    { buttons: ['TRY AGAIN'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            if (bank.creditScore < 600) {
                const errorImage = await this.createATMScreen(
                    "LOAN REJECTED",
                    `Credit Score: ${bank.creditScore}\nMinimum required: 600`,
                    null,
                    { buttons: ['IMPROVE SCORE'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            const maxLoan = bank.balance * 3;
            if (amount > maxLoan) {
                const errorImage = await this.createATMScreen(
                    "LOAN REJECTED",
                    `Max loan: ${this.formatMoney(maxLoan)} BDT`,
                    null,
                    { buttons: ['APPLY LESS'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + 6);
            
            const loanData = {
                amount: amount,
                takenAt: Date.now(),
                dueDate: dueDate.getTime(),
                interest: this.calculateLoanInterest(amount, 180)
            };
            
            bank.loan = loanData;
            bank.balance += amount;
            
            bank.transactions.push({
                type: "received",
                amount: amount,
                from: "Bank Loan",
                time: Date.now()
            });

            await usersData.set(uid, { data: data.data });

            const loanImage = await this.createLoanCard(loanData, {
                creditScore: bank.creditScore,
                accountNumber: bank.accountNumber
            });
            
            return message.reply({
                body: "✅ **Loan Approved!**",
                attachment: fs.createReadStream(loanImage)
            });
        }

        // Fixed Deposit
        if (action === "fd") {
            const amount = parseFloat(args[1]);
            
            if (isNaN(amount) || amount <= 0) {
                const errorImage = await this.createATMScreen(
                    "INVALID AMOUNT",
                    "Please enter valid amount",
                    null,
                    { buttons: ['TRY AGAIN'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            if (amount > bank.balance) {
                const errorImage = await this.createATMScreen(
                    "INSUFFICIENT FUNDS",
                    `Available: ${this.formatMoney(bank.balance)} BDT`,
                    null,
                    { buttons: ['DEPOSIT FIRST'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            const maturityDate = new Date();
            maturityDate.setMonth(maturityDate.getMonth() + 3);
            
            const fdData = {
                amount: amount,
                createdAt: Date.now(),
                maturityDate: maturityDate.getTime(),
                interest: this.calculateFDInterest(amount, 90)
            };
            
            if (!bank.fixedDeposits) bank.fixedDeposits = [];
            bank.fixedDeposits.push(fdData);
            bank.balance -= amount;
            
            bank.transactions.push({
                type: "sent",
                amount: amount,
                to: "Fixed Deposit",
                time: Date.now()
            });

            await usersData.set(uid, { data: data.data });

            const fdImage = await this.createFDCard(fdData, {
                accountNumber: bank.accountNumber
            });
            
            return message.reply({
                body: "📜 **Fixed Deposit Created** 📜",
                attachment: fs.createReadStream(fdImage)
            });
        }

        // Deposit
        if (action === "deposit") {
            const amount = parseFloat(args[1]);
            if (isNaN(amount) || amount <= 0) {
                const errorImage = await this.createATMScreen(
                    "INVALID AMOUNT",
                    "Please enter valid amount",
                    null,
                    { buttons: ['TRY AGAIN'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            bank.balance += amount;
            bank.transactions.push({
                type: "received",
                amount: amount,
                from: "Cash Deposit",
                time: Date.now()
            });
            
            await usersData.set(uid, { data: data.data });

            const successImage = await this.createATMScreen(
                "DEPOSIT SUCCESSFUL",
                `+${this.formatMoney(amount)} BDT`,
                { name: data.name, balance: bank.balance },
                { buttons: ['PRINT RECEIPT', 'CONTINUE'] }
            );
            
            return message.reply({
                body: `✅ Deposited: ${this.formatMoney(amount)} BDT`,
                attachment: fs.createReadStream(successImage)
            });
        }

        // Withdraw
        if (action === "withdraw") {
            const amount = parseFloat(args[1]);
            if (isNaN(amount) || amount <= 0) {
                const errorImage = await this.createATMScreen(
                    "INVALID AMOUNT",
                    "Please enter valid amount",
                    null,
                    { buttons: ['TRY AGAIN'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            if (amount > bank.balance) {
                const errorImage = await this.createATMScreen(
                    "INSUFFICIENT FUNDS",
                    `Available: ${this.formatMoney(bank.balance)} BDT`,
                    null,
                    { buttons: ['CHECK BALANCE'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            bank.balance -= amount;
            bank.transactions.push({
                type: "sent",
                amount: amount,
                to: "Cash Withdrawal",
                time: Date.now()
            });
            
            await usersData.set(uid, { data: data.data });

            const successImage = await this.createATMScreen(
                "WITHDRAWAL SUCCESSFUL",
                `-${this.formatMoney(amount)} BDT`,
                { name: data.name, balance: bank.balance },
                { buttons: ['PRINT RECEIPT', 'CONTINUE'] }
            );
            
            return message.reply({
                body: `✅ Withdrawn: ${this.formatMoney(amount)} BDT`,
                attachment: fs.createReadStream(successImage)
            });
        }

        // Send Money
        if (action === "send") {
            if (!args[1] || !args[2]) {
                const errorImage = await this.createATMScreen(
                    "INVALID COMMAND",
                    "Usage: send @user amount",
                    null,
                    { buttons: ['HELP'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            let targetId;
            if (args[1].startsWith("@")) {
                const mentions = Object.keys(event.mentions || {});
                if (mentions.length === 0) {
                    const errorImage = await this.createATMScreen(
                        "USER NOT FOUND",
                        "Please mention a user",
                        null,
                        { buttons: ['TRY AGAIN'] }
                    );
                    return message.reply({ attachment: fs.createReadStream(errorImage) });
                }
                targetId = mentions[0];
            } else {
                targetId = args[1];
            }
            
            const amount = parseFloat(args[2]);
            
            if (isNaN(amount) || amount <= 0) {
                const errorImage = await this.createATMScreen(
                    "INVALID AMOUNT",
                    "Please enter valid amount",
                    null,
                    { buttons: ['TRY AGAIN'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            if (amount > bank.balance) {
                const errorImage = await this.createATMScreen(
                    "INSUFFICIENT FUNDS",
                    `Available: ${this.formatMoney(bank.balance)} BDT`,
                    null,
                    { buttons: ['CHECK BALANCE'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            let targetData = await usersData.get(targetId);
            if (!targetData.data) targetData.data = {};
            if (!targetData.data.bank) {
                targetData.data.bank = {
                    balance: 0,
                    registered: false,
                    transactions: []
                };
            }
            
            if (!targetData.data.bank.registered) {
                const errorImage = await this.createATMScreen(
                    "USER NOT REGISTERED",
                    "Recipient has no bank account",
                    null,
                    { buttons: ['OK'] }
                );
                return message.reply({ attachment: fs.createReadStream(errorImage) });
            }
            
            // Process send
            bank.balance -= amount;
            targetData.data.bank.balance += amount;
            
            bank.transactions.push({
                type: "sent",
                amount: amount,
                to: targetData.name || "User",
                time: Date.now()
            });
            
            targetData.data.bank.transactions.push({
                type: "received",
                amount: amount,
                from: data.name || "User",
                time: Date.now()
            });
            
            await usersData.set(uid, { data: data.data });
            await usersData.set(targetId, { data: targetData.data });

            const successImage = await this.createATMScreen(
                "TRANSFER SUCCESSFUL",
                `${this.formatMoney(amount)} BDT sent`,
                { name: data.name, balance: bank.balance },
                { buttons: ['PRINT RECEIPT', 'CONTINUE'] }
            );
            
            return message.reply({
                body: `✅ Sent ${this.formatMoney(amount)} BDT to ${targetData.name || 'User'}`,
                attachment: fs.createReadStream(successImage)
            });
        }

        // If no matching command
        const menuImage = await this.createMainMenu({
            name: data.name || "User",
            accountNumber: bank.accountNumber,
            balance: bank.balance
        });
        
        return message.reply({
            body: "🏧 **ATM Banking System** 🏧\nType 'bank help' for commands",
            attachment: fs.createReadStream(menuImage)
        });
    }
};
