import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME}. Premium knit polos in Ghana.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const heroPath = join(process.cwd(), "public/hero/lifestyle.jpg");
  const hero = await readFile(heroPath);
  const heroSrc = `data:image/jpeg;base64,${hero.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#141414",
        }}
      >
        <img
          src={heroSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.2) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
            color: "#ffffff",
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            {SITE_NAME}
            <span style={{ color: "#87ceeb" }}>.</span>
          </div>
          <p
            style={{
              marginTop: 20,
              maxWidth: 640,
              fontSize: 28,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.88)",
            }}
          >
            {SITE_DESCRIPTION}
          </p>
          <p
            style={{
              marginTop: 28,
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            nyarkos-hub.vercel.app
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}