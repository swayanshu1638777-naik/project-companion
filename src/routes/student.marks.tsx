import { createFileRoute } from "@tanstack/react-router";
import { StudentMarksPage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/student/marks")({
  head: () => ({ meta: [{ title: "My Marks — Smart College" }, { name: "description", content: "View your exam marks across all assessments." }, { property: "og:title", content: "My Marks — Smart College" }, { property: "og:description", content: "View your exam marks across all assessments." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: StudentMarksPage,
});
