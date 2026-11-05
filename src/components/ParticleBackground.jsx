import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ count = 40, colors = ['#f5a7be', '#d4a574', '#c4869c', '#fce7f3'] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 4 + 1;
        this.speedY = -(Math.random() * 0.8 + 0.3);
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.005;
        this.type = Math.random() > 0.6 ? 'circle' : (Math.random() > 0.5 ? 'heart' : 'star');
      }

      drawHeart(x, y, size) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.3);
        ctx.bezierCurveTo(size * 0.5, -size, size, -size * 0.3, size * 0.5, size * 0.3);
        ctx.bezierCurveTo(size * 0.5, size * 0.3, 0, size * 0.7, 0, size * 0.7);
        ctx.bezierCurveTo(0, size * 0.7, -size * 0.5, size * 0.3, -size * 0.5, size * 0.3);
        ctx.bezierCurveTo(-size, -size * 0.3, -size * 0.5, -size, 0, -size * 0.3);
        ctx.closePath();
        ctx.restore();
      }

      drawStar(x, y, size) {
        const spikes = 4;
        const outerR = size;
        const innerR = size * 0.4;
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const r = i % 2 === 0 ? outerR : innerR;
          const angle = (i * Math.PI) / spikes - Math.PI / 2;
          i === 0 ? ctx.moveTo(r * Math.cos(angle), r * Math.sin(angle))
                  : ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
        }
        ctx.closePath();
        ctx.restore();
      }

      update() {
        this.wobble += this.wobbleSpeed;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.opacity -= 0.001;
        if (this.y < -50 || this.opacity <= 0) this.reset();
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if (this.type === 'heart') {
          this.drawHeart(this.x, this.y, this.size * 1.5);
        } else if (this.type === 'star') {
          this.drawStar(this.x, this.y, this.size);
        } else {
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < count; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height; // distribute initially
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default ParticleBackground;
