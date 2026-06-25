import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2f6f52",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: 14,
            height: 18,
            marginTop: -2,
            background: "#edf7f0",
            borderRadius: "50% 50% 50% 50% / 35% 35% 65% 65%",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
