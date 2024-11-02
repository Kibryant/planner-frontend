export const DAYS = {
  Segunda: "MONDAY",
  Terça: "TUESDAY",
  Quarta: "WEDNESDAY",
  Quinta: "THURSDAY",
  Sexta: "FRIDAY",
  Sábado: "SATURDAY",
  Domingo: "SUNDAY",
} as const;

export const DAYS_ARRAY = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

export type DAYS_TYPE =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
