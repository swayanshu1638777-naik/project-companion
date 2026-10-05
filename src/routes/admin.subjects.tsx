import { createFileRoute } from "@tanstack/react-router";
import { DirectoryPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/admin/subjects")({
  head: () => ({ meta: [{ title: "Subject Catalogue — Smart College" }, { name: "description", content: "Manage Smart College subjects by branch and semester." }, { property: "og:title", content: "Subject Catalogue — Smart College" }, { property: "og:description", content: "Manage Smart College subjects by branch and semester." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: SubjectsPage,
});
function SubjectsPage() { return <DirectoryPage kind="subjects" />; }
