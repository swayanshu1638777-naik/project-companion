import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Student Registration — Smart College" }, { name: "description", content: "Create a Smart College student portal account." }, { property: "og:title", content: "Student Registration — Smart College" }, { property: "og:description", content: "Create a Smart College student portal account." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: RegisterPage,
});
function RegisterPage() { return <AuthPage register />; }
