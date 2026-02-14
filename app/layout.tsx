import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ViewTransition } from "react";
import { CanvasProvider } from "@/components/canvas-context";
import { CanvasBackground } from "@/components/canvas-background";
import { TopNav } from "@/components/top-nav";
import { SettingsToggle } from "@/components/settings-toggle";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas Homer",
  description:
    "Software engineer portfolio — experience, projects, and generative art.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jakartaSans.variable} antialiased`}>
        <CanvasProvider>
          <CanvasBackground />
          <TopNav />
          <ViewTransition name="page-content">{children}</ViewTransition>
          <SettingsToggle />
        </CanvasProvider>
      </body>
    </html>
  );
}
