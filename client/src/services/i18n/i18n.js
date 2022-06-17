import i18n from "i18next";

import { initReactI18next } from "react-i18next";

import { enTranslations } from "./translation/en";
import { ruTranslations } from "./translation/ru";

const resources = {
  en: enTranslations,
  ru: ruTranslations,
};

i18n.use(initReactI18next).init({
  compatiblityJSON: "v3",
  lng: "en",
  fallbackLng: "en",
  resources,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
