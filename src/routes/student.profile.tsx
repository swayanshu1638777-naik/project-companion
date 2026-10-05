import { createFileRoute } from "@tanstack/react-router";
import { StudentProfilePage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/student/profile")({
  head: () => ({ meta: [{ title: "My Profile — Smart College" }, { name: "description", content: "Your official enrollment details." }, { property: "og:title", content: "My Profile — Smart College" }, { property: "og:description", content: "Your official enrollment details." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: StudentProfilePage,
});
