import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2a4d6b",
          borderRadius: 36,
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
              borderLeft: "44px solid transparent",
              borderRight: "44px solid transparent",
              borderBottom: "38px solid #f6f3ec",
            }}
          />
          <div
            style={{
              width: 78,
              height: 56,
              background: "#f6f3ec",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{ width: 22, height: 34, background: "#c4783a" }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
