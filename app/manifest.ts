import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lucas Homer",
    short_name: "Lucas Homer",
    description:
      "Software engineer portfolio — experience, projects, and generative art.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0d0c",
    theme_color: "#0e0d0c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
