import PERMS from "@/configs/all-permissions";

import { SidebarData } from "../dashboard/sidebar/types";

export const sidebarDataCollapsed: SidebarData = {
  quickActions: {
    // items: [
    //   {
    //     icon: "f7:building-fill",
    //     title: "Users",
    //     variant: "default",
    //     url: "/users",
    //     actions: [PERMS.USER.READ],
    //   },
    //   {
    //     icon: "lucide:graduation-cap",
    //     title: "Students",
    //     variant: "default",
    //     url: "/students",
    //     actions: [PERMS.USER.READ],
    //   },
    // ],
  },
  navGroups: [
    {
      title: "Main Navigation",
      actions: [],
      items: [
        {
          title: "Users",
          url: "/users",
          icon: "f7:building-fill",
          actions: [PERMS.USER.READ],
        },
        {
          title: "Students",
          url: "/students",
          icon: "lucide:graduation-cap",
          actions: [PERMS.USER.READ],
        },
      ],
    },
  ],
};
