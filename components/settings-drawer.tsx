"use client";

import { useState } from "react";
import { useCanvas } from "./canvas-context";
import { DEFAULT_PARAMS } from "@/lib/canvas-types";
import type { CanvasParams } from "@/lib/canvas-types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

function ParamSlider({
  label,
  paramKey,
  min,
  max,
  step,
  format,
  params,
  onChange,
}: {
  label: string;
  paramKey: keyof CanvasParams;
  min: number;
  max: number;
  step: number;
  format?: (v: number) => string;
  params: CanvasParams;
  onChange: (key: keyof CanvasParams, value: number) => void;
}) {
  const value = params[paramKey] as number;
  const fmt = format ?? ((v: number) => String(v));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="font-mono text-xs text-muted-foreground">
          {fmt(value)}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(paramKey, v)}
      />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 text-[15px] font-semibold text-foreground">
      <span className="text-sienna font-bold">&bull;</span>
      {children}
    </h3>
  );
}

export function SettingsDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { params, setParams, paused, setPaused } = useCanvas();
  const [localParams, setLocalParams] = useState(params);

  // Sync local to context when drawer opens
  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen) setLocalParams(params);
    onOpenChange(isOpen);
  };

  function updateParam(key: keyof CanvasParams, value: number) {
    const next = { ...localParams, [key]: value };
    setLocalParams(next);
    setParams(next);
  }

  function updateColor(index: number, value: string) {
    const palette = [...localParams.colorPalette] as [string, string, string];
    palette[index] = value;
    const next = { ...localParams, colorPalette: palette };
    setLocalParams(next);
    setParams(next);
  }

  function updateSeed(seed: number) {
    if (seed < 1) return;
    const next = { ...localParams, seed };
    setLocalParams(next);
    setParams(next);
  }

  function randomSeed() {
    updateSeed(Math.floor(Math.random() * 999999) + 1);
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="right"
        className="w-[320px] overflow-y-auto border-l border-white/[0.06] bg-[rgba(18,17,16,0.92)] backdrop-blur-2xl sm:max-w-[320px]"
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-2xl font-bold text-foreground">
            Fluid Cartography
          </SheetTitle>
          <SheetDescription className="text-[13px] text-muted-foreground">
            Topographic contours breathing with ocean swell
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 px-6 pb-6">
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            This background was generated using Anthropic&apos;s algorithmic-art
            agent skill — topographic contours driven by seeded noise and marching
            squares. Every parameter below is live. Tinker away.
          </p>

          {/* Seed */}
          <div className="space-y-3">
            <SectionHeading>Seed</SectionHeading>
            <input
              type="number"
              value={localParams.seed}
              onChange={(e) => {
                const v = parseInt(e.target.value);
                if (!isNaN(v)) updateSeed(v);
              }}
              className="w-full rounded-lg border border-white/[0.08] bg-[#1a1918] px-3 py-2.5 text-center font-mono text-sm text-foreground focus:border-sienna focus:outline-none focus:ring-2 focus:ring-sienna/20"
            />
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateSeed(localParams.seed - 1)}
                className="rounded-md bg-[#3a5565] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a6878]"
              >
                &larr; Prev
              </button>
              <button
                onClick={() => updateSeed(localParams.seed + 1)}
                className="rounded-md bg-[#3a5565] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#4a6878]"
              >
                Next &rarr;
              </button>
            </div>
            <button
              onClick={randomSeed}
              className="w-full rounded-md bg-[#4a5a38] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#5a6b45]"
            >
              &#8635; Random
            </button>
          </div>

          {/* Terrain */}
          <div className="space-y-4">
            <SectionHeading>Terrain</SectionHeading>
            <ParamSlider
              label="Terrain Features"
              paramKey="peakCount"
              min={3}
              max={15}
              step={1}
              params={localParams}
              onChange={updateParam}
            />
            <ParamSlider
              label="Terrain Detail"
              paramKey="noiseAmount"
              min={0}
              max={0.6}
              step={0.02}
              format={(v) => v.toFixed(2)}
              params={localParams}
              onChange={updateParam}
            />
            <ParamSlider
              label="Contour Lines"
              paramKey="contourCount"
              min={6}
              max={30}
              step={1}
              params={localParams}
              onChange={updateParam}
            />
            <ParamSlider
              label="Line Weight"
              paramKey="lineWeight"
              min={0.3}
              max={2.5}
              step={0.1}
              format={(v) => v.toFixed(1)}
              params={localParams}
              onChange={updateParam}
            />
          </div>

          {/* Wave */}
          <div className="space-y-4">
            <SectionHeading>Wave</SectionHeading>
            <ParamSlider
              label="Amplitude"
              paramKey="waveAmplitude"
              min={0}
              max={0.5}
              step={0.02}
              format={(v) => v.toFixed(2)}
              params={localParams}
              onChange={updateParam}
            />
            <ParamSlider
              label="Frequency"
              paramKey="waveFrequency"
              min={0.002}
              max={0.025}
              step={0.001}
              format={(v) => v.toFixed(3)}
              params={localParams}
              onChange={updateParam}
            />
            <ParamSlider
              label="Speed"
              paramKey="waveSpeed"
              min={0.2}
              max={4}
              step={0.1}
              format={(v) => v.toFixed(1)}
              params={localParams}
              onChange={updateParam}
            />
            <ParamSlider
              label="Direction"
              paramKey="waveAngle"
              min={0}
              max={360}
              step={5}
              format={(v) => `${v}\u00B0`}
              params={localParams}
              onChange={updateParam}
            />
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <SectionHeading>Colors</SectionHeading>
            {(["Valley", "Terrain", "Peak"] as const).map((label, i) => (
              <div key={label} className="space-y-1">
                <label className="text-xs text-muted-foreground">{label}</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={localParams.colorPalette[i]}
                    onChange={(e) => updateColor(i, e.target.value)}
                    className="h-7 w-7 cursor-pointer rounded-md border-none bg-transparent p-0"
                  />
                  <span className="font-mono text-xs text-muted-foreground">
                    {localParams.colorPalette[i]}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <SectionHeading>Actions</SectionHeading>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setLocalParams({ ...localParams });
                  setParams({ ...localParams });
                }}
                className="flex-1 rounded-md bg-sienna px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#a06a45]"
              >
                Regenerate
              </button>
              <button
                onClick={() => setPaused(!paused)}
                className="flex-1 rounded-md bg-[#4a5a38] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-[#5a6b45]"
              >
                {paused ? "\u25B6 Play" : "\u23F8 Pause"}
              </button>
            </div>
            <button
              onClick={() => {
                setLocalParams({ ...DEFAULT_PARAMS });
                setParams({ ...DEFAULT_PARAMS });
              }}
              className="w-full rounded-md bg-white/[0.06] px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-white/[0.1] hover:text-foreground"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
