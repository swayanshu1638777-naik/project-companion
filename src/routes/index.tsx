import { createFileRoute } from "@tanstack/react-router";
import { CollegeHomepage } from "@/components/CollegeHomepage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart College — A place to grow" },
      {
        name: "description",
        content: "One thoughtfully connected campus. Attendance, marks and academic records for students, teachers and administrators.",
      },
      { property: "og:title", content: "Smart College — A place to grow" },
      {
        property: "og:description",
        content: "One thoughtfully connected campus for students, teachers and administrators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollegeHomepage,
});
