import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

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
  const siteUrl = getSiteUrl();

  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
