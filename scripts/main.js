const CORRECT_NAME = 'shimla';
const EMOJIS = ['🎉', '💖', '🎂', '🎁', '🌸', '💋', '🥳'];
let particles = [];
let audio;

function checkName() {
    const input = document.getElementById('nameInput').value.trim().toLowerCase();
    
    if(input === CORRECT_NAME) {
        showCelebration();
        startAnimations();
        playMusic();
    } else {
        shakeScreen();
    }
}

function showCelebration() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('celebration-screen').style.display = 'block';
}

function startAnimations() {
    createParticles();
    createEmojiRain();
    createSparkles();
}

function createParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if(this.x > canvas.width) this.x = 0;
            if(this.x < 0) this.x = canvas.width;
            if(this.y > canvas.height) this.y = 0;
            if(this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for(let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function createEmojiRain() {
    const container = document.querySelector('.emoji-rain');
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.animationDuration = Math.random() * 3 + 2 + 's';
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 5000);
    }, 300);
}

function createSparkles() {
    const cake = document.querySelector('.birthday-cake');
    for(let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle ${1 + Math.random() * 2}s infinite;
        `;
        cake.appendChild(sparkle);
    }
}

function playMusic() {
    audio = new Howl({
        src: ['assets/audio/birthday-music.mp3'],
        volume: 0.5,
        loop: true,
        html5: true
    });
    audio.play();
}

function shakeScreen() {
    const loginScreen = document.getElementById('login-screen');
    loginScreen.style.animation = 'shake 0.5s';
    setTimeout(() => loginScreen.style.animation = '', 500);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-15px); }
        50% { transform: translateX(15px); }
        75% { transform: translateX(-10px); }
        100% { transform: translateX(0); }
    }
    
    @keyframes sparkle {
        0% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0); }
    }
`;
document.head.appendChild(style);

// Handle window resize
window.addEventListener('resize', () => {
    const canvas = document.getElementById('particles-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Initialize
window.onload = () => {
    document.getElementById('celebration-screen').style.display = 'none';
};
