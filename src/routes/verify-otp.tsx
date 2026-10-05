import { createFileRoute } from "@tanstack/react-router";
import { VerifyOtpPage } from "@/components/RolePortalPages";

export const Route = createFileRoute("/verify-otp")({
  head: () => ({ meta: [{ title: "Verify OTP — Smart College" }, { name: "description", content: "Verify your Smart College account with a one-time code." }, { property: "og:title", content: "Verify OTP — Smart College" }, { property: "og:description", content: "Verify your Smart College account with a one-time code." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: VerifyOtpPage,
});
