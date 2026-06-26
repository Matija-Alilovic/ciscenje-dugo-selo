import { ImageResponse } from "next/og";
import { SITE } from "@/lib/constants";

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageContentType = "image/png";

type OgImageOptions = {
  title?: string;
  subtitle?: string;
};

export function createOgImageResponse({
  title = SITE.serviceHeadline,
  subtitle = "Dugo Selo i okolica · Cijena po dogovoru",
}: OgImageOptions = {}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #faf8f4 0%, #edf7f0 48%, #d4eadc 100%)",
          color: "#2a2420",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#2f6f52",
              borderRadius: 18,
            }}
          >
            <div
              style={{
                width: 28,
                height: 36,
                marginTop: -4,
                background: "#edf7f0",
                borderRadius: "50% 50% 50% 50% / 35% 35% 65% 65%",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 28,
                color: "#2f6f52",
                fontWeight: 700,
                fontFamily: "Arial, sans-serif",
              }}
            >
              {SITE.name}
            </span>
            <span
              style={{
                fontSize: 22,
                color: "#5e564d",
                fontFamily: "Arial, sans-serif",
              }}
            >
              Profesionalno čišćenje stanova i kuća
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.08,
              fontWeight: 700,
              color: "#1f4f38",
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.35,
              color: "#4a433c",
              maxWidth: 880,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #a8d4b8",
            paddingTop: 28,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#266045",
              fontWeight: 700,
            }}
          >
            ciscenje-dugo-selo.hr
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#5e564d",
            }}
          >
            Redovno · Generalno · Pranje prozora
          </span>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    },
  );
}
