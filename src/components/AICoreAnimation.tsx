"use client";

import { useEffect, useRef } from "react";

export function AICoreAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 440);
    let height = (canvas.height = canvas.offsetHeight || 440);

    // Initialize mouse target to center
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 440;
      height = canvas.height = canvas.offsetHeight || 440;
    };

    window.addEventListener("resize", handleResize);

    // Setup 3D Geometry: Outer Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Find icosahedron edges
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - 2.0) < 0.1) {
          edges.push([i, j]);
        }
      }
    }

    // Setup 3D Geometry: Inner Octahedron
    const innerVertices: [number, number, number][] = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ];
    const innerEdges: [number, number][] = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [2, 5], [3, 4], [3, 5]
    ];

    const coreScale = 90;
    const innerScale = 45;

    // Particles (Floating Neural Net Grid)
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
    }
    const particleCount = 40;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.4 + 0.2
      });
    }

    // 3D rotation parameters
    let angleX = 0.0035;
    let angleY = 0.005;
    let angleZ = 0.002;

    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      time += 0.01;

      const mouse = mouseRef.current;
      const dx = mouse.targetX - mouse.x;
      const dy = mouse.targetY - mouse.y;
      
      // Smoothly interpolate mouse position
      mouse.x += dx * 0.08;
      mouse.y += dy * 0.08;

      const centerX = width / 2;
      const centerY = height / 2;
      const offsetX = (mouse.x - centerX) / (width / 2 || 1);
      const offsetY = (mouse.y - centerY) / (height / 2 || 1);

      // Rotate speed drifts slightly with mouse parallax
      rotX += angleX + offsetY * 0.0015;
      rotY += angleY + offsetX * 0.0015;
      rotZ += angleZ;

      // --- 1. Background Grid scan lines / Radial Ambient glows ---
      const glowPulse = Math.sin(time * 3.5) * 6;
      const radGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 150 + glowPulse);
      radGlow.addColorStop(0, "rgba(57, 255, 20, 0.22)");
      radGlow.addColorStop(0.35, "rgba(57, 255, 20, 0.08)");
      radGlow.addColorStop(0.7, "rgba(34, 197, 94, 0.015)");
      radGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = radGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2);
      ctx.fill();

      // --- 2. Neural Net Particles and Interactive Connections ---
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce back within boundaries with a slight buffer
        if (p1.x < 10 || p1.x > width - 10) p1.vx *= -1;
        if (p1.y < 10 || p1.y > height - 10) p1.vy *= -1;

        // Draw connections
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const distx = p1.x - p2.x;
          const disty = p1.y - p2.y;
          const dist = Math.sqrt(distx * distx + disty * disty);
          if (dist < 85) {
            const alpha = (1 - dist / 85) * 0.12;
            ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Mouse connection & interaction
        if (mouse.active) {
          const distx = p1.x - mouse.x;
          const disty = p1.y - mouse.y;
          const dist = Math.sqrt(distx * distx + disty * disty);
          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.22;
            ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();

            // Dynamic soft gravity towards cursor
            p1.vx += distx * -0.00008;
            p1.vy += disty * -0.00008;
          }
        }

        // Draw particle
        ctx.fillStyle = `rgba(57, 255, 20, ${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 3. Outer HUD Orbits and Tilted Scifi Rings ---
      const draw3DRing = (
        radius: number, 
        rotAngleX: number, 
        rotAngleY: number, 
        dashStyle: number[], 
        speed: number, 
        alpha: number
      ) => {
        const segments = 90;
        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(dashStyle);
        ctx.beginPath();

        const currentRotY = rotY * speed;

        for (let i = 0; i <= segments; i++) {
          const theta = (i / segments) * Math.PI * 2;
          const x = radius * Math.cos(theta);
          const y = 0;
          const z = radius * Math.sin(theta);

          // Apply 3D Rotation on Flat Plane
          const cosY = Math.cos(currentRotY);
          const sinY = Math.sin(currentRotY);
          let rx = x * cosY - z * sinY;
          let rz = x * sinY + z * cosY;

          const cosX = Math.cos(rotAngleX);
          const sinX = Math.sin(rotAngleX);
          let ry = y * cosX - rz * sinX;
          let rz2 = y * sinX + rz * cosX;

          // Projection
          const fov = 400;
          const perspective = fov / (fov + rz2);
          const screenX = centerX + rx * perspective;
          const screenY = centerY + ry * perspective;

          if (i === 0) ctx.moveTo(screenX, screenY);
          else ctx.lineTo(screenX, screenY);

          // Draw orbital data packets at periodic angles
          if (i % 15 === 0 && i !== 0) {
            ctx.fillStyle = `rgba(57, 255, 20, ${alpha * 2})`;
            ctx.beginPath();
            ctx.arc(screenX, screenY, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };

      // Tilted cybernetic rings
      draw3DRing(140, Math.PI / 4, Math.PI / 6, [6, 18], 0.4, 0.16);
      draw3DRing(185, -Math.PI / 3.5, Math.PI / 3, [35, 15, 5, 15], -0.3, 0.12);
      draw3DRing(230, Math.PI / 5, -Math.PI / 4, [100, 25], 0.15, 0.08);

      // --- 4. 3D Geometric Projections: Outer Core & Inner Core ---
      
      // Project vertices to 2D
      const projectShape = (
        verts: [number, number, number][], 
        scale: number, 
        rotationX: number, 
        rotationY: number, 
        rotationZ: number
      ) => {
        const projected: { x: number; y: number; z: number }[] = [];
        const cX = Math.cos(rotationX);
        const sX = Math.sin(rotationX);
        const cY = Math.cos(rotationY);
        const sY = Math.sin(rotationY);
        const cZ = Math.cos(rotationZ);
        const sZ = Math.sin(rotationZ);

        verts.forEach(([vx, vy, vz]) => {
          let x = vx * scale;
          let y = vy * scale;
          let z = vz * scale;

          // Y Rotation
          let x1 = x * cY - z * sY;
          let z1 = x * sY + z * cY;

          // X Rotation
          let y2 = y * cX - z1 * sX;
          let z2 = y * sX + z1 * cX;

          // Z Rotation
          let x3 = x1 * cZ - y2 * sZ;
          let y3 = x1 * sZ + y2 * cZ;

          // Perspective
          const fov = 400;
          const perspective = fov / (fov + z2);

          projected.push({
            x: centerX + x3 * perspective,
            y: centerY + y2 * perspective,
            z: z2
          });
        });
        return projected;
      };

      const outerProjected = projectShape(vertices, coreScale, rotX, rotY, rotZ);
      const innerProjected = projectShape(innerVertices, innerScale, -rotX * 1.5, -rotY * 1.5, -rotZ * 1.5);

      // --- Draw Outer Wireframe ---
      edges.forEach(([u, v]) => {
        const p1 = outerProjected[u];
        const p2 = outerProjected[v];

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, Math.min(0.85, 0.42 - avgZ / (coreScale * 2.5)));
        
        // 1. Edge Glow
        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.28})`;
        ctx.lineWidth = avgZ < 0 ? 3.5 : 2.0;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // 2. High-Tech Thin Core Line
        ctx.strokeStyle = `rgba(124, 255, 106, ${alpha * 0.85})`;
        ctx.lineWidth = avgZ < 0 ? 1.4 : 0.8;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // --- Draw Inner Wireframe (Opposite Rotation) ---
      innerEdges.forEach(([u, v]) => {
        const p1 = innerProjected[u];
        const p2 = innerProjected[v];

        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.9, 0.5 - avgZ / (innerScale * 2)));

        // Double draw for glow
        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.2})`;
        ctx.lineWidth = avgZ < 0 ? 4.0 : 2.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        ctx.lineWidth = avgZ < 0 ? 1.5 : 0.75;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // --- Draw Outer Nodes ---
      outerProjected.forEach((p) => {
        const size = p.z < 0 ? 3.5 : 2.0;
        const alpha = Math.max(0.3, Math.min(1.0, 0.65 - p.z / (coreScale * 2)));

        ctx.strokeStyle = `rgba(57, 255, 20, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 2.2, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(57, 255, 20, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- Draw Inner Nodes ---
      innerProjected.forEach((p) => {
        const size = p.z < 0 ? 3.0 : 1.8;
        const alpha = Math.max(0.4, Math.min(1.0, 0.7 - p.z / (innerScale * 2)));

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // --- 5. Central Pulsating Quantum Nucleus ---
      const plasmaRadius = 26 + Math.sin(time * 5.5) * 3.5;
      const plasmaGlow = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, plasmaRadius);
      plasmaGlow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
      plasmaGlow.addColorStop(0.2, "rgba(124, 255, 106, 0.9)");
      plasmaGlow.addColorStop(0.55, "rgba(57, 255, 20, 0.45)");
      plasmaGlow.addColorStop(1, "rgba(57, 255, 20, 0)");
      ctx.fillStyle = plasmaGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, plasmaRadius, 0, Math.PI * 2);
      ctx.fill();

      // --- 6. Futuristic HUD Elements & Calibration Systems ---
      // Top-Left Reticle
      ctx.strokeStyle = "rgba(57, 255, 20, 0.3)";
      ctx.lineWidth = 1;
      const boxX = 25;
      const boxY = 25;
      ctx.beginPath();
      ctx.moveTo(boxX + 12, boxY);
      ctx.lineTo(boxX, boxY);
      ctx.lineTo(boxX, boxY + 12);
      ctx.stroke();

      ctx.font = "8px 'JetBrains Mono', Courier, monospace";
      ctx.fillStyle = "rgba(57, 255, 20, 0.55)";
      ctx.fillText("CORE ENGINE // STABLE v2.0", boxX + 6, boxY - 6);
      ctx.fillText(`ROT_MATRIX: [${offsetX.toFixed(2)}, ${offsetY.toFixed(2)}]`, boxX + 6, boxY + 8);
      ctx.fillText(`EFF: ${(98.4 + Math.sin(time) * 0.4).toFixed(1)}% CAPACITY`, boxX + 6, boxY + 18);

      // Bottom-Right Reticle
      const boxR = width - 25;
      const boxB = height - 25;
      ctx.beginPath();
      ctx.moveTo(boxR - 12, boxB);
      ctx.lineTo(boxR, boxB);
      ctx.lineTo(boxR, boxB - 12);
      ctx.stroke();

      ctx.fillText("SYSTEM ACTIVE NODE 09", boxR - 120, boxB + 8);
      ctx.fillText(`Z_DEPTH: [${(outerProjected[0]?.z || 0).toFixed(0)}m]`, boxR - 92, boxB - 4);

      // Left vertical indicator bar
      const barH = 50;
      const barY = centerY - barH / 2;
      ctx.strokeStyle = "rgba(57, 255, 20, 0.12)";
      ctx.strokeRect(20, barY, 4, barH);
      ctx.fillStyle = "rgba(57, 255, 20, 0.45)";
      const barPulse = Math.abs(Math.sin(time * 2)) * barH;
      ctx.fillRect(21, barY + (barH - barPulse), 2, barPulse);

      // Outer radar target scope vector
      ctx.strokeStyle = "rgba(57, 255, 20, 0.07)";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 215, 0, Math.PI * 2);
      ctx.stroke();

      // Sweeping compass notches
      const notchCount = 12;
      ctx.strokeStyle = "rgba(57, 255, 20, 0.18)";
      for (let i = 0; i < notchCount; i++) {
        const theta = (i / notchCount) * Math.PI * 2 + time * 0.04;
        const x1 = centerX + Math.cos(theta) * 210;
        const y1 = centerY + Math.sin(theta) * 210;
        const x2 = centerX + Math.cos(theta) * 218;
        const y2 = centerY + Math.sin(theta) * 218;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouse = mouseRef.current;
    mouse.targetX = e.clientX - rect.left;
    mouse.targetY = e.clientY - rect.top;
    mouse.active = true;
  };

  const handleMouseLeave = () => {
    const mouse = mouseRef.current;
    mouse.active = false;
    mouse.targetX = canvasRef.current ? canvasRef.current.width / 2 : 220;
    mouse.targetY = canvasRef.current ? canvasRef.current.height / 2 : 220;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 h-[280px] w-[280px] xs:h-[360px] xs:w-[360px] sm:h-[440px] sm:w-[440px] max-w-full drop-shadow-[0_0_55px_rgba(57,255,20,0.3)] select-none cursor-crosshair overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />
    </div>
  );
}
