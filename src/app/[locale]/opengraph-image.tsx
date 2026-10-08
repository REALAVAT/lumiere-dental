import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const alt = "Lumière Dental Dubai — premium dental clinic in Dubai Healthcare City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #faf8f5 0%, #f1e9dc 55%, #e3efe9 100%)",
          color: "#10201f",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(15,76,74,0.22), rgba(15,76,74,0))",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: "#0f4c4a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 32 32">
              <path
                d="M16 7.5c-1.4-1-2.9-1.5-4.4-1.2-2.1.4-3.2 2.3-2.9 4.6.2 2 1.1 3.3 1.6 5.2.4 1.8.6 4.8 2.1 4.8 1.6 0 1.4-4 3.6-4s2 4 3.6 4c1.5 0 1.7-3 2.1-4.8.5-1.9 1.4-3.2 1.6-5.2.3-2.3-.8-4.2-2.9-4.6-1.5-.3-3 .2-4.4 1.2Z"
                fill="none"
                stroke="#f8f5f0"
                strokeWidth="1.8"
              />
            </svg>
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>{site.name.en}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.5 }}>
            Dentistry, beautifully calm.
          </div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#52605d", lineHeight: 1.35 }}>
            Implants · Invisalign · Veneers · Whitening · Kids · Emergency
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["DHA Licensed", `${site.rating.value} Google rating`, "Dubai Healthcare City"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 24px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.75)",
                border: "1px solid #e5ded2",
                fontSize: 24,
                color: "#0f4c4a",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
