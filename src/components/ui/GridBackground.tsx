"use client";

import React, { useEffect, useRef } from 'react';

const AnimatedGridBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Colors
    const gridColor = '#252222'; // Raisin Black
    const dotColor = '#FFB400'; // Amber Yellow (matching your Jhyenth color theme)

    // Grid parameters
    const spacing = 250;
    const rows = Math.ceil(canvas.height / spacing);
    const cols = Math.ceil(canvas.width / spacing);

    // Animation parameters
    let dots: {
      x: number;
      y: number;
      radius: number;
      baseRadius: number;
      maxRadius: number;
      glowing: boolean;
      glowValue: number;
      glowSpeed: number;
    }[] = [];

    // Initialize dots
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        dots.push({
          x: j * spacing,
          y: i * spacing,
          radius: 2,
          baseRadius: 2,
          maxRadius: 4,
          glowing: false,
          glowValue: 0,
          glowSpeed: 0.1 + Math.random() * 0.03,
        });
      }
    }

    // Randomly select dots to glow
    const startGlowing = () => {
      const randomIndex = Math.floor(Math.random() * dots.length);
      if (!dots[randomIndex].glowing) {
        dots[randomIndex].glowing = true;
      }

      // Schedule next glow
      setTimeout(startGlowing, 200 + Math.random() * 500);
    };

    // Start animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        ctx.moveTo(i * spacing, 0);
        ctx.lineTo(i * spacing, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let i = 0; i <= rows; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * spacing);
        ctx.lineTo(canvas.width, i * spacing);
        ctx.stroke();
      }

      // Draw and update dots
      dots.forEach(dot => {
        ctx.beginPath();

        if (dot.glowing) {
          dot.glowValue += dot.glowSpeed;

          if (dot.glowValue >= 1) {
            dot.glowValue = 1;
            dot.glowSpeed = -dot.glowSpeed; // Reverse direction
          } else if (dot.glowValue <= 0) {
            dot.glowValue = 0;
            dot.glowing = false;
            dot.glowSpeed = Math.abs(dot.glowSpeed);
          }

          // Calculate current radius and alpha based on glow value
          const currentRadius = dot.baseRadius + (dot.maxRadius - dot.baseRadius) * dot.glowValue;
          const alpha = 0.5 + dot.glowValue * 0.5;

          // Draw glow
          const gradient = ctx.createRadialGradient(
            dot.x, dot.y, currentRadius * 0.5,
            dot.x, dot.y, currentRadius * 3
          );
          gradient.addColorStop(0, `rgba(255, 180, 0, ${alpha})`); // Updated to match your FFB400 theme
          gradient.addColorStop(1, 'rgba(255, 180, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.arc(dot.x, dot.y, currentRadius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw dot
        ctx.beginPath();
        ctx.fillStyle = dotColor;
        ctx.arc(dot.x, dot.y, dot.glowing ? dot.baseRadius + (dot.maxRadius - dot.baseRadius) * dot.glowValue : dot.baseRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    // Start animation and glowing effect
    animate();
    setTimeout(startGlowing, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full"
      aria-hidden="true"
    />
  );
};

export default AnimatedGridBackground;
