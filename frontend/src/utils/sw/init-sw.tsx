import { registerSW } from "virtual:pwa-register";

export const initServiceWorker = () => {
  registerSW({
    immediate: true,
  });
};
