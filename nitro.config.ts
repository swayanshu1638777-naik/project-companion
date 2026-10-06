import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  routeRules: {
    "/**": {
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Strict-Transport-Security": "max-age=63072000",
      },
    },
    "/landing-pages/kibori-assets/**": {
      // The authored iframe has an opaque sandbox origin; its public fonts need CORS.
      headers: { "Access-Control-Allow-Origin": "*" },
    },
  },
});
