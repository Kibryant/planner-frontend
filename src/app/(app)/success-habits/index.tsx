import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { HabitSelector } from "@/components/habit-selector";
import { HabitList } from "@/components/habit-list";

export default function SuccessHabits() {
  const [selectedHabit, setSelectedHabit] = useState("Diário");

  return (
    <Layout title="Hábitos de Sucesso">
      <HabitSelector
        selectedHabit={selectedHabit}
        onSelectHabit={setSelectedHabit}
      />

      <HabitList />
    </Layout>
  );
}
