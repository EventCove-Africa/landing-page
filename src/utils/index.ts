import Cookies from "js-cookie";

export const openNewTabWithUrl = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export function redirectUrls(route: string) {
  if (typeof window !== "undefined") {
    window.location.href = route;
  }
}

export function formatToNaira(amount: number): string {
  if (isNaN(amount)) {
    throw new Error("Invalid amount provided. Please provide a valid number.");
  }
  return `₦${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function _handleClearCookiesAndSession(...cookieNames: string[]) {
  cookieNames.forEach((name) => Cookies.remove(name));
  sessionStorage.clear();
}

export function _handleThrowErrorMessage(message: string) {
  const err = message || "Something went wrong, please try again later";
  return err;
}