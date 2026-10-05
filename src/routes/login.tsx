import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/SmartCollegePortal";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Smart College" }, { name: "description", content: "Access the Smart College portal for administrators, teachers, and students." }, { property: "og:title", content: "Sign In — Smart College" }, { property: "og:description", content: "Access the Smart College portal for administrators, teachers, and students." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: LoginPage,
});
function LoginPage() { return <AuthPage />; }
