import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.serviceHeadline,
    short_name: "Čišćenje DS",
    description:
      "Čišćenje stanova i kuća u Dugom Selu i okolici. Redovno, generalno i jednokratno čišćenje.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f4",
    theme_color: "#2f6f52",
    lang: "hr",
    orientation: "portrait-primary",
    categories: ["business", "lifestyle"],
  };
}
