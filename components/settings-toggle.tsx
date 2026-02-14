"use client";

import { useState } from "react";
import { WavesLadder } from "lucide-react";
import { SettingsDrawer } from "./settings-drawer";

export function SettingsToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-10 flex size-11 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.08] shadow-lg backdrop-blur-xl transition hover:scale-[1.08] hover:bg-white/[0.14]"
        aria-label="Settings"
        style={{ display: open ? "none" : "flex" }}
      >
        <WavesLadder className="size-5 text-white/45" />
      </button>
      <SettingsDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
