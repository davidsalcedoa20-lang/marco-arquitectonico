"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import styles from "./footer.module.css";

type Props = {
  className?: string;
};

/**
 * Lightweight architectural blueprint / wireframe — pure SVG, no images.
 * Paths draw in when the footer enters the viewport (once).
 */
export function FooterBlueprint({ className = "" }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const parallaxRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || !inView) return;

    const paths = svg.querySelectorAll<SVGPathElement | SVGLineElement | SVGCircleElement | SVGPolylineElement>(
      "[data-draw]",
    );

    paths.forEach((el, i) => {
      const len =
        "getTotalLength" in el && typeof el.getTotalLength === "function"
          ? el.getTotalLength()
          : 240;
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      el.style.transition = `stroke-dashoffset ${2.35 + (i % 5) * 0.12}s cubic-bezier(0.22, 1, 0.36, 1) ${0.08 + i * 0.035}s, opacity 0.8s ease ${0.1 + i * 0.02}s`;
      requestAnimationFrame(() => {
        el.style.strokeDashoffset = "0";
        el.style.opacity = el.dataset.glow === "1" ? "0.72" : "0.38";
      });
    });
  }, [inView]);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      parallaxRef.current.x = nx * 8;
      parallaxRef.current.y = ny * 5;
    };

    let currentX = 0;
    let currentY = 0;
    const tick = () => {
      currentX += (parallaxRef.current.x - currentX) * 0.04;
      currentY += (parallaxRef.current.y - currentY) * 0.04;
      svg.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      ref={ref}
      className={`${styles.blueprint} ${className}`}
      viewBox="0 0 1100 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Left elevation / section */}
      <g stroke="#9a9a9a" strokeWidth="1">
        <path data-draw d="M40 360 H420" opacity="0" />
        <path data-draw d="M70 360 V120" opacity="0" />
        <path data-draw d="M70 120 H360" opacity="0" />
        <path data-draw d="M360 120 V360" opacity="0" />
        <path data-draw d="M70 280 H360" opacity="0" />
        <path data-draw d="M70 200 H360" opacity="0" />
        <path data-draw d="M140 120 V360" opacity="0" />
        <path data-draw d="M220 120 V360" opacity="0" />
        <path data-draw d="M290 120 V360" opacity="0" />
        <path data-draw data-glow="1" stroke="#d97228" d="M70 360 L360 120" opacity="0" />
        <path data-draw d="M95 160 H125 V190 H95 Z" opacity="0" />
        <path data-draw d="M165 220 H195 V250 H165 Z" opacity="0" />
        <path data-draw d="M245 160 H275 V190 H245 Z" opacity="0" />
        <path data-draw d="M310 300 H340 V330 H310 Z" opacity="0" />
        <circle data-draw cx="70" cy="120" r="5" opacity="0" />
        <circle data-draw cx="360" cy="120" r="5" opacity="0" />
        <circle data-draw cx="70" cy="360" r="5" opacity="0" />
        <circle data-draw cx="360" cy="360" r="5" opacity="0" />
        <path data-draw d="M40 320 H55" opacity="0" />
        <path data-draw d="M40 240 H55" opacity="0" />
        <path data-draw d="M40 160 H55" opacity="0" />
      </g>

      {/* Dimension ticks */}
      <g stroke="#d97228" strokeWidth="1" opacity="0.55">
        <path data-draw data-glow="1" d="M380 360 V120" opacity="0" />
        <path data-draw data-glow="1" d="M375 120 H385" opacity="0" />
        <path data-draw data-glow="1" d="M375 200 H385" opacity="0" />
        <path data-draw data-glow="1" d="M375 280 H385" opacity="0" />
        <path data-draw data-glow="1" d="M375 360 H385" opacity="0" />
      </g>

      {/* Right isometric building */}
      <g stroke="#9a9a9a" strokeWidth="1">
        <path
          data-draw
          d="M560 300 L700 230 L840 300 L700 370 Z"
          opacity="0"
        />
        <path data-draw d="M560 300 V210 L700 140 V230" opacity="0" />
        <path data-draw d="M840 300 V210 L700 140" opacity="0" />
        <path data-draw d="M560 255 L700 185 L840 255" opacity="0" />
        <path data-draw d="M630 265 V195" opacity="0" />
        <path data-draw d="M770 265 V195" opacity="0" />
        <path data-draw d="M700 370 V300" opacity="0" />
        <path
          data-draw
          data-glow="1"
          stroke="#d97228"
          d="M660 240 L700 220 L740 240 L700 260 Z"
          opacity="0"
        />
        <path
          data-draw
          data-glow="1"
          stroke="#d97228"
          d="M680 230 V205 L700 195 L720 205 V230"
          opacity="0"
        />
        {/* Soft fill glow room */}
        <path
          d="M660 240 L700 220 L740 240 L700 260 Z"
          fill="rgba(217,114,40,0.12)"
          stroke="none"
        />
      </g>

      {/* Wire tree */}
      <g stroke="#9a9a9a" strokeWidth="1">
        <path data-draw d="M910 340 V260" opacity="0" />
        <path data-draw d="M910 280 L880 250" opacity="0" />
        <path data-draw d="M910 280 L940 248" opacity="0" />
        <path data-draw d="M910 255 L890 230" opacity="0" />
        <path data-draw d="M910 255 L930 228" opacity="0" />
        <path data-draw d="M910 235 L900 210" opacity="0" />
        <path data-draw d="M910 235 L922 208" opacity="0" />
      </g>

      {/* Annotation labels (static, low opacity) */}
      <g fill="#9a9a9a" fontFamily="ui-monospace, monospace" fontSize="10" opacity="0.35">
        <text x="88" y="108">CORTE A-A</text>
        <text x="250" y="108">FACHADA NORTE</text>
        <text x="392" y="126">4.20</text>
        <text x="392" y="206">2.80</text>
        <text x="392" y="286">0.00</text>
        <text x="62" y="112">A</text>
        <text x="352" y="112">B</text>
        <text x="352" y="372">D</text>
      </g>
    </svg>
  );
}
