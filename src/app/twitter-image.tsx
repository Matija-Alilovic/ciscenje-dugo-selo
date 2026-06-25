import { createOgImageResponse, ogImageContentType, ogImageSize } from "@/lib/ogImage";

export const alt = "Čišćenje stanova i kuća Dugo Selo";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return createOgImageResponse();
}
