import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Measurely - Free Online Calculators",
    short_name: "Measurely",
    description: "Free online calculators for finance, health, math, engineering, and everyday life. No signup required.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafc",
    theme_color: "#6366f1",
    icons: [
      { src: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    categories: ["utilities", "productivity", "finance", "health"],
    lang: "en",
    orientation: "any",
  };
}
