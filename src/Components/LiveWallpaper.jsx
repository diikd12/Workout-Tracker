import { useEffect, useRef } from 'react';

const WATER_THEMES = {
  dark: {
    bg: [10, 10, 12],
    aurora1: [232, 213, 163, 0.12], // gold champagne
    aurora2: [40, 32, 20, 0.25],
    waveDeep: [16, 15, 14],
    waveMid: [28, 25, 20],
    crest: [232, 213, 163],
    foamAlpha: 0.25,
    isLight: false,
  },
  light: {
    bg: [246, 247, 250],
    aurora1: [210, 220, 240, 0.45],
    aurora2: [230, 235, 248, 0.35],
    waveDeep: [232, 235, 242],
    waveMid: [215, 220, 232],
    crest: [100, 110, 130],
    foamAlpha: 0.35,
    isLight: true,
  },
  graphite: {
    bg: [12, 12, 15],
    aurora1: [200, 200, 216, 0.12],
    aurora2: [35, 35, 45, 0.22],
    waveDeep: [20, 20, 26],
    waveMid: [32, 32, 42],
    crest: [200, 200, 216],
    foamAlpha: 0.25,
    isLight: false,
  },
  green: {
    bg: [5, 14, 9],
    aurora1: [168, 213, 181, 0.14],
    aurora2: [20, 50, 32, 0.25],
    waveDeep: [10, 26, 17],
    waveMid: [18, 44, 29],
    crest: [168, 213, 181],
    foamAlpha: 0.28,
    isLight: false,
  },
  blue: {
    bg: [3, 8, 22],
    aurora1: [144, 189, 224, 0.15],
    aurora2: [18, 45, 95, 0.28],
    waveDeep: [8, 22, 50],
    waveMid: [14, 40, 85],
    crest: [144, 189, 224],
    foamAlpha: 0.3,
    isLight: false,
  },
  purple: {
    bg: [14, 10, 18],
    aurora1: [196, 184, 212, 0.13],
    aurora2: [48, 30, 68, 0.25],
    waveDeep: [24, 16, 34],
    waveMid: [42, 26, 60],
    crest: [196, 184, 212],
    foamAlpha: 0.25,
    isLight: false,
  },
  slate: {
    bg: [5, 12, 18],
    aurora1: [176, 192, 196, 0.13],
    aurora2: [25, 45, 60, 0.25],
    waveDeep: [12, 24, 34],
    waveMid: [22, 40, 54],
    crest: [176, 192, 196],
    foamAlpha: 0.28,
    isLight: false,
  },
};

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function lerpColor(c1, c2, factor) {
  return [
    lerp(c1[0], c2[0], factor),
    lerp(c1[1], c2[1], factor),
    lerp(c1[2], c2[2], factor),
  ];
}

export default function LiveWallpaper({ currentTheme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse tracking untuk efek gelombang interaktif
    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2, speed: 0 };
    let lastMouseX = width / 2;
    let lastMouseY = height / 2;

    const handleMouseMove = (e) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      mouse.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 30);
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // State warna saat ini untuk transisi lerp antar tema
    const targetInit = WATER_THEMES[currentTheme] || WATER_THEMES.dark;
    let currentColors = {
      bg: [...targetInit.bg],
      waveDeep: [...targetInit.waveDeep],
      waveMid: [...targetInit.waveMid],
      crest: [...targetInit.crest],
      foamAlpha: targetInit.foamAlpha,
      isLight: targetInit.isLight,
    };

    // Karakteristik lapisan-lapisan gelombang air
    const waveLayers = [
      { yRatio: 0.55, amp: 26, freq: 0.0035, speed: 0.011, phase: 0.0, depthWeight: 0.15 },
      { yRatio: 0.68, amp: 32, freq: 0.0040, speed: 0.015, phase: 1.8, depthWeight: 0.35 },
      { yRatio: 0.80, amp: 38, freq: 0.0030, speed: 0.018, phase: 3.4, depthWeight: 0.65 },
      { yRatio: 0.91, amp: 44, freq: 0.0045, speed: 0.022, phase: 5.1, depthWeight: 1.00 },
    ];

    // Partikel mikro stardust / debu marmer di seluruh layar
    const stardust = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      baseRadius: Math.random() * 1.5 + 0.6,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: -Math.random() * 0.4 - 0.15, // perlahan melayang naik
      phase: Math.random() * Math.PI * 2,
    }));

    let time = 0;

    const render = () => {
      time += 1;

      // Mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.speed *= 0.95;

      // Transisi warna halus ke tema baru
      const target = WATER_THEMES[currentTheme] || WATER_THEMES.dark;
      currentColors.bg = lerpColor(currentColors.bg, target.bg, 0.05);
      currentColors.waveDeep = lerpColor(currentColors.waveDeep, target.waveDeep, 0.05);
      currentColors.waveMid = lerpColor(currentColors.waveMid, target.waveMid, 0.05);
      currentColors.crest = lerpColor(currentColors.crest, target.crest, 0.05);
      currentColors.foamAlpha = lerp(currentColors.foamAlpha, target.foamAlpha, 0.05);
      currentColors.isLight = target.isLight;

      const [br, bg, bb] = currentColors.bg.map(Math.round);
      const [dr, dg, db] = currentColors.waveDeep.map(Math.round);
      const [mr, mg, mb] = currentColors.waveMid.map(Math.round);
      const [cr, cg, cb] = currentColors.crest.map(Math.round);

      // 1. Gambar latar langit/dasar kanvas
      ctx.fillStyle = `rgb(${br}, ${bg}, ${bb})`;
      ctx.fillRect(0, 0, width, height);

      // 2. Ambient Fluid Aurora Orbs (Pendaran cahaya lembut bernapas di seluruh layar)
      const orb1X = width * 0.3 + Math.sin(time * 0.008) * (width * 0.12);
      const orb1Y = height * 0.28 + Math.cos(time * 0.007) * (height * 0.1);
      const orb1R = Math.min(width, height) * 0.55;
      const g1 = ctx.createRadialGradient(orb1X, orb1Y, 0, orb1X, orb1Y, orb1R);
      g1.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${currentColors.isLight ? 0.22 : 0.09})`);
      g1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const orb2X = width * 0.75 + Math.cos(time * 0.009) * (width * 0.15);
      const orb2Y = height * 0.55 + Math.sin(time * 0.008) * (height * 0.12);
      const orb2R = Math.min(width, height) * 0.65;
      const g2 = ctx.createRadialGradient(orb2X, orb2Y, 0, orb2X, orb2Y, orb2R);
      g2.addColorStop(0, `rgba(${mr}, ${mg}, ${mb}, ${currentColors.isLight ? 0.25 : 0.18})`);
      g2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // 3. Interactive pointer subtle spotlight
      const pointerR = Math.min(width, height) * 0.35;
      const gp = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, pointerR);
      gp.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${currentColors.isLight ? 0.12 : 0.06})`);
      gp.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gp;
      ctx.fillRect(0, 0, width, height);

      // 4. Gambar setiap lapisan gelombang air (dari belakang ke depan)
      const step = 8;
      waveLayers.forEach((wave, index) => {
        const baseY = height * wave.yRatio;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);

        for (let x = 0; x <= width + step; x += step) {
          const wave1 = Math.sin(x * wave.freq + time * wave.speed + wave.phase) * wave.amp;
          const wave2 = Math.cos(x * wave.freq * 1.6 - time * wave.speed * 0.7) * (wave.amp * 0.35);

          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const mouseDist = Math.sqrt(dx * dx + dy * dy);
          let rippleEffect = 0;

          if (mouseDist < 220) {
            const influence = (1 - mouseDist / 220);
            rippleEffect = Math.sin(mouseDist * 0.08 - time * 0.1) * influence * (10 + mouse.speed * 0.5);
          }

          const currentY = baseY + wave1 + wave2 + rippleEffect;
          ctx.lineTo(x, currentY);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, baseY - wave.amp, 0, height);
        const topAlpha = currentColors.isLight ? (0.2 + index * 0.15) : (0.28 + index * 0.16);
        const botAlpha = currentColors.isLight ? (0.6 + index * 0.12) : (0.75 + index * 0.06);

        const r = Math.round(lerp(dr, mr, wave.depthWeight));
        const g = Math.round(lerp(dg, mg, wave.depthWeight));
        const b = Math.round(lerp(db, mb, wave.depthWeight));

        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${topAlpha})`);
        grad.addColorStop(1, `rgba(${dr}, ${dg}, ${db}, ${botAlpha})`);

        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${currentColors.foamAlpha * (0.5 + index * 0.18)})`;
        ctx.lineWidth = 1.2 + index * 0.4;
        ctx.stroke();
      });

      // 5. Partikel mikro debu marmer / stardust yang melayang dan berkedip lembut
      stardust.forEach((s) => {
        s.x += s.speedX;
        s.y += s.speedY;

        // Reset partikel jika keluar layar
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }

        const pulse = (Math.sin(time * 0.035 + s.phase) + 1) * 0.5;
        const sparkAlpha = pulse * (currentColors.isLight ? 0.3 : 0.45);

        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${sparkAlpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.baseRadius * (0.7 + pulse * 0.5), 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentTheme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
