import dayjs from "dayjs";

export function isValidJson(json: string) {
  try {
    JSON.parse(json);
    return true;
  } catch {
    return false;
  }
}

dayjs.locale("pt-br");

export function isSubscriptionActive(expiryDate: string) {
  const today = dayjs().format("YYYY-MM-DD");
  return dayjs(expiryDate).isAfter(today);
}
