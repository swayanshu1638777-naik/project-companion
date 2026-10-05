import { createFileRoute } from "@tanstack/react-router";
import { StudentPerformancePage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/student/performance")({
  head: () => ({ meta: [{ title: "My Performance — Smart College" }, { name: "description", content: "Track your score trends across exams." }, { property: "og:title", content: "My Performance — Smart College" }, { property: "og:description", content: "Track your score trends across exams." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: StudentPerformancePage,
});
