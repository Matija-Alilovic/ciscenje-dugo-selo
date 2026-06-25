export const TOAST_EVENT = "ciscenje-app-toast";

export type ToastPayload = {
  message: string;
  href?: string;
  hrefLabel?: string;
};

export function showToast(payload: ToastPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<ToastPayload>(TOAST_EVENT, { detail: payload }));
}
