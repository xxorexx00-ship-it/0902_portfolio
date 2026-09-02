// =========================================
// Sakura Animation
// =========================================

const canvas = document.getElementById("sakura-canvas");
const ctx = canvas.getContext("2d");

let width;
let height;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();


// =========================================
// Scroll Wind
// =========================================

let wind = 0;
let targetWind = 0;

window.addEventListener("scroll", () => {
    targetWind = Math.sin(window.scrollY * 0.003) * 2;
});


// =========================================
// Gust Wind
// =========================================

let gustWind = 0;
let gustTarget = 0;

function startGust() {
    gustTarget = (Math.random() * 3 + 4) * (Math.random() > 0.5 ? 1 : -1);

    setTimeout(() => {
        gustTarget = 0;
    }, 2500 + Math.random() * 1500);

    setTimeout(startGust, 6000 + Math.random() * 9000);
}

setTimeout(startGust, 5000);


// =========================================
// Sakura Class
// =========================================

class Sakura {

    constructor() {
        this.reset(true);
    }

    reset(first = false) {
        this.layer = Math.floor(Math.random() * 3);

        if (this.layer === 0) {
            this.scale = 0.6;
        } else if (this.layer === 1) {
            this.scale = 1;
        } else {
            this.scale = 1.5;
        }

        this.type = Math.floor(Math.random() * 3);

        this.x = Math.random() * width;
        this.y = first
            ? Math.random() * height
            : -20 - Math.random() * 120;

        this.size = (8 + Math.random() * 12) * this.scale;
        this.speedY = (1 + Math.random() * 2) * this.scale;
        this.speedX = (-0.8 + Math.random() * 1.6) * this.scale;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotateSpeed = (-0.02 + Math.random() * 0.04) * this.scale;
        this.swing = Math.random() * Math.PI * 2;
        this.swingSpeed = (0.01 + Math.random() * 0.03) * this.scale;

        this.alpha =
            this.layer === 0 ? 0.35 :
            this.layer === 1 ? 0.6 :
            0.85;

        this.flip = Math.random() * Math.PI * 2;
        this.flipSpeed = (0.03 + Math.random() * 0.05) * this.scale;
    }

    update() {
        this.swing += this.swingSpeed;
        this.flip += this.flipSpeed;

        const totalWind = wind + gustWind;

        this.x +=
            this.speedX +
            Math.sin(this.swing) * this.scale +
            totalWind * this.scale;

        this.y +=
            this.speedY +
            Math.abs(totalWind) * 0.15 * this.scale +
            Math.sin(this.flip) * 0.25;

        this.rotation +=
            this.rotateSpeed +
            totalWind * 0.01;

        if (
            this.y > height + 50 ||
            this.x < -80 ||
            this.x > width + 80
        ) {
            this.reset();
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const flipScale = Math.cos(this.flip);
        ctx.scale(flipScale, 1);

        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = flipScale > 0 ? "#ffd9e6" : "#f8b6c8";

        if (this.layer === 2) {
            ctx.shadowColor = "#ffd8e5";
            ctx.shadowBlur = 8;
        } else {
            ctx.shadowBlur = 0;
        }

        switch (this.type) {
            case 0:
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.bezierCurveTo(this.size, -this.size, this.size, this.size * 0.3, 0, this.size);
                ctx.bezierCurveTo(-this.size, this.size * 0.3, -this.size, -this.size, 0, -this.size);
                ctx.fill();
                break;

            case 1:
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.quadraticCurveTo(this.size * 1.1, -this.size * 0.3, this.size * 0.4, this.size);
                ctx.quadraticCurveTo(0, this.size * 0.7, -this.size * 0.4, this.size);
                ctx.quadraticCurveTo(-this.size * 1.1, -this.size * 0.3, 0, -this.size);
                ctx.fill();
                break;

            case 2:
                ctx.beginPath();
                ctx.moveTo(0, -this.size);
                ctx.bezierCurveTo(this.size * 0.7, -this.size * 0.9, this.size * 1.2, this.size * 0.2, 0, this.size);
                ctx.bezierCurveTo(-this.size * 1.2, this.size * 0.2, -this.size * 0.7, -this.size * 0.9, 0, -this.size);
                ctx.fill();
                break;
        }

        ctx.restore();
    }
}


// =========================================
// Sakura Generate
// =========================================

const sakuras = [];
const COUNT = 120;

for (let i = 0; i < COUNT; i++) {
    sakuras.push(new Sakura());
}


// =========================================
// Animation
// =========================================

function animate() {
    wind += (targetWind - wind) * 0.03;
    gustWind += (gustTarget - gustWind) * 0.03;

    ctx.clearRect(0, 0, width, height);

    for (const sakura of sakuras) {
        sakura.update();
        sakura.draw();
    }

    requestAnimationFrame(animate);
}

animate();