import { LayoutDashboard, Users, Upload, MessageSquare } from "lucide-react";

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
    {
      title: "Feedback",
      url: "/user/feedback",
      icon: MessageSquare,
    },
  ],
};
