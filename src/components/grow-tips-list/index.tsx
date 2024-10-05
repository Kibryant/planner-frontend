import React from "react";
import { ScrollView } from "react-native";
import { TipItem } from "../grow-tip-item";

const dicas = [
  { id: 1, text: "Planejar com pelo menos 15 dias de antecedência" },
  { id: 2, text: "Aproveitar essas datas para liquidar o estoque" },
  { id: 3, text: "Buscar parcerias para sua marca" },
  { id: 4, text: "Decorar o salão para entrar no clima da data" },
  { id: 5, text: "Se preparar para criar e divulgar as ações" },
  { id: 6, text: "Evitar baixar preços unitários" },
  { id: 7, text: "Oferecer combos e pacotes" },
  { id: 8, text: "Fazer promoções relâmpago" },
];

export function TipsList() {
  return (
    <ScrollView className="mt-5 px-2 py-4" persistentScrollbar>
      {dicas.map((dica) => (
        <TipItem key={dica.id} id={dica.id} text={dica.text} />
      ))}
    </ScrollView>
  );
}
