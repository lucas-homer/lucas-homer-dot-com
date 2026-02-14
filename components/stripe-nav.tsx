"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/lib/experience-data";

const navItems = experience.map((role) => ({
  id: role.id,
  label: role.navLabel,
}));

export function StripeNav() {
  const [activeId, setActiveId] = useState(navItems[0].id);
  const [hovered, setHovered] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const item of navItems) {
      const el = document.getElementById(item.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(item.id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      ref={navRef}
      className="hidden lg:flex fixed left-0 top-0 z-10 h-screen w-48 items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setHoveredId(null);
      }}
    >
      {/* Dark overlay on hover */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0, pointerEvents: "none" }}
      />

      <div className="relative z-10 flex flex-col gap-3 pl-6">
        {navItems.map((item) => {
          const isActive = activeId === item.id;
          const isItemHovered = hoveredId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex cursor-pointer items-center gap-3 text-left"
              aria-label={item.label}
            >
              {/* Dash */}
              <div
                className="h-[2px] rounded-full transition-all duration-200"
                style={{
                  width:
                    isItemHovered || (isActive && hovered) ? 28 : isActive ? 24 : 16,
                  backgroundColor:
                    isActive
                      ? "rgba(255,255,255,0.7)"
                      : hovered
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(255,255,255,0.12)",
                }}
              />

              {/* Label (only visible on hover of nav area) */}
              <span
                className="whitespace-nowrap text-xs font-medium transition-all duration-200"
                style={{
                  opacity: hovered ? (isItemHovered || isActive ? 1 : 0.5) : 0,
                  color:
                    isActive
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.6)",
                  transform: hovered ? "translateX(0)" : "translateX(-8px)",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
