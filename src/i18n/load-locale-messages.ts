// src/i18n/load-locale-messages.ts
import { Locale } from "next-intl";

export async function loadLocaleMessages(locale: Locale) {
  try {
    // 1. تحميل الملف الأساسي
    const mainMessages = (await import(`./messages/${locale}.json`)).default;

    // 2. تحميل ملف المستخدمين
    const userMessages = (await import(`./messages/users/${locale}.json`))
      .default;

    // 3. دمج الملفين وإرجاعهما (هذا هو السطر المنقذ)
    return {
      ...mainMessages,
      ...userMessages,
    };
  } catch (error) {
    console.error("Error loading localization files:", error);

    // في حال فشل تحميل ملف users، نرجع الملف الأساسي فقط كاحتياط
    try {
      return (await import(`./messages/${locale}.json`)).default;
    } catch (fallbackError) {
      console.error(
        "Critical: Could not load any translation file",
        fallbackError
      );
      return {};
    }
  }
}
