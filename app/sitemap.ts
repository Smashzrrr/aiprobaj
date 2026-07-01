import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://aiprobaj.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE}/`,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date("2026-07-01"),
    },
    {
      url: `${SITE}/privatnost`,
      changeFrequency: "yearly",
      priority: 0.3,
      lastModified: new Date("2026-07-01"),
    },
  ];
}
