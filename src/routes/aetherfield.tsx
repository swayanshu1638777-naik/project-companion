import { createFileRoute } from "@tanstack/react-router";
import { Aetherfield } from "@/components/Aetherfield";

export const Route = createFileRoute("/aetherfield")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Aetherfield — A little world to shape" },
    { name: "description", content: "Shape a floating island in this playful block-world experiment. Place, remove, and rearrange colorful terrain." },
    { property: "og:title", content: "Aetherfield — A little world to shape" },
    { property: "og:description", content: "Shape a floating island in this playful block-world experiment. Place, remove, and rearrange colorful terrain." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Aetherfield,
});
