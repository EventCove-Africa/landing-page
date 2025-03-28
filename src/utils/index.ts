/* eslint-disable @typescript-eslint/no-explicit-any */

import Cookies from "js-cookie";

export const openNewTabWithUrl = (url: string) => {
  if (typeof window !== "undefined") {
    const newWindow = window.open(url, "_blank");
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      // Fallback: Open in the same tab if blocked
      window.location.href = url;
    }
  }
};

export const legalURL = "https://eventcove-africa.gitbook.io/legal";

export const isArrayEmpty = (arr: any[]): boolean => arr.length === 0;

export const isObjectEmpty = (obj: Record<string, unknown>): boolean => {
  return Object?.keys(obj)?.length === 0;
};

export function redirectUrls(route: string) {
  if (typeof window !== "undefined") {
    window.location.href = route;
  }
}

export function formatToNaira(amount: number = 0): string {
  if (isNaN(amount)) {
    throw new Error("Invalid amount provided. Please provide a valid number.");
  }
  return `₦${amount?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function _handleClearCookiesAndSession(...cookieNames: string[]) {
  cookieNames.forEach((name) => Cookies.remove(name));
  sessionStorage.clear();
}

export function _handleThrowErrorMessage(message: string) {
  const err = message || "Something went wrong, please try again later";
  return err;
}

// Function to get the ordinal suffix (st, nd, rd, th)
function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return "th"; // Special case for 11, 12, 13
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function arrayToFormattedDate([year, month, day]: [
  number,
  number,
  number
]): string {
  const date = new Date(year, month - 1, day); // Month is 0-based in JavaScript Date
  const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  const formattedDate = date.toLocaleDateString("en-GB", options);
  return formattedDate.replace(
    /\d+/,
    (d) => `${d}${getOrdinalSuffix(Number(d))}`
  );
}

export const arrayToFormattedDateWithYear = (
  dateArray: [number, number, number]
): string => {
  const [year, month, day] = dateArray;
  const date = new Date(year, month - 1, day); // Month is zero-based
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatTimeToshowAmPm = (timeString: string = "24:00"): string => {
  const [hours, minutes] = timeString?.split(":")?.map(Number);
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
  return `${formattedHours}:${minutes?.toString().padStart(2, "0")}${period}`;
};

export function setDataINCookies(tokens: Record<any, any>) {
  Object.entries(tokens).forEach(([key, value]) => {
    Cookies.set(key, value, {
      expires: 1, // Expires in 1 daY
      secure: true, // Only send over HTTPS
      sameSite: "strict", // Protection against CSRF
    });
  });
}

export const calculateTotalAmountForBuyers = (
  price: any,
  QTY: any,
  chargePercent: any
): any => {
  const charges = chargePercent * price;
  const chargeValue = charges + 100;
  const fullAmountForATicket = chargeValue + price;
  const totalAmount = fullAmountForATicket * QTY;
  return totalAmount;
};

export const toBoolean = (value: any): boolean => {
  return value?.toLowerCase() === "true";
};
