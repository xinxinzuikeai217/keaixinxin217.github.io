document.getElementById('start-button').addEventListener('click', () => {
    const userResponse = confirm('今天有没有好好照顾自己');
    const bgMusic1 = document.getElementById('bg-music1');

    if (userResponse) {
        alert('今天是听话可爱小朋友');
        bgMusic1.play();
        showPage2();
    } else {
        alert('今天是不乖乖的小朋友');
        const nextResponse = confirm('我们好好吃饭，保持开心好不好');
        if (nextResponse) {
            bgMusic1.play();
            showPage2();
        }
    }
});

function showPage2() {
    const bgMusic1 = document.getElementById('bg-music1');
    const bgMusic2 = document.getElementById('bg-music2');

    document.getElementById('page1').classList.add('hidden');
    bgMusic1.pause();
    bgMusic1.currentTime = 0;
    bgMusic2.play();
    document.getElementById('page2').classList.remove('hidden');
    startFireworks();

    setTimeout(() => {
        document.getElementById('second-button').classList.remove('hidden');
    }, 5000);
}

document.getElementById('second-button').addEventListener('click', () => {
    const bgMusic2 = document.getElementById('bg-music2');
    bgMusic2.pause();
    bgMusic2.currentTime = 0;

    document.getElementById('page2').classList.add('hidden');
    document.getElementById('page3').classList.remove('hidden');
    drawOceanScene();
});

function startFireworks() {
    const canvas = document.getElementById('fireworks');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Firework() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
    }

    Firework.prototype.update = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.98;
    };

    Firework.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    };

    let fireworks = [];
    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.push(new Firework());
        fireworks.forEach((firework, index) => {
            firework.update();
            firework.draw();
            if (firework.size < 0.1) {
                fireworks.splice(index, 1);
            }
        });
        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}

const meteorCanvas = document.getElementById('meteor-shower');
const meteorCtx = meteorCanvas.getContext('2d');
meteorCanvas.width = window.innerWidth;
meteorCanvas.height = window.innerHeight;

function Meteor() {
    this.x = Math.random() * meteorCanvas.width;
    this.y = Math.random() * meteorCanvas.height / 2;
    this.length = Math.random() * 80 + 10;
    this.speed = Math.random() * 2 + 2;
    this.opacity = Math.random() * 0.5 + 0.5;
}

Meteor.prototype.draw = function () {
    meteorCtx.beginPath();
    meteorCtx.moveTo(this.x, this.y);
    meteorCtx.lineTo(this.x - this.length, this.y + this.length);
    meteorCtx.strokeStyle = 'rgba(255, 255, 255,' + this.opacity + ')';
    meteorCtx.lineWidth = 2;
    meteorCtx.stroke();
};

Meteor.prototype.update = function () {
    this.x -= this.speed;
    this.y += this.speed;
    if (this.x < 0 || this.y > meteorCanvas.height) {
        this.x = Math.random() * meteorCanvas.width;
        this.y = Math.random() * meteorCanvas.height / 2;
    }
    this.draw();
};

const meteors = [];
for (let i = 0; i < 50; i++) {
    meteors.push(new Meteor());
}

function animateMeteors() {
    meteorCtx.clearRect(0, 0, meteorCanvas.width, meteorCanvas.height);
    meteors.forEach(meteor => meteor.update());
    requestAnimationFrame(animateMeteors);
}

animateMeteors();

function drawOceanScene() {
    const canvas = document.getElementById('ocean-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 绘制大海背景
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

    // 绘制城堡
    ctx.fillStyle = 'sandybrown';
    ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 - 200, 200, 200);

    // 绘制彩虹
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'orange');
    gradient.addColorStop(0.4, 'yellow');
    gradient.addColorStop(0.6, 'green');
    gradient.addColorStop(0.8, 'blue');
    gradient.addColorStop(1, 'purple');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 50, canvas.width, 150);
}
