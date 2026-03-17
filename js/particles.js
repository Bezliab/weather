const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];
let animFrame;
let lightningTimer = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(type) {
    this.type = type;
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = this.type === "snow" ? Math.random() * canvas.height : -10;
    this.size =
      Math.random() * (this.type === "rain" ? 1.5 : 4) +
      (this.type === "rain" ? 0.5 : 1);
    this.speed =
      Math.random() *
        (this.type === "rain" ? 14 : this.type === "snow" ? 1.2 : 2) +
      (this.type === "rain" ? 8 : 0.5);
    this.drift = (Math.random() - 0.5) * (this.type === "rain" ? 1 : 0.6);
    this.opacity = Math.random() * 0.55 + 0.25;
    this.length = this.type === "rain" ? Math.random() * 12 + 8 : 0;
  }

  update() {
    this.y += this.speed;
    this.x += this.drift;

    if (
      this.y > canvas.height + 20 ||
      this.x < -10 ||
      this.x > canvas.width + 10
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.globalAlpha = this.opacity;

    if (this.type === "rain") {
      ctx.strokeStyle = "rgba(180,210,255,0.7)";
      ctx.lineWidth = this.size;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + this.drift * 2, this.y + this.length);
      ctx.stroke();
    } else if (this.type === "snow") {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "star") {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === "mist") {
      const gradient = ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size * 18,
      );
      gradient.addColorStop(0, "rgba(255,255,255,0.04)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 18, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }
}

function drawLightning() {
  lightningTimer -= 1;

  if (lightningTimer <= 0) {
    lightningTimer = Math.random() * 180 + 60;
    ctx.fillStyle = "rgba(200,180,255,0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const x = Math.random() * canvas.width;
    ctx.strokeStyle = "rgba(220,200,255,0.8)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "#b388ff";
    ctx.shadowBlur = 12;
    ctx.beginPath();

    let currentY = 0;
    let currentX = x;

    while (currentY < canvas.height * 0.7) {
      const nextX = currentX + (Math.random() - 0.5) * 80;
      const nextY = currentY + Math.random() * 60 + 20;
      ctx.lineTo(nextX, nextY);
      currentX = nextX;
      currentY = nextY;
    }

    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function setParticles(sky) {
  cancelAnimationFrame(animFrame);
  particles = [];

  const map = {
    rain: { type: "rain", count: 160 },
    snow: { type: "snow", count: 90 },
    clear: { type: "star", count: 80 },
    fog: { type: "mist", count: 30 },
    thunder: { type: "rain", count: 200 },
    clouds: { type: null, count: 0 },
    wind: { type: null, count: 0 },
  };

  const config = map[sky] || { type: null, count: 0 };

  if (config.type) {
    for (let i = 0; i < config.count; i += 1) {
      particles.push(new Particle(config.type));
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (sky === "thunder") {
      drawLightning();
    }

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    animFrame = requestAnimationFrame(loop);
  }

  loop();
}
