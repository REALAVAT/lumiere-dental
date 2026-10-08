import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name.en,
    short_name: site.shortName,
    description: site.tagline.en,
    start_url: "/en",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#0f4c4a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
