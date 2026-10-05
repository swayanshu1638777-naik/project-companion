import { createFileRoute } from "@tanstack/react-router";
import { StudentDashboardPage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/student/")({
  head: () => ({ meta: [{ title: "Student Dashboard — Smart College" }, { name: "description", content: "Your attendance, marks, and subjects at a glance." }, { property: "og:title", content: "Student Dashboard — Smart College" }, { property: "og:description", content: "Your attendance, marks, and subjects at a glance." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: StudentDashboardPage,
});
