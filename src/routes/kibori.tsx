import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/kibori")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
