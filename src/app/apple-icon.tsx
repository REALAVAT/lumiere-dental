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
          alignItems: "center",
          justifyContent: "center",
          background: "#0f4c4a",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 32 32">
          <path
            d="M16 7.5c-1.4-1-2.9-1.5-4.4-1.2-2.1.4-3.2 2.3-2.9 4.6.2 2 1.1 3.3 1.6 5.2.4 1.8.6 4.8 2.1 4.8 1.6 0 1.4-4 3.6-4s2 4 3.6 4c1.5 0 1.7-3 2.1-4.8.5-1.9 1.4-3.2 1.6-5.2.3-2.3-.8-4.2-2.9-4.6-1.5-.3-3 .2-4.4 1.2Z"
            fill="none"
            stroke="#f8f5f0"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="23.5" cy="8.5" r="1.6" fill="#d8c3a5" />
        </svg>
      </div>
    ),
    size,
  );
}
