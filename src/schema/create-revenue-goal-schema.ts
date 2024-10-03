import { MONTHS } from "@/constants/months";
import z from "zod";

const actionSchema = z.array(
  z.object({
    description: z.string().min(1, "Description is required"),
  }),
);

const actualMonthInNumber = new Date().getMonth();
const actualMonth = MONTHS[actualMonthInNumber];

export const createRevenueGoalSchema = z.object({
  month: z.enum(MONTHS).default(actualMonth),
  monthlyGoal: z.string().optional(),
  dailyGoal: z.string().optional(),
  action: actionSchema.optional(),
});

export type CreateRevenueGoalSchema = z.infer<typeof createRevenueGoalSchema>;
