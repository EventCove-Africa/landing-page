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
