"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const POSTER_SRC = "/intro/aiprobaj-intro-poster.webp";
const BUNNY_HOST = "vz-1f861c1a-e2a.b-cdn.net";
const VIDEO_GUID = "36738719-237f-43ff-90ba-04e7892e65bb";
const HLS_SRC = `https://${BUNNY_HOST}/${VIDEO_GUID}/playlist.m3u8`;
const MP4_FALLBACK_SRC = `https://${BUNNY_HOST}/${VIDEO_GUID}/play_720p.mp4`;

export default function IntroVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const video = videoRef.current;
    if (!video) return;
    // Autoplay attribut se ne oslanja pouzdano kad se src/MediaSource postavlja
    // naknadno preko JS-a, zato eksplicitno zovemo play() kad je izvor spreman.
    video.muted = true;
    const tryPlay = () => void video.play().catch(() => {});

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari: native HLS support, upravlja vlastitim ABR-om.
      video.src = HLS_SRC;
      video.addEventListener("loadedmetadata", tryPlay, { once: true });
      return () => video.removeEventListener("loadedmetadata", tryPlay);
    }

    let hls: import("hls.js").default | undefined;
    let cancelled = false;
    import("hls.js").then(({ default: Hls }) => {
      if (cancelled) return;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
          // Kratak klip: default ABR kreće od niže razine i ne stigne se
          // popeti do vrha na vrijeme. Kreni odmah na najvišu rezoluciju.
          let bestIndex = 0;
          data.levels.forEach((level, i) => {
            if (level.height > data.levels[bestIndex].height) bestIndex = i;
          });
          hls!.currentLevel = bestIndex;
          tryPlay();
        });
      } else {
        // Vrlo star browser bez MSE podrške: direktan MP4 fallback.
        video.src = MP4_FALLBACK_SRC;
        video.addEventListener("loadedmetadata", tryPlay, { once: true });
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [inView]);

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
      {!inView && (
        <Image
          src={POSTER_SRC}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 900px) 100vw, 900px"
        />
      )}

      {inView && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video
          ref={videoRef}
          poster={POSTER_SRC}
          autoPlay
          muted
          controls
          playsInline
          preload="auto"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}
    </div>
  );
}
