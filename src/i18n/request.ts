// src/i18n/request.ts
import { getRequestConfig } from "next-intl/server";

import { loadLocaleMessages } from "./load-locale-messages";
// تأكدي من الأقواس هنا
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = (await requestLocale) as Locale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale as Locale;
  }

  // استلام الرسائل المدمجة
  const messages = await loadLocaleMessages(locale);

  return {
    locale,
    messages,
    getMessageFallback({ key }) {
      const splitted = key.split(".");
      return splitted[splitted.length - 1];
    },
    onError(error) {
      if (error.code === "MISSING_MESSAGE") return;
      console.error(error);
    },
    timeZone: "Asia/Riyadh",
  };
});
