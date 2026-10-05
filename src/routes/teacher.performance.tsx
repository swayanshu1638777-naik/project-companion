import { createFileRoute } from "@tanstack/react-router";
import { TeacherPerformancePage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/teacher/performance")({
  head: () => ({ meta: [{ title: "Class Performance — Smart College" }, { name: "description", content: "Class score distribution by exam." }, { property: "og:title", content: "Class Performance — Smart College" }, { property: "og:description", content: "Class score distribution by exam." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TeacherPerformancePage,
});
