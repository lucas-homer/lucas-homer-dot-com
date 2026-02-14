"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { CanvasParams } from "@/lib/canvas-types";
import { DEFAULT_PARAMS } from "@/lib/canvas-types";

interface CanvasContextValue {
  params: CanvasParams;
  setParams: (params: CanvasParams) => void;
  paramsRef: React.RefObject<CanvasParams>;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}

const CanvasContext = createContext<CanvasContextValue | null>(null);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const [params, setParamsState] = useState<CanvasParams>(DEFAULT_PARAMS);
  const [paused, setPaused] = useState(false);
  const paramsRef = useRef<CanvasParams>(params);

  function setParams(next: CanvasParams) {
    paramsRef.current = next;
    setParamsState(next);
  }

  return (
    <CanvasContext value={{ params, setParams, paramsRef, paused, setPaused }}>
      {children}
    </CanvasContext>
  );
}

export function useCanvas() {
  const ctx = useContext(CanvasContext);
  if (!ctx) throw new Error("useCanvas must be used within CanvasProvider");
  return ctx;
}
