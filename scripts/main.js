// Configuration
const CORRECT_NAME = 'shimla';
const EMOJIS = ['💖', '🎉', '🎂', '🎁', '🌸', '💋', '🥳'];
const FIREWORK_COLORS = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

// Initialization
let particles = [];
let audioEnabled = false;

function checkName() {
    const input = document.getElementById('nameInput').value.toLowerCase();
    
    if(input === CORRECT_NAME) {
        showCelebration();
        startAnimations();
        playMusic();
    } else {
        shakeScreen();
    }
}

function showCelebration() {
    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('celebration-screen').classList.add('active');
}

function startAnimations() {
    createParticles();
    createFireworks();
    createEmojiStorm();
    createSprinkles();
    createCandleEffects();
}

function createParticles() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    // Particle class and animation logic from previous example
    // (Include the Particle class and animation loop here)
}

function createFireworks() {
    setInterval(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.backgroundColor = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
        document.querySelector('.fireworks').appendChild(firework);
        setTimeout(() => firework.remove(), 1000);
    }, 1500);
}

function createEmojiStorm() {
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'emoji-float';
        emoji.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        document.querySelector('.emoji-storm').appendChild(emoji);
        setTimeout(() => emoji.remove(), 5000);
    }, 300);
}

function createSprinkles() {
    const colors = ['#FF0000', '#00FF00', '#FFFF00', '#FF00FF'];
    const container = document.querySelector('.sprinkles');
    
    for(let i = 0; i < 50; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(sprinkle);
    }
}

function createCandleEffects() {
    document.querySelectorAll('.candle').forEach(candle => {
        candle.addEventListener('click', () => {
            candle.style.opacity = '0';
            createSmokeEffect(candle);
        });
    });
}

function playMusic() {
    const audio = document.getElementById('background-music');
    audio.volume = 0.5;
    audio.play();
}

function shakeScreen() {
    const loginScreen = document.getElementById('login-screen');
    loginScreen.style.animation = 'shake 0.5s';
    setTimeout(() => loginScreen.style.animation = '', 500);
}

// Initialize particles canvas size
window.addEventListener('resize', () => {
    const canvas = document.getElementById('particles');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
