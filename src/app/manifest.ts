import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.serviceHeadline,
    short_name: "Održavanje DS",
    description:
      "Održavanje kuće i dvorišta u Dugom Selu i okolici. Čišćenje, košnja i sitni radovi.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ec",
    theme_color: "#2a4d6b",
    lang: "hr",
    orientation: "portrait-primary",
    categories: ["business", "lifestyle"],
  };
}
