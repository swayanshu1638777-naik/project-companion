import { createFileRoute } from "@tanstack/react-router";
import { TeacherDashboardPage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/teacher/")({
  head: () => ({ meta: [{ title: "Faculty Dashboard — Smart College" }, { name: "description", content: "Overview of your subjects, students, and attendance." }, { property: "og:title", content: "Faculty Dashboard — Smart College" }, { property: "og:description", content: "Overview of your subjects, students, and attendance." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TeacherDashboardPage,
});
