document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("canvasBounce");
    const ctx = canvas.getContext("2d");

    const levelLabel = document.getElementById("level");
    const removedLabel = document.getElementById("removed");
    const percentLabel = document.getElementById("percent");
    const remainingLabel = document.getElementById("remaining");

    canvas.width = 600;
    canvas.height = 400;

    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // 🔥 CONFIG
    const TOTAL_CIRCLES = 80;
    const GROUP_SIZE = 10;

    let currentLevel = 1;
    let circles = [];

    let circlesRemovedTotal = 0;
    let circlesRemovedLevel = 0;

    let levelInProgress = true;

    // 🎯 CLICK
    canvas.addEventListener("click", () => {
        circles.forEach(c => {
            if (c.isMouseOver() && !c.isFading && c.opacity > 0) {
                c.isFading = true;

                circlesRemovedTotal++;
                circlesRemovedLevel++;

                updateHUD();
            }
        });
    });

    class Circle {
        constructor(x, y, r, speedMultiplier) {
            this.posX = x;
            this.posY = y;
            this.radius = r;

            this.dy = -(Math.random() * 1 + 0.5) * speedMultiplier;
            this.dx = (Math.random() * 1 - 0.5) * speedMultiplier;

            this.color = "#a70b0b";

            this.opacity = 1;
            this.isFading = false;
        }

        draw() {
            ctx.beginPath();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        move() {
            this.posY += this.dy;
            this.posX += this.dx + Math.sin(this.posY * 0.05) * 0.5;

            // Rebote lateral
            if (this.posX + this.radius > canvas.width || this.posX - this.radius < 0) {
                this.dx *= -1;
            }

            // Si sale arriba
            if (this.posY + this.radius < 0) {
                this.reset();
            }

            // Fade
            if (this.isFading) {
                this.opacity -= 0.02;
                if (this.opacity <= 0) {
                    this.opacity = 0;
                }
            }
        }

        reset() {
            this.posX = Math.random() * (canvas.width - 24) + 12;
            this.posY = canvas.height + Math.random() * 50;
            this.opacity = 1;
            this.isFading = false;
        }

        isMouseOver() {
            let dx = mouseX - this.posX;
            let dy = mouseY - this.posY;
            let dist = Math.sqrt(dx * dx + dy * dy);
            return dist < this.radius;
        }
    }

    function createLevel(level) {
        circles = [];
        circlesRemovedLevel = 0;
        levelInProgress = true;

        let speedMultiplier = 1 + (level * 0.3);

        for (let i = 0; i < GROUP_SIZE; i++) {
            circles.push(new Circle(
                Math.random() * (canvas.width - 24) + 12,
                canvas.height + Math.random() * 200,
                12,
                speedMultiplier
            ));
        }

        levelLabel.textContent = "Nivel " + level;
        updateHUD();
    }

    function nextLevel() {
        if (circlesRemovedTotal >= TOTAL_CIRCLES) {
            alert("🎉 Juego terminado");
            return;
        }

        currentLevel++;
        createLevel(currentLevel);
    }

    function updateHUD() {
        removedLabel.textContent = circlesRemovedTotal;

        let percent = (circlesRemovedTotal / TOTAL_CIRCLES) * 100;
        percentLabel.textContent = percent.toFixed(1) + "%";

        let remaining = GROUP_SIZE - circlesRemovedLevel;
        remaining = Math.max(0, remaining);

        remainingLabel.textContent = remaining;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach(c => {
            c.move();

            if (!c.isFading) {
                if (c.isMouseOver()) {
                    c.color = "#1500ff";
                } else {
                    c.color = "#a70b0b";
                }
            }

            c.draw();
        });

        // 🔥 CAMBIO DE NIVEL CORRECTO
        if (circlesRemovedLevel >= GROUP_SIZE && levelInProgress) {
            levelInProgress = false;
            nextLevel();
        }

        requestAnimationFrame(animate);
    }

    // 🚀 START
    createLevel(currentLevel);
    animate();
});