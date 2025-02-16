import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./globals.css";
import { configure } from "mobx";
import { initZodLocale } from "@/utils/locale/zod";
import "@fontsource-variable/inter";
import "regenerator-runtime/runtime";

initZodLocale();

initServiceWorker();

configure({
  enforceActions: "never",
});

import { routeTree } from "../routeTree.gen";
import { initServiceWorker } from "@/utils/sw/init-sw";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <>
      <RouterProvider router={router} />
    </>,
  );
}
