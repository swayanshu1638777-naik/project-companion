import { createFileRoute } from "@tanstack/react-router";
import { DashboardPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Smart College" }, { name: "description", content: "Monitor students, faculty, departments, attendance, and academic performance." }, { property: "og:title", content: "Admin Dashboard — Smart College" }, { property: "og:description", content: "Monitor students, faculty, departments, attendance, and academic performance." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: AdminPage,
});
function AdminPage() { return <DashboardPage />; }
