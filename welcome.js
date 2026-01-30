const {
    createCanvas,
    loadImage,
    Image
} = require('canvas');
const fs = require('fs-extra');
const path = require('path');

// Modern design templates
const templates = [
    {
        name: "Gradient Blur",
        bgColor: '#0f172a',
        colors: ['#6366f1', '#8b5cf6', '#ec4899'],
        style: 'gradient'
    },
    {
        name: "Cyber Grid",
        bgColor: '#000814',
        colors: ['#00f5d4', '#ff006e', '#fb5607'],
        style: 'cyber'
    },
    {
        name: "Neon Glow",
        bgColor: '#1a1a2e',
        colors: ['#00ff88', '#00ccff', '#ff00ff'],
        style: 'neon'
    },
    {
        name: "Sunset Mesh",
        bgColor: '#1e1b4b',
        colors: ['#f97316', '#eab308', '#db2777'],
        style: 'mesh'
    },
    {
        name: "Abstract Waves",
        bgColor: '#0c4a6e',
        colors: ['#38bdf8', '#22d3ee', '#2dd4bf'],
        style: 'wave'
    },
    {
        name: "Matrix Code",
        bgColor: '#000000',
        colors: ['#10b981', '#22c55e', '#84cc16'],
        style: 'matrix'
    },
    {
        name: "Purple Haze",
        bgColor: '#2e1065',
        colors: ['#a855f7', '#d946ef', '#f0abfc'],
        style: 'haze'
    }
];

// Helper functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

function drawRoundRect(ctx, x, y, width, height, radius) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
}

async function drawTemplateBackground(ctx, width, height, template) {
    const { bgColor, colors, style } = template;
    
    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    switch(style) {
        case 'gradient':
            drawGradientBackground(ctx, width, height, colors);
            break;
        case 'cyber':
            drawCyberGrid(ctx, width, height, colors);
            break;
        case 'neon':
            drawNeonGlow(ctx, width, height, colors);
            break;
        case 'mesh':
            drawMeshGradient(ctx, width, height, colors);
            break;
        case 'wave':
            drawWavePattern(ctx, width, height, colors);
            break;
        case 'matrix':
            drawMatrixEffect(ctx, width, height, colors);
            break;
        case 'haze':
            drawPurpleHaze(ctx, width, height, colors);
            break;
    }
}

function drawGradientBackground(ctx, width, height, colors) {
    const gradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height)
    );
    
    gradient.addColorStop(0, `${colors[0]}40`);
    gradient.addColorStop(0.5, `${colors[1]}20`);
    gradient.addColorStop(1, `${colors[2]}10`);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Add blur circles
    for(let i = 0; i < 5; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 150 + 50;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const circleGradient = ctx.createRadialGradient(
            x, y, 0,
            x, y, radius
        );
        circleGradient.addColorStop(0, `${color}20`);
        circleGradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = circleGradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawCyberGrid(ctx, width, height, colors) {
    // Grid lines
    ctx.strokeStyle = `${colors[0]}30`;
    ctx.lineWidth = 1;
    
    // Vertical lines
    for(let x = 0; x <= width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for(let y = 0; y <= height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
    
    // Glowing dots
    for(let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 3 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    // Diagonal lines
    ctx.strokeStyle = `${colors[1]}20`;
    for(let i = -height; i < width * 2; i += 60) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + height, height);
        ctx.stroke();
    }
}

function drawNeonGlow(ctx, width, height, colors) {
    // Multiple glow layers
    const layers = 3;
    
    for(let layer = 0; layer < layers; layer++) {
        const offset = layer * 15;
        const gradient = ctx.createLinearGradient(
            0, offset,
            width, height - offset
        );
        
        gradient.addColorStop(0, `${colors[0]}15`);
        gradient.addColorStop(0.5, `${colors[1]}15`);
        gradient.addColorStop(1, `${colors[2]}15`);
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.3;
        ctx.fillRect(0, 0, width, height);
    }
    
    ctx.globalAlpha = 1;
    
    // Border glow
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 4;
    ctx.shadowColor = colors[0];
    ctx.shadowBlur = 15;
    ctx.strokeRect(20, 20, width - 40, height - 40);
    ctx.shadowBlur = 0;
}

function drawWavePattern(ctx, width, height, colors) {
    // Wave pattern
    ctx.strokeStyle = `${colors[0]}40`;
    ctx.lineWidth = 2;
    
    const waveCount = 8;
    for(let i = 0; i < waveCount; i++) {
        const yPos = (height / waveCount) * i;
        ctx.beginPath();
        for(let x = 0; x <= width; x += 5) {
            const y = yPos + Math.sin(x * 0.02 + i * 0.5) * 15;
            if(x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    
    // Overlay gradient
    const overlay = ctx.createLinearGradient(0, 0, 0, height);
    overlay.addColorStop(0, `${colors[0]}10`);
    overlay.addColorStop(0.5, `${colors[1]}10`);
    overlay.addColorStop(1, `${colors[2]}10`);
    
    ctx.fillStyle = overlay;
    ctx.fillRect(0, 0, width, height);
}

function drawMeshGradient(ctx, width, height, colors) {
    // Create mesh points
    const points = [];
    const gridSize = 50;
    
    for(let x = 0; x <= width; x += gridSize) {
        for(let y = 0; y <= height; y += gridSize) {
            points.push({
                x: x + Math.random() * 20 - 10,
                y: y + Math.random() * 20 - 10,
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        }
    }
    
    // Draw triangles between points
    for(let i = 0; i < points.length - 2; i += 3) {
        if (i + 2 >= points.length) break;
        
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2];
        
        const gradient = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
        gradient.addColorStop(0, `${p1.color}10`);
        gradient.addColorStop(0.5, `${p2.color}10`);
        gradient.addColorStop(1, `${p3.color}10`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.closePath();
        ctx.fill();
    }
}

function drawMatrixEffect(ctx, width, height, colors) {
    // Green code rain effect
    ctx.fillStyle = `${colors[0]}20`;
    ctx.font = '16px "Courier New", monospace';
    
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for(let i = 0; i < 50; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        ctx.fillText(char, x, y);
        
        // Trail effect
        for(let j = 1; j <= 3; j++) {
            ctx.globalAlpha = 0.5 / j;
            ctx.fillText(char, x, y + j * 20);
        }
        ctx.globalAlpha = 1;
    }
}

function drawPurpleHaze(ctx, width, height, colors) {
    // Fog/mist effect
    for(let i = 0; i < 8; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 200 + 100;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        const gradient = ctx.createRadialGradient(
            x, y, 0,
            x, y, radius
        );
        gradient.addColorStop(0, `${color}30`);
        gradient.addColorStop(1, `${color}00`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawTextWithEffects(ctx, text, x, y, colors, effect = 'gradient') {
    const baseFont = 'bold 42px "Segoe UI", "Arial", sans-serif';
    ctx.font = baseFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    switch(effect) {
        case 'gradient':
            const gradient = ctx.createLinearGradient(x - 150, y, x + 150, y);
            gradient.addColorStop(0, colors[0]);
            gradient.addColorStop(0.5, colors[1]);
            gradient.addColorStop(1, colors[2]);
            ctx.fillStyle = gradient;
            ctx.fillText(text, x, y);
            break;
            
        case 'glow':
            ctx.shadowColor = colors[0];
            ctx.shadowBlur = 15;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, x, y);
            ctx.shadowBlur = 0;
            break;
            
        case 'stroke':
            ctx.strokeStyle = colors[0];
            ctx.lineWidth = 3;
            ctx.strokeText(text, x, y);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, x, y);
            break;
            
        default:
            ctx.fillStyle = colors[0];
            ctx.fillText(text, x, y);
            break;
    }
}

async function createModernWelcome(gcImg, userImg, adderImg, userName, userNumber, threadName, adderName) {
    const width = 1200;
    const height = 650;
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Random template selection
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    // Draw template background
    await drawTemplateBackground(ctx, width, height, template);
    
    // Load all images
    let gcImage, userImage, adderImage;
    
    try {
        gcImage = await loadImage(gcImg);
    } catch {
        gcImage = null;
    }
    
    try {
        userImage = await loadImage(userImg);
    } catch {
        userImage = null;
    }
    
    try {
        adderImage = await loadImage(adderImg);
    } catch {
        adderImage = null;
    }
    
    // Choose random layout
    const layout = Math.floor(Math.random() * 3);
    
    if (layout === 0) {
        // Layout 1: Centered Design
        // Group icon at top
        if (gcImage) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(width / 2, 140, 70, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(gcImage, width / 2 - 70, 70, 140, 140);
            ctx.restore();
            
            // Border
            ctx.strokeStyle = template.colors[0];
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(width / 2, 140, 74, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Welcome text
        ctx.font = 'bold 56px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = template.colors[1];
        ctx.textAlign = 'center';
        ctx.fillText('WELCOME', width / 2, 240);
        
        // User name
        drawTextWithEffects(ctx, userName, width / 2, 310, template.colors, 'gradient');
        
        // To group
        ctx.font = '28px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#e2e8f0';
        ctx.fillText(`to ${threadName}`, width / 2, 370);
        
        // User and adder images
        if (userImage) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(180, 520, 50, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(userImage, 130, 470, 100, 100);
            ctx.restore();
        }
        
        if (adderImage) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(width - 180, 520, 45, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(adderImage, width - 225, 475, 90, 90);
            ctx.restore();
        }
        
        // Info text
        ctx.font = '22px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = template.colors[2];
        ctx.fillText(`Member #${userNumber} • Added by ${adderName}`, width / 2, 480);
        
    } else if (layout === 1) {
        // Layout 2: Side Design
        // Left side - Group info
        if (gcImage) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(150, height / 2, 80, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(gcImage, 70, height / 2 - 80, 160, 160);
            ctx.restore();
        }
        
        // Right side - User info
        ctx.textAlign = 'left';
        ctx.fillStyle = template.colors[0];
        ctx.font = 'bold 20px "Segoe UI", Arial, sans-serif';
        ctx.fillText('NEW MEMBER JOINED', 350, 180);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 48px "Segoe UI", Arial, sans-serif';
        ctx.fillText(userName, 350, 250);
        
        ctx.fillStyle = template.colors[1];
        ctx.font = '28px "Segoe UI", Arial, sans-serif';
        ctx.fillText(threadName, 350, 310);
        
        // User image
        if (userImage) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(850, 280, 60, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(userImage, 790, 220, 120, 120);
            ctx.restore();
        }
        
        // Info box at bottom
        ctx.fillStyle = `${template.colors[2]}30`;
        drawRoundRect(ctx, 50, height - 100, width - 100, 80, 15);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(`#${userNumber}`, width / 3, height - 55);
        ctx.fillText(adderName, width * 2/3, height - 55);
        
        ctx.font = '18px "Segoe UI", Arial, sans-serif';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('MEMBER', width / 3, height - 85);
        ctx.fillText('ADDED BY', width * 2/3, height - 85);
        
    } else {
        // Layout 3: Card Design
        // Main card
        ctx.fillStyle = '#1e293b80';
        drawRoundRect(ctx, 80, 80, width - 160, height - 160, 25);
        ctx.fill();
        
        // Card border
        ctx.strokeStyle = template.colors[0];
        ctx.lineWidth = 3;
        drawRoundRect(ctx, 80, 80, width - 160, height - 160, 25);
        ctx.stroke();
        
        // Welcome badge
        ctx.fillStyle = template.colors[1];
        drawRoundRect(ctx, width / 2 - 100, 120, 200, 45, 22);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎉 WELCOME 🎉', width / 2, 150);
        
        // User image
        if (userImage) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(width / 2, 260, 70, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(userImage, width / 2 - 70, 190, 140, 140);
            ctx.restore();
        }
        
        // User name
        drawTextWithEffects(ctx, userName, width / 2, 370, template.colors, 'glow');
        
        // Group name
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '24px "Segoe UI", Arial, sans-serif';
        ctx.fillText(`to ${threadName}`, width / 2, 420);
        
        // Info box
        ctx.fillStyle = '#0f172a60';
        drawRoundRect(ctx, 150, 470, width - 300, 70, 15);
        ctx.fill();
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '20px "Segoe UI", Arial, sans-serif';
        ctx.fillText(`Member #${userNumber}`, width / 3, 510);
        ctx.fillText(`Added by ${adderName}`, width * 2/3, 510);
    }
    
    // Template name watermark
    ctx.fillStyle = '#ffffff30';
    ctx.font = '12px "Segoe UI", Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`Design: ${template.name}`, width - 15, height - 15);
    
    return canvas.toBuffer();
}

module.exports = {
    config: {
        name: "welcome",
        version: "3.0",
        author: "Azadx69x",
        category: "events"
    },

    onStart: async ({ threadsData, event, message, usersData }) => {
        const type = "log:subscribe";
        if (event.logMessageType !== type) return;
        
        try {
            // Get thread ID and user info
            const threadID = event.threadID;
            const addedUser = event.logMessageData.addedParticipants[0];
            const addedUserId = addedUser.userFbId;
            const adderId = event.author;
            
            // Fetch all data
            const [threadInfo, userAvatar, adderAvatar, adderName] = await Promise.all([
                threadsData.get(threadID),
                usersData.getAvatarUrl(addedUserId),
                usersData.getAvatarUrl(adderId),
                usersData.getName(adderId)
            ]);
            
            const userName = addedUser.fullName;
            const groupImage = threadInfo.imageSrc || 'https://i.imgur.com/7Qk8k6c.png';
            const threadName = threadInfo.threadName || "Group Chat";
            const memberCount = threadInfo.members?.length || 1;
            
            // Create welcome image
            const imageBuffer = await createModernWelcome(
                groupImage,
                userAvatar,
                adderAvatar,
                userName,
                memberCount,
                threadName,
                adderName
            );
            
            // Save temporary file
            const tempDir = path.join(__dirname, '..', '..', 'temp');
            await fs.ensureDir(tempDir);
            const tempPath = path.join(tempDir, `welcome_${Date.now()}.png`);
            
            fs.writeFileSync(tempPath, imageBuffer);
            
            // Send message with image
            await message.reply({
                body: `✨ Welcome ${userName} to ${threadName}! ✨\nYou are member #${memberCount}! 🎉`,
                attachment: fs.createReadStream(tempPath)
            });
            
            // Cleanup after 5 seconds
            setTimeout(() => {
                if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                }
            }, 5000);
            
        } catch (error) {
            console.error('[WELCOME ERROR]:', error);
            
            // Simple fallback welcome
            const addedUser = event.logMessageData.addedParticipants[0];
            await message.send(
                `🎉 Welcome ${addedUser.fullName} to the group! 🎉\n` +
                `We're excited to have you here! 😊`
            );
        }
    }
};
