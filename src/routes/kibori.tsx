import { createFileRoute } from "@tanstack/react-router";
import { KiboriLandingPage } from "@/shaders/kibori-landing-page/KiboriLandingPage";
import "../shaders/threeui.css";

export const Route = createFileRoute("/kibori")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "KIBORI — 木彫" },
      {
        name: "description",
        content:
          "Eight Japanese woodcrafts, from kumiko lattice to the kanna plane, made to commission in Kyoto.",
      },
      { name: "theme-color", content: "#0a0806" },
      { property: "og:title", content: "KIBORI — 木彫" },
      {
        property: "og:description",
        content: "Explore eight interactive Japanese woodcrafts in a cinematic Kyoto workshop.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KiboriPage,
});

function KiboriPage() {
  return (
    <main
      className="shader-frame"
      aria-label="Kibori woodcraft workshop"
      style={{ width: "100%", height: "100dvh", background: "#0a0806" }}
    >
      <KiboriLandingPage />
    </main>
  );
}
