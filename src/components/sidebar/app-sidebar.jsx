"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { dashboardNav } from "@/config/dashboard-nav.js";

import { useLogout } from "@/components/auth/LogoutButton";

import {
  LogOut,
  Sparkles,
} from "lucide-react";

export function AppSidebar({ session }) {
  const pathname = usePathname();

  const { handleLogout } = useLogout();

  if (!session) return null;

  const role =
    session?.user?.role;

  const navItems =
    dashboardNav[
      role?.toUpperCase()
    ] ?? [];

  const isMale =
    session?.user?.gender === "Male";

  // Theme
  const theme = isMale
    ? {
        sidebar:
          "bg-gradient-to-b from-blue-600 to-cyan-500",

        active:
          "bg-white text-blue-700 shadow-md",

        hover:
          "hover:bg-white/10 hover:text-white",

        avatar:
          "bg-white text-blue-700",

        logout:
          "bg-white text-blue-700 hover:bg-blue-100",

        label:
          "text-blue-100",

        card:
          "bg-white/10 border border-white/20",

        logo:
          "bg-white/15",
      }
    : {
        sidebar:
          "bg-gradient-to-b from-pink-500 to-fuchsia-500",

        active:
          "bg-white text-pink-700 shadow-md",

        hover:
          "hover:bg-white/10 hover:text-white",

        avatar:
          "bg-white text-pink-700",

        logout:
          "bg-white text-pink-700 hover:bg-pink-100",

        label:
          "text-pink-100",

        card:
          "bg-white/10 border border-white/20",

        logo:
          "bg-white/15",
      };

  return (
    <Sidebar className="border-r-0">
      {/* IMPORTANT WRAPPER */}
      <div
        className={`
          h-full min-h-screen
          flex flex-col text-white
          ${theme.sidebar}
        `}
      >
        {/* Header */}
        <SidebarHeader className="border-b border-white/10">
          <div className="px-4 py-5">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div
                className={`
                  h-11 w-11 rounded-2xl
                  flex items-center justify-center
                  backdrop-blur-xl
                  ${theme.logo}
                `}
              >
                <Sparkles size={20} />
              </div>

              {/* Title */}
              <div>
                <h2 className="text-lg font-bold leading-none">
                  Resume Analyzer
                </h2>

                <p className="text-xs text-white/80 mt-1">
                  AI Dashboard
                </p>
              </div>
            </div>
          </div>
        </SidebarHeader>

        {/* Navigation */}
        <SidebarContent className="px-3 py-4 flex-1">
          <SidebarGroup>
            <SidebarGroupLabel
              className={`
                uppercase text-[11px]
                tracking-[0.2em]
                mb-3 px-2
                ${theme.label}
              `}
            >
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.url;

                  return (
                    <SidebarMenuItem
                      key={item.url}
                    >
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`
                          h-12 rounded-2xl px-4
                          transition-all duration-300
                          ${
                            isActive
                              ? theme.active
                              : `text-white ${theme.hover}`
                          }
                        `}
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          <item.icon size={18} />

                          <span className="font-medium text-sm">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-white/10 p-4">
          <div
            className={`
              rounded-3xl p-4
              backdrop-blur-xl
              ${theme.card}
            `}
          >
            {/* User */}
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11 shadow-md">
                <AvatarFallback
                  className={`
                    font-bold
                    ${theme.avatar}
                  `}
                >
                  {session?.user?.fullName
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="overflow-hidden">
                <h2 className="text-sm font-semibold truncate">
                  {session.user?.fullName ||
                    "User"}
                </h2>

                <p className="text-xs text-white/80 truncate">
                  {session.user?.email}
                </p>
              </div>
            </div>

            {/* Logout */}
            <Button
              size="sm"
              onClick={handleLogout}
              className={`
                mt-4 w-full h-11 rounded-2xl
                font-semibold
                transition-all duration-300
                cursor-pointer
                hover:scale-[1.02]
                hover:shadow-md
                ${theme.logout}
              `}
            >
              <LogOut size={17} />

              <span className="ml-2">
                Logout
              </span>
            </Button>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  );
}