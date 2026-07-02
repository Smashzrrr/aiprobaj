import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080a",
          padding: "64px 72px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#c6ff3a",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
            }}
          >
            {"// BESPLATAN ONLINE WEBINAR"}
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 92, fontWeight: 800 }}>
            <span style={{ color: "#c6ff3a" }}>ai</span>
            <span style={{ color: "#f5f5f5" }}>probaj</span>
            <span style={{ color: "#5a5a5a" }}>.com</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 46,
              fontWeight: 700,
              color: "#f5f5f5",
              lineHeight: 1.25,
              maxWidth: 980,
            }}
          >
            {"Uče te ljudi koje"}
            <span style={{ color: "#c6ff3a", margin: "0 14px" }}>klijenti plaćaju</span>
            {"za AI"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, color: "#8a8a8a", letterSpacing: 2 }}>
            AI · SEO · AEO · GEO · SIGURNOST
          </div>
          <div style={{ display: "flex", marginTop: 12, fontSize: 30, fontWeight: 700, color: "#f5f5f5" }}>
            Fraviz Studio&nbsp;&nbsp;×&nbsp;&nbsp;SEO Lick
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
