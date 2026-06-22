import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves this project from the /galeria.lk/ subpath (repo name).
  base: "/galeria.lk/",
  server: { host: "::", port: 8080 },
  resolve: {
    // Resolve the "@/*" -> "./src/*" alias from tsconfig.json natively (Vite 8+).
    tsconfigPaths: true,
    // Dedupe so SSR's react-server runtime and the client share one React copy.
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
    ],
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
      // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
      server: { entry: "server" },
      // Prerender routes to static HTML (dist/client/index.html) so static hosts
      // like GitHub Pages can serve the page content; it then hydrates client-side.
      prerender: { enabled: true },
    }),
    viteReact(),
  ],
});
