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
  metadataBase: new URL("https://lucashomer.com"),
  title: {
    default: "Lucas Homer",
    template: "%s | Lucas Homer",
  },
  description:
    "Software engineer portfolio — experience, projects, and generative art.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lucashomer.com",
    siteName: "Lucas Homer",
    title: "Lucas Homer",
    description:
      "Software builder | Technical leader | Recovering attorney",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lucas Homer — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucas Homer",
    description:
      "Software builder | Technical leader | Recovering attorney",
    images: ["/og-image.png"],
  },
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
