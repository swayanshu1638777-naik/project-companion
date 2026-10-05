import { createFileRoute } from "@tanstack/react-router";
import { TeacherMarksPage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/teacher/marks")({
  head: () => ({ meta: [{ title: "Enter Marks — Smart College" }, { name: "description", content: "Enter exam marks for your classes." }, { property: "og:title", content: "Enter Marks — Smart College" }, { property: "og:description", content: "Enter exam marks for your classes." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TeacherMarksPage,
});
