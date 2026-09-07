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
          background: "linear-gradient(145deg, #f6f3ec 0%, #eef3f8 48%, #f3e0cc 100%)",
          color: "#231e18",
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
              background: "#2a4d6b",
              borderRadius: 18,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "18px solid transparent",
                  borderRight: "18px solid transparent",
                  borderBottom: "16px solid #f6f3ec",
                }}
              />
              <div
                style={{
                  width: 32,
                  height: 22,
                  background: "#f6f3ec",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <div style={{ width: 10, height: 14, background: "#c4783a" }} />
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: 28,
                color: "#2a4d6b",
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
              Čišćenje, kuća i dvorište
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 920 }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.08,
              fontWeight: 700,
              color: "#182c3e",
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
            borderTop: "2px solid #a8c0d6",
            paddingTop: 28,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#213c54",
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
            Čišćenje · Dvorište · Sitni radovi
          </span>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
    },
  );
}
