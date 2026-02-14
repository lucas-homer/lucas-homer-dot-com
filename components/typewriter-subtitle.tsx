"use client";

import { useEffect, useState } from "react";

const WORDS = ["build, tinker", "learn, evolve", "listen, question"];
const DELETE_STYLES: DeleteStyle[] = ["replace", "x", "ciw"];

const TYPE_SPEED = 90;
const PAUSE_DURATION = 1800;
const DELETE_SPEED = 55;
const REPLACE_SPEED = 65;
const SELECTED_PAUSE = 350;

type DeleteStyle = "x" | "replace" | "ciw";
type Phase =
  | "typing"
  | "pausing"
  | "deleting"
  | "replacing"
  | "selecting"
  | "selected-pause";

function useTypewriter(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [selectCount, setSelectCount] = useState(0);
  const [replaceIndex, setReplaceIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");

  const currentWord = words[wordIndex];
  const nextWord = words[(wordIndex + 1) % words.length];
  const deleteStyle = DELETE_STYLES[wordIndex % DELETE_STYLES.length];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    switch (phase) {
      case "typing":
        if (charIndex < currentWord.length) {
          timeout = setTimeout(() => setCharIndex((i) => i + 1), TYPE_SPEED);
        } else {
          setPhase("pausing");
        }
        break;

      case "pausing":
        timeout = setTimeout(() => {
          if (deleteStyle === "x") {
            setPhase("deleting");
          } else if (deleteStyle === "replace") {
            setPhase("replacing");
          } else {
            setPhase("selecting");
          }
        }, PAUSE_DURATION);
        break;

      case "deleting":
        if (charIndex > 0) {
          timeout = setTimeout(() => setCharIndex((i) => i - 1), DELETE_SPEED);
        } else {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }
        break;

      case "replacing": {
        const targetLen = Math.max(currentWord.length, nextWord.length);
        if (replaceIndex < targetLen) {
          timeout = setTimeout(
            () => setReplaceIndex((i) => i + 1),
            REPLACE_SPEED,
          );
        } else {
          // Replace complete — next word is fully displayed
          const newIndex = (wordIndex + 1) % words.length;
          setWordIndex(newIndex);
          setCharIndex(words[newIndex].length);
          setReplaceIndex(0);
          setPhase("pausing");
        }
        break;
      }

      case "selecting":
        if (deleteStyle === "ciw") {
          setSelectCount(currentWord.length);
          setPhase("selected-pause");
        } else {
          if (selectCount < currentWord.length) {
            timeout = setTimeout(
              () => setSelectCount((s) => s + 1),
              REPLACE_SPEED,
            );
          } else {
            setPhase("selected-pause");
          }
        }
        break;

      case "selected-pause":
        timeout = setTimeout(() => {
          setCharIndex(0);
          setSelectCount(0);
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("typing");
        }, SELECTED_PAUSE);
        break;
    }

    return () => clearTimeout(timeout);
  }, [phase, charIndex, selectCount, replaceIndex, currentWord, nextWord, deleteStyle, words]);

  // Replace mode: cursor sweeps left-to-right, morphing text
  if (phase === "replacing") {
    return {
      phase,
      before: nextWord.slice(0, replaceIndex),
      highlighted: "",
      after: currentWord.slice(replaceIndex),
    };
  }

  // Selection modes (v-select, ciw)
  const displayedText = currentWord.slice(0, charIndex);

  if (selectCount > 0) {
    return {
      phase,
      before: displayedText.slice(0, displayedText.length - selectCount),
      highlighted: displayedText.slice(displayedText.length - selectCount),
      after: "",
    };
  }

  // Typing, pausing, x-deleting
  return {
    phase,
    before: displayedText,
    highlighted: "",
    after: "",
  };
}

const cursorBase =
  "inline-block w-[0.6em] h-[1.1em] align-middle ml-[1px] bg-foreground/50";

export function TypewriterSubtitle() {
  const { phase, before, highlighted, after } = useTypewriter(WORDS);
  const isReplacing = phase === "replacing";

  return (
    <p
      className="font-mono text-[20px] text-foreground/50"
      aria-label="Rotating subtitle"
    >
      <span>{before}</span>
      {highlighted && (
        <span className="bg-foreground/50 text-background">{highlighted}</span>
      )}
      {isReplacing ? (
        <>
          <span className={cursorBase} />
          <span>{after}</span>
        </>
      ) : (
        <span className={`${cursorBase} animate-cursor-blink`} />
      )}
    </p>
  );
}
