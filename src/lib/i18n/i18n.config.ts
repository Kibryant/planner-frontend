import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ptBR from "./pt-br.json";
import es from "./es.json";
import { getLocales } from "expo-localization";

const deviceLanguage = getLocales()[0].languageCode;

const resources = {
  pt: {
    translation: ptBR,
  },
  es: {
    translation: es,
  },
};

i18next.use(initReactI18next).init({
  compatibilityJSON: "v4",
  debug: process.env.NODE_ENV === "development",
  lng: deviceLanguage || "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18next;
