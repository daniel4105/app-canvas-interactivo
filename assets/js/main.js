document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("canvasBounce");
    let ctx = canvas.getContext("2d");

    const range = document.getElementById("rangeCircles");
    const input = document.getElementById("inputCircles");
    const label = document.getElementById("valueCircles");

    canvas.width = 600;
    canvas.height = 400;

    let mouseX = 0;
    let mouseY = 0;

    canvas.addEventListener("mousemove", (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // 👇 CLICK para desaparecer
    canvas.addEventListener("click", () => {
        circles.forEach(c => {
            if (c.isMouseOver()) {
                c.isFading = true;
            }
        });
    });

    class Circle {
        constructor(x, y, r) {
            this.posX = x;
            this.posY = y;
            this.radius = r;

            // Movimiento vertical lento hacia arriba
            this.dy = -(Math.random() * 1 + 0.5);

            this.color = "#a70b0b";

            // Fade
            this.opacity = 1;
            this.isFading = false;
        }

        draw() {
            ctx.beginPath();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1; // reset
        }

        move() {
            this.posY += this.dy;

            // Si sale por arriba, reaparece abajo
            if (this.posY + this.radius < 0) {
                this.reset();
            }

            // Fade out
            if (this.isFading) {
                this.opacity -= 0.02;
                if (this.opacity <= 0) {
                    this.reset();
                }
            }
        }

        reset() {
            this.posX = Math.random() * (canvas.width - 24) + 12;
            this.posY = canvas.height + Math.random() * 50; // abajo del canvas
            this.opacity = 1;
            this.isFading = false;
            this.color = "#a70b0b";
        }

        isMouseOver() {
            let dx = mouseX - this.posX;
            let dy = mouseY - this.posY;
            let dist = Math.sqrt(dx * dx + dy * dy);
            return dist < this.radius;
        }
    }

    let circles = [];

    function createCircles(n) {
        circles = [];

        for (let i = 0; i < n; i++) {
            circles.push(new Circle(
                Math.random() * (canvas.width - 24) + 12,
                canvas.height + Math.random() * 200, // empiezan fuera
                12
            ));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        circles.forEach(c => {
            c.move();

            // Hover
            if (c.isMouseOver()) {
                c.color = "#00ffcc";
            } else {
                c.color = "#a70b0b";
            }

            c.draw();
        });

        requestAnimationFrame(animate);
    }

    function updateValue(val) {
        val = parseInt(val);

        label.textContent = val;
        range.value = val;
        input.value = val;

        createCircles(val);
    }

    range.addEventListener("input", e => {
        updateValue(e.target.value);
    });

    input.addEventListener("input", e => {
        let val = Math.max(1, Math.min(30, parseInt(e.target.value)));
        updateValue(val);
    });

    updateValue(8);
    animate();
});