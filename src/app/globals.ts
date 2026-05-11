// 1. استيراد الملف الأساسي
import enMessages from "@/i18n/messages/en.json";
// 2. استيراد ملف المستخدمين الجديد
import userMessages from "@/i18n/messages/users/en.json";
import { routing } from "@/i18n/routing";

// 3. دمج الأنواع برمجياً لإنشاء مرجع كامل لـ TypeScript
const allMessages = {
  ...enMessages,
  ...userMessages,
};

type Messages = typeof allMessages;

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
