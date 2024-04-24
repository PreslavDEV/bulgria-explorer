import { NativeModules } from "react-native";

import bgDict from "../translation/bg.json";
import enDict from "../translation/en.json";

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "bg"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

const dictionaries = {
  en: enDict,
  bg: bgDict,
};

export const getDictionary = (locale: Locale) =>
  dictionaries[locale] ?? dictionaries.en;

export type Dictionary = ReturnType<typeof getDictionary>;

export const locale = NativeModules.I18nManager.localeIdentifier.split("_")[0];
