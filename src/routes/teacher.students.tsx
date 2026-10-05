import { createFileRoute } from "@tanstack/react-router";
import { TeacherStudentsPage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/teacher/students")({
  head: () => ({ meta: [{ title: "My Students — Smart College" }, { name: "description", content: "Roster of students in your assigned classes." }, { property: "og:title", content: "My Students — Smart College" }, { property: "og:description", content: "Roster of students in your assigned classes." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TeacherStudentsPage,
});
