import { TypewriterSubtitle } from "@/components/typewriter-subtitle";

export default function HomePage() {
  return (
    <main className="relative z-[1] flex h-screen items-center justify-center overflow-hidden">
      <div className="flex flex-col items-start gap-2">
        <h1 className="text-[48px] font-extralight tracking-tight text-foreground/90">
          Lucas Homer
        </h1>
        <TypewriterSubtitle />
      </div>
    </main>
  );
}
