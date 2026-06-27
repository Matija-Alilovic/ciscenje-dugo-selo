import type { MetadataRoute } from "next";
import { getAllAreaSlugs, getAreaPagePath } from "@/lib/areaPages";
import { getSiteUrl } from "@/lib/site";

const ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/ciscenje-stanova-dugo-selo", changeFrequency: "monthly", priority: 0.95 },
  { path: "/generalno-ciscenje-stana-dugo-selo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ciscenje-kuca-dugo-selo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/pranje-prozora-dugo-selo", changeFrequency: "monthly", priority: 0.85 },
  { path: "/ciscenje-nakon-selidbe-dugo-selo", changeFrequency: "monthly", priority: 0.85 },
  ...getAllAreaSlugs().map((slug) => ({
    path: getAreaPagePath(slug),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  })),
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
