import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { HabitSelector } from "@/components/habit-selector";
import { HabitList } from "@/components/habit-list";
import type { HabitType } from "@/components/card-habit";

export default function SuccessHabits() {
  const [selectedHabit, setSelectedHabit] = useState<HabitType>("Diário");

  return (
    <Layout title="Hábitos de Sucesso">
      <HabitSelector
        selectedHabit={selectedHabit}
        onSelectHabit={setSelectedHabit}
      />

      <HabitList selectedHabit={selectedHabit} />
    </Layout>
  );
}
