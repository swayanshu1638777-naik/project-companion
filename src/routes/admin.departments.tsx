import { createFileRoute } from "@tanstack/react-router";
import { DirectoryPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/admin/departments")({
  head: () => ({ meta: [{ title: "Manage Departments — Smart College" }, { name: "description", content: "Manage academic departments in the Smart College portal." }, { property: "og:title", content: "Manage Departments — Smart College" }, { property: "og:description", content: "Manage academic departments in the Smart College portal." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: DepartmentsPage,
});
function DepartmentsPage() { return <DirectoryPage kind="departments" />; }
