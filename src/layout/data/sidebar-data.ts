import PERMS from "@/configs/all-permissions";

import { SidebarData } from "../dashboard/sidebar/types";

export const sidebarData: SidebarData = {
  quickActions: {
    // items: [
    //   {
    //     icon: "lucide:users",
    //     title: "Users",
    //     url: "/users",
    //     actions: [],
    //     keywords: [
    //       "users",
    //       "مستخدمين",
    //       "إدارة المستخدمين",
    //       "user management",
    //       "add user",
    //       "إضافة مستخدم",
    //       "edit user",
    //       "تعديل مستخدم",
    //       "view users",
    //       "عرض المستخدمين",
    //     ],
    //   },
    //   {
    //     icon: "lucide:graduation-cap",
    //     title: "Students",
    //     url: "/students",
    //     actions: [],
    //     keywords: [
    //       "students",
    //       "طلاب",
    //       "إدارة المستخدمين",
    //       "إدارة الطلاب",
    //       "add student",
    //       "إضافة مستخدم",
    //       "edit student",
    //       "تعديل مستخدم",
    //       "view students",
    //       "عرض الطلاب",
    //     ],
    //   },
    // ],
  },
  navGroups: [
    {
      title: "Settings",
      actions: [],
      items: [
        {
          title: "System Settings",
          url: "/system-settings",
          icon: "lucide:settings",
          actions: [],
          keywords: ["system settings", "إعدادات النظام"],
        },
        {
          title: "Years",
          url: "/years",
          icon: "lucide:calendar",
          actions: [],
          keywords: ["years", "سنوات"],
        },
        {
          title: "Users",
          url: "/users",
          icon: "lucide:users",
          actions: [],
          keywords: ["users", "مستخدمين"],
        },
        {
          title: "Students",
          url: "/students",
          icon: "lucide:graduation-cap",
          actions: [],
          keywords: ["students", "طلاب"],
        },
        {
          title: "Locations",
          url: "/locations",
          icon: "lucide:map-pin",
          actions: [],
          keywords: ["locations", "مواقع"],
        },
        {
          title: "Courses",
          url: "/courses",
          icon: "lucide:book-open",
          actions: [],
          keywords: ["courses", "كورسات"],
        },
        {
          title: "Announcements",
          url: "/announcements",
          icon: "lucide:megaphone",
          actions: [],
          keywords: ["announcements", "اعلانات"],
        },
        {
          title: "Lectures Schedule",
          url: "/lectures-schedule",
          icon: "lucide:calendar",
          actions: [],
          keywords: ["lectures schedule", "جدول المحاضرات"],
        },
      ],
    },
  ],
};
