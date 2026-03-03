const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const { createCanvas, loadImage } = require("canvas");
const axios = require("axios");

// No font registration needed - using system fonts

const deltaNext = 5;

// Convert EXP to Level
function expToLevel(exp) {
    return Math.floor((1 + Math.sqrt(1 + 8 * exp / deltaNext)) / 2);
}

// Format Money without emojis
function formatMoney(value) {
    if (value >= 1e15) return (value / 1e15).toFixed(2) + " Qt";
    if (value >= 1e12) return (value / 1e12).toFixed(2) + " T";
    if (value >= 1e9) return (value / 1e9).toFixed(2) + " B";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + " M";
    if (value >= 1e3) return (value / 1e3).toFixed(2) + " K";
    return value.toString();
}

// Get level progress percentage
function getLevelProgress(exp) {
    const level = expToLevel(exp);
    const expNeeded = (level * (level - 1) * deltaNext) / 2;
    const nextLevelExp = ((level + 1) * level * deltaNext) / 2;
    const progress = ((exp - expNeeded) / (nextLevelExp - expNeeded)) * 100;
    return Math.min(100, Math.max(0, progress));
}

// Safe avatar fetch with cache
const avatarCache = new Map();
async function fetchAvatar(userID, usersData) {
    if (avatarCache.has(userID)) {
        return avatarCache.get(userID);
    }
    
    try {
        let avatarURL = await usersData.getAvatarUrl(userID);
        if (!avatarURL) {
            avatarURL = `https://graph.facebook.com/${userID}/picture?type=large&width=500&height=500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        }
        avatarURL += avatarURL.includes("?") ? "&" : "?";
        avatarURL += `t=${Date.now()}`;

        const res = await axios.get(avatarURL, { 
            responseType: "arraybuffer", 
            timeout: 10000, 
            maxRedirects: 5, 
            headers: { "User-Agent": "Mozilla/5.0" } 
        });
        
        const image = await loadImage(Buffer.from(res.data));
        avatarCache.set(userID, image);
        return image;
    } catch (e) {
        const size = 200;
        const fallback = createCanvas(size, size);
        const ctx = fallback.getContext("2d");
        
        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, "#ff6b6b");
        gradient.addColorStop(1, "#4ecdc4");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        // Text
        ctx.font = `bold ${size / 2}px Arial`;
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(userID.charAt(0).toUpperCase(), size / 2, size / 2);
        
        const fallbackImage = fallback;
        avatarCache.set(userID, fallbackImage);
        return fallbackImage;
    }
}

// Draw animated style leaderboard with premium card designs
async function drawTopBoard(users, type, usersData) {
    const W = 1400, H = 1600; // Bigger canvas
    
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext("2d");
    
    // Premium cosmic background
    const bgGradient = ctx.createRadialGradient(W/2, H/2, 100, W/2, H/2, 1000);
    bgGradient.addColorStop(0, "#0a0a2a");
    bgGradient.addColorStop(0.5, "#1a1a4a");
    bgGradient.addColorStop(1, "#0a0a2a");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, W, H);
    
    // Galaxy effect
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const radius = Math.random() * 4;
        const alpha = Math.random() * 0.6;
        
        // Stars
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Occasional colored stars
        if (i % 10 === 0) {
            ctx.fillStyle = `rgba(100, 200, 255, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x + 5, y + 5, radius + 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Glowing orbs
    for (let i = 0; i < 5; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 150);
        gradient.addColorStop(0, `rgba(100, 0, 255, 0.1)`);
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(x - 150, y - 150, 300, 300);
    }
    
    // Premium border with pattern
    ctx.strokeStyle = "rgba(255, 215, 0, 0.3)";
    ctx.lineWidth = 4;
    ctx.strokeRect(15, 15, W - 30, H - 30);
    
    // Corner decorations
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 3;
    const cornerSize = 30;
    
    // Top-left corner
    ctx.beginPath();
    ctx.moveTo(20, 20 + cornerSize);
    ctx.lineTo(20, 20);
    ctx.lineTo(20 + cornerSize, 20);
    ctx.stroke();
    
    // Top-right corner
    ctx.beginPath();
    ctx.moveTo(W - 20 - cornerSize, 20);
    ctx.lineTo(W - 20, 20);
    ctx.lineTo(W - 20, 20 + cornerSize);
    ctx.stroke();
    
    // Bottom-left corner
    ctx.beginPath();
    ctx.moveTo(20, H - 20 - cornerSize);
    ctx.lineTo(20, H - 20);
    ctx.lineTo(20 + cornerSize, H - 20);
    ctx.stroke();
    
    // Bottom-right corner
    ctx.beginPath();
    ctx.moveTo(W - 20 - cornerSize, H - 20);
    ctx.lineTo(W - 20, H - 20);
    ctx.lineTo(W - 20, H - 20 - cornerSize);
    ctx.stroke();
    
    // Main title with 3D effect
    ctx.shadowColor = "#ffd700";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    ctx.font = "bold 80px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(type === "rank" ? "TOP RANKERS" : "TOP RICH LIST", W / 2, 100);
    
    // Subtitle with glow
    ctx.shadowBlur = 15;
    ctx.font = "35px Arial";
    ctx.fillStyle = "#00ffff";
    ctx.fillText("Elite Leaders of the Community", W / 2, 160);
    
    ctx.shadowBlur = 0;
    
    // Top 3 positions with premium cards
    const positions = [
        { 
            i: 0, 
            x: W/2 - 120, 
            y: 200, 
            size: 240, 
            rank: "1st", 
            glow: "#ffd700",
            cardColor: ["#ffd700", "#ffa500"]
        },
        { 
            i: 1, 
            x: W/2 - 350, 
            y: 280, 
            size: 200, 
            rank: "2nd", 
            glow: "#c0c0c0",
            cardColor: ["#c0c0c0", "#a0a0a0"]
        },
        { 
            i: 2, 
            x: W/2 + 110, 
            y: 280, 
            size: 200, 
            rank: "3rd", 
            glow: "#cd7f32",
            cardColor: ["#cd7f32", "#8b4513"]
        },
    ];
    
    for (const pos of positions) {
        const u = users[pos.i];
        if (!u) continue;
        
        const avatar = await fetchAvatar(u.userID, usersData);
        
        // Premium card background for top 3
        ctx.shadowColor = pos.glow;
        ctx.shadowBlur = 40;
        
        // Glass morphism effect
        ctx.save();
        ctx.shadowBlur = 30;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(pos.x + pos.size/2 + 5, pos.y + pos.size/2 + 5, pos.size/2 + 25, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
        ctx.fill();
        
        // Main card background
        const cardGradient = ctx.createRadialGradient(
            pos.x + pos.size/2, pos.y + pos.size/2, 50,
            pos.x + pos.size/2, pos.y + pos.size/2, pos.size
        );
        cardGradient.addColorStop(0, `rgba(255, 255, 255, 0.3)`);
        cardGradient.addColorStop(0.5, `rgba(${pos.glow === '#ffd700' ? '255,215,0' : pos.glow === '#c0c0c0' ? '192,192,192' : '205,127,50'}, 0.2)`);
        cardGradient.addColorStop(1, `rgba(0, 0, 0, 0.5)`);
        
        ctx.beginPath();
        ctx.arc(pos.x + pos.size/2, pos.y + pos.size/2, pos.size/2 + 20, 0, Math.PI*2);
        ctx.fillStyle = cardGradient;
        ctx.fill();
        
        // Avatar with premium border
        ctx.beginPath();
        ctx.arc(pos.x + pos.size/2, pos.y + pos.size/2, pos.size/2 + 15, 0, Math.PI*2);
        ctx.strokeStyle = pos.glow;
        ctx.lineWidth = 5;
        ctx.stroke();
        
        // Avatar circle with shine effect
        ctx.beginPath();
        ctx.arc(pos.x + pos.size/2, pos.y + pos.size/2, pos.size/2, 0, Math.PI*2);
        ctx.clip();
        ctx.drawImage(avatar, pos.x, pos.y, pos.size, pos.size);
        
        // Shine overlay
        ctx.globalCompositeOperation = "overlay";
        const shineGradient = ctx.createRadialGradient(
            pos.x + pos.size/2 - 30, pos.y + pos.size/2 - 30, 10,
            pos.x + pos.size/2, pos.y + pos.size/2, pos.size
        );
        shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
        shineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.1)");
        shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = shineGradient;
        ctx.fillRect(pos.x, pos.y, pos.size, pos.size);
        ctx.restore();
        
        ctx.globalCompositeOperation = "source-over";
        
        // Name with premium style
        ctx.shadowBlur = 20;
        ctx.font = "bold 34px Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        
        const displayName = u.name.length > 15 ? u.name.slice(0, 12) + "..." : u.name;
        ctx.fillText(displayName, pos.x + pos.size/2, pos.y + pos.size + 60);
        
        // Rank badge
        ctx.font = "30px Arial";
        ctx.fillStyle = pos.glow;
        ctx.fillText(pos.rank, pos.x + pos.size/2, pos.y + pos.size + 100);
        
        // Value with premium card
        if (type === "rank") {
            const level = expToLevel(u.totalExp);
            ctx.fillStyle = "#00ff00";
            ctx.fillText(`Level ${level}`, pos.x + pos.size/2, pos.y + pos.size + 140);
            
            // Progress bar with glass effect
            const progress = getLevelProgress(u.totalExp);
            const barWidth = pos.size - 20;
            const barX = pos.x + 10;
            const barY = pos.y + pos.size + 150;
            
            // Background
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fillRect(barX, barY, barWidth, 20);
            
            // Progress with gradient
            const progressGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
            progressGradient.addColorStop(0, "#00ffff");
            progressGradient.addColorStop(1, "#ff00ff");
            ctx.fillStyle = progressGradient;
            ctx.fillRect(barX, barY, barWidth * (progress / 100), 20);
            
            // Border
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 1;
            ctx.strokeRect(barX, barY, barWidth, 20);
            
        } else {
            ctx.fillStyle = "#00ff00";
            ctx.fillText(formatMoney(u.money), pos.x + pos.size/2, pos.y + pos.size + 140);
        }
    }
    
    // 4-10 positions with premium glass cards
    const startY = 620, rowH = 105, avatarSize = 75;
    
    for (let i = 3; i < users.length; i++) {
        const u = users[i];
        const y = startY + (i - 3) * rowH;
        const rank = i + 1;
        
        // Premium glass card background
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00ffff";
        
        // Glass morphism card
        ctx.save();
        
        // Card background with blur effect
        const cardGradient = ctx.createLinearGradient(40, y - 30, W - 40, y + 80);
        cardGradient.addColorStop(0, "rgba(30, 30, 70, 0.8)");
        cardGradient.addColorStop(0.5, "rgba(50, 50, 100, 0.9)");
        cardGradient.addColorStop(1, "rgba(30, 30, 70, 0.8)");
        
        ctx.fillStyle = cardGradient;
        roundRect(ctx, 40, y - 30, W - 80, rowH, 25).fill();
        
        // Inner glow
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        roundRect(ctx, 40, y - 30, W - 80, rowH, 25).stroke();
        
        // Shine effect on top
        const shineGradient = ctx.createLinearGradient(40, y - 30, W - 40, y - 20);
        shineGradient.addColorStop(0, "rgba(255, 255, 255, 0.2)");
        shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = shineGradient;
        roundRect(ctx, 40, y - 30, W - 80, 30, 25).fill();
        
        // Neon border effect
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + (i % 3) * 0.2})`;
        ctx.lineWidth = 2;
        roundRect(ctx, 40, y - 30, W - 80, rowH, 25).stroke();
        
        // Animated particles on card
        for (let p = 0; p < 5; p++) {
            const px = 50 + Math.random() * (W - 150);
            const py = y - 20 + Math.random() * (rowH - 20);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
            ctx.beginPath();
            ctx.arc(px, py, Math.random() * 3, 0, Math.PI * 2);
            ctx.fill();
        }
        
        ctx.restore();
        
        // Rank with premium style
        ctx.shadowBlur = 10;
        ctx.font = "bold 40px Arial";
        
        // Different colors for different ranks
        if (i === 3) ctx.fillStyle = "#ffd700"; // 4th - gold
        else if (i === 4) ctx.fillStyle = "#c0c0c0"; // 5th - silver
        else if (i === 5) ctx.fillStyle = "#cd7f32"; // 6th - bronze
        else ctx.fillStyle = "#00ffff"; // others - cyan
        
        ctx.textAlign = "left";
        
        const rankText = rank <= 9 ? `#0${rank}` : `#${rank}`;
        ctx.fillText(rankText, 60, y + 20);
        
        // Avatar with premium border
        const avatar = await fetchAvatar(u.userID, usersData);
        ctx.save();
        
        // Avatar glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00ffff";
        
        // Avatar border
        ctx.beginPath();
        ctx.arc(160 + avatarSize/2, y - 10 + avatarSize/2, avatarSize/2 + 4, 0, Math.PI*2);
        ctx.strokeStyle = "#00ffff";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Avatar circle
        ctx.beginPath();
        ctx.arc(160 + avatarSize/2, y - 10 + avatarSize/2, avatarSize/2, 0, Math.PI*2);
        ctx.clip();
        ctx.drawImage(avatar, 160, y - 10, avatarSize, avatarSize);
        ctx.restore();
        
        // Name with gradient
        ctx.shadowBlur = 8;
        const nameGradient = ctx.createLinearGradient(250, y + 10, 500, y + 30);
        nameGradient.addColorStop(0, "#fff");
        nameGradient.addColorStop(1, "#00ffff");
        
        ctx.font = "bold 32px Arial";
        ctx.fillStyle = nameGradient;
        ctx.textAlign = "left";
        ctx.fillText(u.name, 250, y + 20);
        
        // Value with premium card
        ctx.font = "30px Arial";
        ctx.fillStyle = "#00ff00";
        ctx.textAlign = "right";
        
        if (type === "rank") {
            const level = expToLevel(u.totalExp);
            ctx.fillText(`Level ${level} (${u.totalExp} XP)`, W - 180, y + 20);
            
            // Progress indicator
            ctx.fillStyle = "#00ffff";
            ctx.beginPath();
            ctx.arc(W - 200, y - 15, 8, 0, Math.PI * 2);
            ctx.fill();
            
            // Small progress bar
            const progress = getLevelProgress(u.totalExp);
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.fillRect(W - 300, y - 5, 100, 5);
            ctx.fillStyle = "#00ffff";
            ctx.fillRect(W - 300, y - 5, progress, 5);
            
        } else {
            ctx.fillText(formatMoney(u.money), W - 180, y + 20);
        }
    }
    
    // Premium footer
    ctx.shadowBlur = 20;
    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText("══════════ ⋆★⋆ ══════════", W/2, H - 120);
    
    // Stats card
    const totalUsers = await usersData.getAll();
    
    // Glass card for stats
    ctx.shadowBlur = 30;
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    roundRect(ctx, W/2 - 200, H - 100, 400, 60, 20).fill();
    ctx.strokeStyle = "rgba(255, 215, 0, 0.5)";
    ctx.lineWidth = 2;
    roundRect(ctx, W/2 - 200, H - 100, 400, 60, 20).stroke();
    
    ctx.font = "30px Arial";
    ctx.fillStyle = "#00ffff";
    ctx.fillText(`Total Users: ${totalUsers.length}`, W/2, H - 65);
    
    ctx.font = "25px Arial";
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(`Updated: ${moment().tz("Asia/Dhaka").format("YYYY-MM-DD hh:mm:ss A")}`, W/2, H - 25);
    
    // Save
    const fileName = `top_${type}_${Date.now()}.png`;
    const filePath = path.join(__dirname, "cache", fileName);
    
    const cacheDir = path.join(__dirname, "cache");
    if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(filePath, buffer);
    
    return filePath;
}

// Enhanced rounded rectangle with premium style
function roundRect(ctx, x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    return ctx;
}

// Export module
module.exports = {
    config: {
        name: "top",
        version: "1.0.0",
        author: "Azadx69x",
        countDown: 5,
        role: 0,
        shortDescription: {
            en: "Show stylish leaderboard",
        },
        longDescription: {
            en: "View top 10 users by rank or money with premium design",
        },
        category: "rank",
        guide: {
            en: "{pn} rank | money",
        }
    },

    onStart: async function({ api, event, args, usersData, message }) {
        const type = args[0]?.toLowerCase();
        
        if (!["rank", "money"].includes(type)) {
            const msg = "TOP LEADERBOARD COMMAND\n\n" +
                "Usage: /top rank or /top money\n" +
                "Example: /top rank\n\n" +
                "rank - Top ranking by experience\n" +
                "money - Top rich list by money\n\n" +
                "FEATURES:\n" +
                "- Premium glass morphism design\n" +
                "- Cosmic background with galaxy effects\n" +
                "- Animated progress bars\n" +
                "- Real-time updates";
            
            return message.reply(msg);
        }

        try {
            api.setMessageReaction("⏳", event.messageID, () => {}, true);
            
            const allUsers = await usersData.getAll();
            let sorted;
            
            if (type === "rank") {
                sorted = allUsers.map(u => ({ 
                    ...u, 
                    totalExp: u.exp || 0,
                    name: u.name || "Unknown User"
                }))
                .sort((a, b) => b.totalExp - a.totalExp)
                .slice(0, 10);
            } else {
                sorted = allUsers.map(u => ({ 
                    ...u, 
                    money: u.money || 0,
                    name: u.name || "Unknown User"
                }))
                .sort((a, b) => b.money - a.money)
                .slice(0, 10);
            }
            
            const filePath = await drawTopBoard(sorted, type, usersData);

            let body = `ELITE LEADERBOARD\n\n`;
            body += `TOP 10 ${type === "rank" ? "RANKERS" : "RICHEST"} USERS\n\n`;
            
            const medals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
            
            for (let i = 0; i < sorted.length; i++) {
                const u = sorted[i];
                let value;
                
                if (type === "rank") {
                    const level = expToLevel(u.totalExp);
                    value = `Level ${level} (${u.totalExp} XP)`;
                } else {
                    value = formatMoney(u.money);
                }
                
                body += `${medals[i]}. ${u.name}\n`;
                body += `   ${value}\n\n`;
            }
            
            body += `STATISTICS:\n`;
            body += `Total Users: ${allUsers.length}\n`;
            body += `Updated: ${moment().tz("Asia/Dhaka").format("hh:mm A")}\n`;
            body += `\nCheck the image for premium details!`;

            api.setMessageReaction("✅", event.messageID, () => {}, true);

            message.reply({
                body,
                attachment: fs.createReadStream(filePath)
            });

        } catch (err) {
            console.error("Error generating top board:", err);
            api.setMessageReaction("❌", event.messageID, () => {}, true);
            return message.reply("Unable to generate leaderboard at the moment. Please try again later.");
        }
    }
};
