import { MONTHS } from "@/constants/months";
import z from "zod";

export const getRevenueGoalsByMonthSchema = z.object({
  month: z.enum(MONTHS),
});

export type GetRevenueGoalsByMonthSchema = z.infer<
  typeof getRevenueGoalsByMonthSchema
>;
