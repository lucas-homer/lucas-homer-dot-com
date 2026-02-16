import type { Metadata } from "next";
import { ExperienceContent } from "@/components/experience-content";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience and education — from staff engineering to law.",
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
