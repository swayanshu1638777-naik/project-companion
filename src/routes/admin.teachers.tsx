import { createFileRoute } from "@tanstack/react-router";
import { DirectoryPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/admin/teachers")({
  head: () => ({ meta: [{ title: "Faculty Directory — Smart College" }, { name: "description", content: "Manage Smart College faculty records." }, { property: "og:title", content: "Faculty Directory — Smart College" }, { property: "og:description", content: "Manage Smart College faculty records." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TeachersPage,
});
function TeachersPage() { return <DirectoryPage kind="teachers" />; }
