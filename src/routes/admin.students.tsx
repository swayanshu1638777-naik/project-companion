import { createFileRoute } from "@tanstack/react-router";
import { StudentsPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/admin/students")({
  head: () => ({ meta: [{ title: "Student Directory — Smart College" }, { name: "description", content: "Search, filter, add, and manage Smart College students." }, { property: "og:title", content: "Student Directory — Smart College" }, { property: "og:description", content: "Search, filter, add, and manage Smart College students." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: StudentsPageRoute,
});
function StudentsPageRoute() { return <StudentsPage />; }
