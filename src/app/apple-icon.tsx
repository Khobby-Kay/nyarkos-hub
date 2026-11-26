import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#141414",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          N<span style={{ color: "#87ceeb" }}>.</span>
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Hub
        </div>
      </div>
    ),
    { ...size },
  );
}