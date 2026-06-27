import { AREA_PAGES } from "./constants";

export type AreaSlug = (typeof AREA_PAGES)[number]["slug"];

export function getAreaPage(slug: string) {
  return AREA_PAGES.find((area) => area.slug === slug);
}

export function getAllAreaSlugs(): AreaSlug[] {
  return AREA_PAGES.map((area) => area.slug);
}

export function getAreaPagePath(slug: AreaSlug) {
  return `/ciscenje-${slug}`;
}
