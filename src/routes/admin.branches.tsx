import { createFileRoute } from "@tanstack/react-router";
import { DirectoryPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/admin/branches")({
  head: () => ({ meta: [{ title: "Manage Branches — Smart College" }, { name: "description", content: "Manage academic branches in the Smart College portal." }, { property: "og:title", content: "Manage Branches — Smart College" }, { property: "og:description", content: "Manage academic branches in the Smart College portal." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: BranchesPage,
});
function BranchesPage() { return <DirectoryPage kind="branches" />; }
