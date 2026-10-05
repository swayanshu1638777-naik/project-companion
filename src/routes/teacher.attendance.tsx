import { createFileRoute } from "@tanstack/react-router";
import { TeacherAttendancePage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/teacher/attendance")({
  head: () => ({ meta: [{ title: "Mark Attendance — Smart College" }, { name: "description", content: "Mark daily class attendance for your students." }, { property: "og:title", content: "Mark Attendance — Smart College" }, { property: "og:description", content: "Mark daily class attendance for your students." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TeacherAttendancePage,
});
