//cmd install top.js
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");
const { createCanvas, loadImage, registerFont } = require("canvas");
const axios = require("axios");

// Register custom fonts (if available, fallback to Arial)
try {
    registerFont('./fonts/Poppins-Bold.ttf', { family: 'Poppins', weight: 'bold' });
    registerFont('./fonts/Poppins-Regular.ttf', { family: 'Poppins', weight: 'normal' });
    registerFont('./fonts/Orbitron-Bold.ttf', { family: 'Orbitron', weight: 'bold' });
} catch (e) {
    // Fallback to system fonts
}

// Format money with style
function formatMoney(value) {
    value = Number(value);
    if (isNaN(value)) return "0";
    if (value >= 1e15) return (value / 1e15).toFixed(2) + "Q";
    if (value >= 1e12) return (value / 1e12).toFixed(2) + "T";
    if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(2) + "K";
    return value.toString();
}

// Avatar cache with enhanced fallback
const avatarCache = new Map();
async function fetchAvatar(userID, usersData) {
    if (avatarCache.has(userID)) return avatarCache.get(userID);

    try {
        let avatarURL = await usersData.getAvatarUrl(userID);
        if (!avatarURL) {
            avatarURL = `https://graph.facebook.com/${userID}/picture?type=large&width=500&height=500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
        }
        const res = await axios.get(avatarURL, { 
            responseType: "arraybuffer", 
            timeout: 5000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        const image = await loadImage(Buffer.from(res.data));
        avatarCache.set(userID, image);
        return image;
    } catch (e) {
        // Premium fallback avatar with gradient
        const canvas = createCanvas(200, 200);
        const ctx = canvas.getContext("2d");
        
        // Dynamic gradient based on userID
        const hue = userID ? userID.split('').reduce((a,b)=>a+b.charCodeAt(0),0) % 360 : 200;
        const gradient = ctx.createLinearGradient(0, 0, 200, 200);
        gradient.addColorStop(0, `hsl(${hue}, 80%, 60%)`);
        gradient.addColorStop(1, `hsl(${hue + 40}, 80%, 40%)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 200, 200);
        
        // Glass overlay
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        ctx.fillRect(0, 0, 200, 100);
        
        // Initial with shadow
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#fff";
        ctx.font = "bold 90px 'Poppins', Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const firstLetter = userID ? userID[0] : "U";
        ctx.fillText(firstLetter.toUpperCase(), 100, 100);
        
        avatarCache.set(userID, canvas);
        return canvas;
    }
}

// Draw rounded rectangle helper
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// Enhanced leaderboard canvas
async function drawTopBoard(users, usersData) {
    const W = 1400, H = 1800;
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext("2d");

    try {
        // Premium dark gradient background
        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, "#0a0a0f");
        bg.addColorStop(0.3, "#1a1a2e");
        bg.addColorStop(0.7, "#16213e");
        bg.addColorStop(1, "#0f0f1a");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // Animated-style particles with glow
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * W;
            const y = Math.random() * H;
            const size = Math.random() * 3;
            const opacity = Math.random() * 0.5;
            const hue = Math.random() > 0.5 ? 200 : 280; // Blue or purple
            
            ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${opacity})`;
            ctx.shadowBlur = 10;
            ctx.fillStyle = `hsla(${hue}, 100%, 80%, ${opacity})`;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI*2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;

        // Top decorative line with glow
        const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
        lineGrad.addColorStop(0, "transparent");
        lineGrad.addColorStop(0.2, "#00d4ff");
        lineGrad.addColorStop(0.5, "#ff00ff");
        lineGrad.addColorStop(0.8, "#00d4ff");
        lineGrad.addColorStop(1, "transparent");
        
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 20;
        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(100, 120);
        ctx.lineTo(W - 100, 120);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Title with double glow effect
        ctx.save();
        ctx.shadowColor = "#ff00ff";
        ctx.shadowBlur = 30;
        ctx.font = "bold 75px 'Orbitron', 'Arial', sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.fillText("🏆 TOP RICHEST USERS 🏆", W/2, 80);
        
        ctx.shadowColor = "#00d4ff";
        ctx.shadowBlur = 60;
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillText("🏆 TOP RICHEST USERS 🏆", W/2, 80);
        ctx.restore();

        // Subtitle
        ctx.font = "italic 30px 'Poppins', Arial";
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillText("Elite Billionaires Club", W/2, 115);

        // Top 3 Podium positions (Triangular layout)
        const positions = [
            { x: W/2 - 100, y: 180, size: 200, color: "#ffd700", glow: "#ffaa00", rank: 1 }, // Gold - Center
            { x: W/2 - 380, y: 280, size: 160, color: "#c0c0c0", glow: "#a0a0a0", rank: 2 }, // Silver - Left
            { x: W/2 + 180, y: 280, size: 160, color: "#cd7f32", glow: "#b87333", rank: 3 }, // Bronze - Right
        ];
        
        // Draw podium base first
        const podiumY = 480;
        
        // #2 Podium (Left)
        ctx.fillStyle = "rgba(192,192,192,0.2)";
        ctx.strokeStyle = "#c0c0c0";
        ctx.lineWidth = 3;
        roundRect(ctx, W/2 - 400, podiumY - 60, 200, 120, 20);
        ctx.fill();
        ctx.stroke();
        ctx.font = "bold 60px Arial";
        ctx.fillStyle = "#c0c0c0";
        ctx.fillText("2", W/2 - 300, podiumY + 20);
        
        // #3 Podium (Right)
        ctx.fillStyle = "rgba(205,127,50,0.2)";
        ctx.strokeStyle = "#cd7f32";
        roundRect(ctx, W/2 + 160, podiumY - 60, 200, 120, 20);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#cd7f32";
        ctx.fillText("3", W/2 + 260, podiumY + 20);
        
        // #1 Podium (Center - Tallest)
        const goldGrad = ctx.createLinearGradient(0, podiumY - 100, 0, podiumY + 100);
        goldGrad.addColorStop(0, "rgba(255,215,0,0.3)");
        goldGrad.addColorStop(1, "rgba(255,215,0,0.1)");
        ctx.fillStyle = goldGrad;
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 4;
        roundRect(ctx, W/2 - 120, podiumY - 100, 240, 160, 20);
        ctx.fill();
        ctx.stroke();
        
        // Crown icon for #1
        ctx.font = "80px Arial";
        ctx.fillText("👑", W/2, podiumY + 30);
        
        // Draw top 3 users
        for (let i = 0; i < 3 && i < users.length; i++) {
            try {
                await drawTopThree(ctx, users[i], positions[i], usersData);
            } catch (e) {
                console.log(`Error drawing top player ${i}:`, e);
            }
        }

        // Glassmorphism cards for 4-10
        const startY = 620;
        const cardHeight = 85;
        const gap = 15;
        
        for (let i = 3; i < users.length; i++) {
            try {
                const y = startY + (i-3) * (cardHeight + gap);
                await drawGlassCard(ctx, users[i], i+1, y, usersData, W);
            } catch (e) {
                console.log(`Error drawing rank card ${i}:`, e);
            }
        }

        // Bottom decorative section
        const footerY = H - 120;
        
        // Gradient line
        ctx.shadowColor = "#ff00ff";
        ctx.shadowBlur = 15;
        const footerGrad = ctx.createLinearGradient(200, 0, W-200, 0);
        footerGrad.addColorStop(0, "transparent");
        footerGrad.addColorStop(0.5, "rgba(0,212,255,0.8)");
        footerGrad.addColorStop(1, "transparent");
        ctx.strokeStyle = footerGrad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(200, footerY);
        ctx.lineTo(W - 200, footerY);
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Stats with icons
        ctx.font = "bold 32px 'Poppins', Arial";
        ctx.fillStyle = "#00d4ff";
        ctx.textAlign = "center";
        ctx.fillText(`📊 Total Users: ${usersData.getAll ? (await usersData.getAll()).length : 'N/A'}`, W/2, footerY + 50);
        
        ctx.font = "24px 'Poppins', Arial";
        ctx.fillStyle = "rgba(255,255,255,0.5)";
        ctx.fillText(`⏰ ${moment().tz("Asia/Dhaka").format("YYYY-MM-DD | hh:mm:ss A")}`, W/2, footerY + 90);

        // Save with high quality
        const cacheDir = path.join(__dirname, "cache");
        if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
        }
        
        const fileName = `top_money_${Date.now()}.png`;
        const filePath = path.join(cacheDir, fileName);
        
        const buffer = canvas.toBuffer("image/png", { compressionLevel: 3, filters: canvas.PNG_FILTER_NONE });
        fs.writeFileSync(filePath, buffer);
        
        return filePath;

    } catch (e) {
        console.log("Error in drawTopBoard:", e);
        throw e;
    }
}

// Draw top 3 with premium effects
async function drawTopThree(ctx, user, pos, usersData) {
    try {
        const avatar = await fetchAvatar(user.userID, usersData);
        const { x, y, size, color, glow, rank } = pos;
        const centerX = x + size/2;
        const centerY = y + size/2;

        // Outer glow ring
        ctx.shadowColor = glow;
        ctx.shadowBlur = 40;
        ctx.beginPath();
        ctx.arc(centerX, centerY, size/2 + 25, 0, Math.PI*2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 6;
        ctx.stroke();
        
        // Inner glow
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(centerX, centerY, size/2 + 15, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Avatar with clip
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, size/2, 0, Math.PI*2);
        ctx.clip();
        
        // Avatar background
        ctx.fillStyle = "#1a1a2e";
        ctx.fillRect(x, y, size, size);
        
        // Draw avatar
        ctx.drawImage(avatar, x, y, size, size);
        
        // Glass overlay on bottom half
        const glassGrad = ctx.createLinearGradient(0, y + size*0.6, 0, y + size);
        glassGrad.addColorStop(0, "transparent");
        glassGrad.addColorStop(1, "rgba(0,0,0,0.4)");
        ctx.fillStyle = glassGrad;
        ctx.fillRect(x, y + size*0.6, size, size*0.4);
        
        ctx.restore();

        // Rank badge (circular)
        const badgeY = y + size + 30;
        ctx.shadowColor = glow;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(centerX, badgeY, 25, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.font = "bold 24px Arial";
        ctx.fillStyle = "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`#${rank}`, centerX, badgeY);
        ctx.shadowBlur = 0;

        // Name with glow
        ctx.shadowColor = "rgba(255,255,255,0.5)";
        ctx.shadowBlur = 10;
        ctx.font = "bold 32px 'Poppins', Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        const displayName = user.name && user.name.length > 10 ? user.name.slice(0, 8) + ".." : (user.name || "Unknown");
        ctx.fillText(displayName, centerX, y + size + 80);
        ctx.shadowBlur = 0;

        // Money with icon
        ctx.font = "bold 28px 'Poppins', Arial";
        ctx.fillStyle = color;
        ctx.fillText(`💎 ${formatMoney(user.money || 0)}`, centerX, y + size + 115);

    } catch (e) {
        console.log("Error in drawTopThree:", e);
    }
}

// Glassmorphism rank card
async function drawGlassCard(ctx, user, rank, y, usersData, W) {
    try {
        const x = 80;
        const w = W - 160;
        const h = 85;
        const avatar = await fetchAvatar(user.userID, usersData);
        const avatarSize = 65;

        // Glass background
        const glassGrad = ctx.createLinearGradient(x, y, x + w, y + h);
        glassGrad.addColorStop(0, "rgba(255,255,255,0.08)");
        glassGrad.addColorStop(0.5, "rgba(255,255,255,0.03)");
        glassGrad.addColorStop(1, "rgba(255,255,255,0.08)");
        
        ctx.shadowColor = "rgba(0,212,255,0.3)";
        ctx.shadowBlur = 15;
        ctx.fillStyle = glassGrad;
        roundRect(ctx, x, y, w, h, 20);
        ctx.fill();
        
        // Border gradient
        const borderGrad = ctx.createLinearGradient(x, y, x + w, y + h);
        borderGrad.addColorStop(0, "rgba(0,212,255,0.5)");
        borderGrad.addColorStop(0.5, "rgba(255,0,255,0.3)");
        borderGrad.addColorStop(1, "rgba(0,212,255,0.5)");
        ctx.strokeStyle = borderGrad;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Rank number with background
        const rankSize = rank <= 3 ? 40 : 35;
        const rankX = x + 50;
        const rankY = y + h/2;
        
        if (rank <= 3) {
            const colors = ["#ffd700", "#c0c0c0", "#cd7f32"];
            ctx.beginPath();
            ctx.arc(rankX, rankY, 28, 0, Math.PI*2);
            ctx.fillStyle = colors[rank-1];
            ctx.fill();
            ctx.font = `bold ${rankSize}px Arial`;
            ctx.fillStyle = "#000";
        } else {
            ctx.font = `bold ${rankSize}px 'Orbitron', Arial`;
            ctx.fillStyle = "#00d4ff";
        }
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`#${rank}`, rankX, rankY);

        // Avatar with ring
        const avatarX = x + 120;
        const avatarY = y + 10;
        
        // Avatar ring
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize/2, avatarY + avatarSize/2, avatarSize/2 + 3, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(0,212,255,0.6)";
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Avatar image
        ctx.save();
        ctx.beginPath();
        ctx.arc(avatarX + avatarSize/2, avatarY + avatarSize/2, avatarSize/2, 0, Math.PI*2);
        ctx.clip();
        ctx.drawImage(avatar, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();

        // Name
        ctx.font = "bold 28px 'Poppins', Arial";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        const displayName = user.name && user.name.length > 15 ? user.name.slice(0, 13) + ".." : (user.name || "Unknown");
        ctx.fillText(displayName, x + 210, y + h/2 - 10);

        // Progress bar background
        const barWidth = 300;
        const barHeight = 8;
        const barX = x + 210;
        const barY = y + h/2 + 15;
        
        ctx.fillStyle = "rgba(255,255,255,0.1)";
        roundRect(ctx, barX, barY, barWidth, barHeight, 4);
        ctx.fill();
        
        // Progress bar fill (simulated based on rank)
        const progress = Math.max(0.1, 1 - (rank * 0.1));
        const barGrad = ctx.createLinearGradient(barX, 0, barX + barWidth * progress, 0);
        barGrad.addColorStop(0, "#00d4ff");
        barGrad.addColorStop(1, "#ff00ff");
        ctx.fillStyle = barGrad;
        roundRect(ctx, barX, barY, barWidth * progress, barHeight, 4);
        ctx.fill();

        // Money (right aligned)
        ctx.font = "bold 26px 'Orbitron', Arial";
        ctx.fillStyle = "#00ff88";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(`💰 ${formatMoney(user.money || 0)}`, x + w - 30, y + h/2);

    } catch (e) {
        console.log("Error in drawGlassCard:", e);
    }
}

// Module export
module.exports = {
    config: {
        name: "top",
        version: "3.0.0",
        author: "Azadx69x",
        countDown: 5,
        role: 0,
        shortDescription: "💎 Premium Money Leaderboard",
        longDescription: "Shows top 10 richest users with premium UI",
        category: "rank",
        guide: "{pn} money"
    },

    onStart: async function({ api, event, usersData, message }) {
        try {
            // Set loading reaction
            if (api && event) {
                api.setMessageReaction("⚡", event.messageID, () => {}, true);
            }

            // Get all users
            const allUsers = await usersData.getAll();
            
            if (!allUsers || allUsers.length === 0) {
                return message.reply("❌ No users found in database!");
            }

            // Sort by money and get top 10
            const sorted = allUsers
                .map(u => ({
                    userID: u.userID,
                    name: u.name || "Unknown User",
                    money: u.money || 0
                }))
                .sort((a, b) => b.money - a.money)
                .slice(0, 10);

            // Generate premium image
            const filePath = await drawTopBoard(sorted, usersData);

            // Create styled text message
            let body = "╔═══《 💎 TOP 10 BILLIONAIRES 💎 》═══╗\n\n";
            sorted.forEach((u, i) => {
                const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
                body += `${medals[i]} ${u.name}\n`;
                body += `    💰 ৳ ${formatMoney(u.money)}\n`;
                if (i < sorted.length - 1) body += "┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄\n";
            });
            body += `\n╚═══ Total Users: ${allUsers.length} | ${moment().tz("Asia/Dhaka").format("hh:mm A")} ═══╝`;

            // Send message with attachment
            await message.reply({
                body: body,
                attachment: fs.createReadStream(filePath)
            });

            // Success reaction
            if (api && event) {
                api.setMessageReaction("💎", event.messageID, () => {}, true);
            }

            // Cleanup after 10 seconds
            setTimeout(() => {
                try {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                } catch (e) {}
            }, 10000);

        } catch(err) {
            console.error("Top command error:", err);
            
            if (api && event) {
                try {
                    api.setMessageReaction("❌", event.messageID, () => {}, true);
                } catch (e) {}
            }
            
            return message.reply("❌ Error generating leaderboard. Please try again later.");
        }
    }
};
