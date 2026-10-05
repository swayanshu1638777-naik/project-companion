import { createFileRoute } from "@tanstack/react-router";
import { AttendancePage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/student/attendance")({
  head: () => ({ meta: [{ title: "My Attendance — Smart College" }, { name: "description", content: "View Smart College student attendance records." }, { property: "og:title", content: "My Attendance — Smart College" }, { property: "og:description", content: "View Smart College student attendance records." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AttendancePageRoute,
});
function AttendancePageRoute() { return <AttendancePage />; }
