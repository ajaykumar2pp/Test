import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/authOptions";

export async function requireRole(allowedRoles = []) {
  const session = await getServerSession(authOptions);
  // console.log("session require :", session)

  // Not logged in
  if (!session) {
    redirect("/login");
  }

  // Role not allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    redirect("/login");
  }

  // if (!session || !allowedRoles.includes(session.user.role)) {
  //   redirect("/login");
  // }

  return session.user;
}