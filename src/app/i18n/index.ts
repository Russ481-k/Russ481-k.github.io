"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getOptions } from "./settings";
import { resources } from "./resources";

// Initialize a global i18next instance synchronously so that
// react-i18next's useTranslation() works on the very first render.
if (!i18next.isInitialized) {
  i18next.use(initReactI18next).init({
    resources,
    ...getOptions(),
  });
}

export async function getTranslation(
  lng: string,
  ns: string,
  options: { keyPrefix?: string } = {}
) {
  if (i18next.language !== lng) {
    await i18next.changeLanguage(lng);
  }
  return {
    t: i18next.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18next,
  };
}
