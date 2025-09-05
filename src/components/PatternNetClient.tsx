"use client";

import { useEffect, useRef } from "react";

export default function PatternNetClient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number | null>(null);

  // mouse target (raw) and eased mouse used for drawing
  const mouseTarget = useRef({ x: -9999, y: -9999 });
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // safe early exit — TS knows canvas may be null here

    // get and store context (guarded)
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // size the canvas using DPR so it looks crisp
    function setSize() {
      const c = canvasRef.current;
      const context = ctxRef.current;
      if (!c || !context) return;
      const width = Math.round(window.innerWidth * dpr);
      const height = Math.round(window.innerHeight * dpr);
      c.width = width;
      c.height = height;
      // style size in CSS pixels
      c.style.width = `${window.innerWidth}px`;
      c.style.height = `${window.innerHeight}px`;
      // scale drawing so we can use CSS px coordinates
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    setSize();

    const gridSize = 40; // spacing in px (CSS px)
    const radiusVert = 150;
    const strengthVert = 0.5;
    const radiusHorz = 200;
    const strengthHorz = 0.1;
    const ease = 0.18; // easing for mouse (0..1)

    function drawOnce() {
      const c = canvasRef.current;
      const ctxLocal = ctxRef.current;
      if (!c || !ctxLocal) return;

      // clear using CSS-pixel dimensions
      ctxLocal.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctxLocal.strokeStyle = "#1e1e1e";
      ctxLocal.lineWidth = 1;

      // vertical pass (x increments -> lines downwards)
      for (let x = 0; x <= window.innerWidth; x += gridSize) {
        ctxLocal.beginPath();
        for (let y = 0; y <= window.innerHeight; y += gridSize) {
          const dx = mouse.current.x - x;
          const dy = mouse.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

          let offsetX = 0;
          let offsetY = 0;

          if (dist < radiusVert) {
            const force = (radiusVert - dist) / radiusVert;
            offsetX = (dx / dist) * force * strengthVert * gridSize;
            offsetY = (dy / dist) * force * strengthVert * gridSize;
          }

          const warpedX = x - offsetX;
          const warpedY = y - offsetY;

          if (y === 0) ctxLocal.moveTo(warpedX, warpedY);
          else ctxLocal.lineTo(warpedX, warpedY);
        }
        ctxLocal.stroke();
      }

      // horizontal pass (y increments -> lines across)
      for (let y = 0; y <= window.innerHeight; y += gridSize) {
        ctxLocal.beginPath();
        for (let x = 0; x <= window.innerWidth; x += gridSize) {
          const dx = mouse.current.x - x;
          const dy = mouse.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;

          let offsetX = 0;
          let offsetY = 0;

          if (dist < radiusHorz) {
            const force = (radiusHorz - dist) / radiusHorz;
            offsetX = (dx / dist) * force * strengthHorz * gridSize;
            offsetY = (dy / dist) * force * strengthHorz * gridSize;
          }

          const warpedX = x - offsetX;
          const warpedY = y - offsetY;

          if (x === 0) ctxLocal.moveTo(warpedX, warpedY);
          else ctxLocal.lineTo(warpedX, warpedY);
        }
        ctxLocal.stroke();
      }
    }

    // animation loop
    function animate() {
      // ease mouse toward the target
      mouse.current.x += (mouseTarget.current.x - mouse.current.x) * ease;
      mouse.current.y += (mouseTarget.current.y - mouse.current.y) * ease;

      drawOnce();
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    // mouse handlers
    function handleMouseMove(e: MouseEvent) {
      mouseTarget.current.x = e.clientX;
      mouseTarget.current.y = e.clientY;
    }
    function handleMouseLeave() {
      // push offscreen so it relaxes back
      mouseTarget.current.x = -9999;
      mouseTarget.current.y = -9999;
    }

    function handleResize() {
      setSize();
      // immediately draw once to avoid a blank frame after resize
      drawOnce();
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      // clear refs
      ctxRef.current = null;
    };
  }, []); // run once

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden
    />
  );
}