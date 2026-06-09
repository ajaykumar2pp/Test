import {
  LayoutDashboard,
  Users,
  Settings,
  Upload
} from "lucide-react";

export const dashboardNav = {
  ADMIN: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    // {
    //   title: "Settings",
    //   url: "/admin/settings",
    //   icon: Settings,
    // },
  ],

  USER: [
    {
      title: "Dashboard",
      url: "/user",
      icon: LayoutDashboard,
    },
    {
      title: "Upload Resume",
       url: "/user/upload-resume",
      icon: Upload,
    },
    // {
    //   title: "Settings",
    //   url: "/user/settings",
    //   icon: Settings,
    // },
  ],
};