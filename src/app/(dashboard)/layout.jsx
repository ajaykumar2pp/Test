import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/sidebar/app-sidebar";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

import { Bell } from "lucide-react";

import { redirect } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const isMale = session?.user?.gender === "Male";

  const theme = isMale
    ? {
        header:
          "bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-100 border-blue-200",

        main: "bg-gradient-to-br from-blue-50 via-white to-cyan-50",

        title: "text-blue-700",

        badge: "bg-blue-100 text-blue-700 border border-blue-200",

        avatar: "bg-blue-600",

        welcome: "text-blue-600",

        notification: "hover:bg-blue-100",
      }
    : {
        header:
          "bg-gradient-to-r from-pink-50 via-rose-50 to-fuchsia-100 border-pink-200",

        main: "bg-gradient-to-br from-pink-50 via-white to-rose-50",

        title: "text-pink-700",

        badge: "bg-pink-100 text-pink-700 border border-pink-200",

        avatar: "bg-pink-500",

        welcome: "text-pink-600",

        notification: "hover:bg-pink-100",
      };

  return (
    <SidebarProvider>
      <AppSidebar session={session} />

      <SidebarInset>
        <header
          className={`
    h-16 border-b
    flex items-center justify-between
    px-3 sm:px-4 md:px-6
    backdrop-blur-xl
    sticky top-0 z-50
    print:hidden
    ${theme.header}
  `}
        >
          {/* Left */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <SidebarTrigger />

            <div className="min-w-0">
              {/* Title + Badge */}
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <h1
                  className={`
            text-lg sm:text-xl md:text-2xl
            font-bold tracking-tight
            truncate
            ${theme.title}
          `}
                >
                  {session?.user?.role === "ADMIN"
                    ? "Admin Dashboard"
                    : "User Dashboard"}
                </h1>

                <span
                  className={`
            rounded-full
            px-2 py-0.5
            sm:px-3 sm:py-1
            text-[10px] sm:text-xs
            font-semibold
            shadow-sm
            whitespace-nowrap
            ${theme.badge}
          `}
                >
                  {session?.user?.role}
                </span>
              </div>

              {/* Welcome */}
              <div className="hidden sm:flex items-center mt-1 min-w-0">
                <span className="text-xs md:text-sm text-slate-600">
                  Welcome back,
                </span>

                <span
                  className={`
            ml-2
            text-xs md:text-sm
            font-semibold
            truncate max-w-45 md:max-w-75
            ${theme.welcome}
          `}
                >
                  {session?.user?.fullName || session?.user?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 shadow-lg cursor-pointer">
              <AvatarFallback
                className={`
          text-white
          text-sm sm:text-base
          font-bold
          ${theme.avatar}
        `}
              >
                {session?.user?.fullName?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Main */}
        <main
          className={`
            flex-1 overflow-y-auto p-6
            min-h-screen
            ${theme.main}
          `}
        >
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
