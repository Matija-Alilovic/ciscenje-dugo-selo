import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/ciscenje-stanova-dugo-selo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/generalno-ciscenje-stana-dugo-selo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ciscenje-kuca-dugo-selo", changeFrequency: "monthly", priority: 0.85 },
  { path: "/pranje-prozora-dugo-selo", changeFrequency: "monthly", priority: 0.85 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
