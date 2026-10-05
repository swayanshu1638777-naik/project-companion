import { createFileRoute } from "@tanstack/react-router";
import { ReportsPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({ meta: [{ title: "College Reports — Smart College" }, { name: "description", content: "Generate Smart College attendance and performance reports." }, { property: "og:title", content: "College Reports — Smart College" }, { property: "og:description", content: "Generate Smart College attendance and performance reports." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: ReportsPageRoute,
});
function ReportsPageRoute() { return <ReportsPage />; }
