
"use client";

import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });

      toast.success("You have been logged out.");
      router.replace("/login");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return { handleLogout };
}