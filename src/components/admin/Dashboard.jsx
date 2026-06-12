"use client";

import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { ShieldCheck, FileText } from "lucide-react";
import { Users, MessageSquare , UserCheck, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard({ stats }) {
  const [userList, setUserList] = useState([]);
  const handleRoleChange = async (userId, role) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserList((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, role } : user)),
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (userId) => {
    // const confirmed = window.confirm(
    //   "Delete this user?"
    // );

    // if (!confirmed) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      // console.log("Delete response:", data);

      if (!response.ok) {
        throw new Error(data.message);
      }

      setUserList((prev) => prev.filter((user) => user.id !== userId));

      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <p className="text-slate-500">Manage platform users</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2  xl:grid-cols-4 ">
        {/* Total Users */}
        <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Users</p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {stats.totalUsers}
                </h3>
              </div>

              <div className="rounded-2xl bg-blue-100 p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Admins */}
        <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Admins</p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {stats.totalAdmins}
                </h3>
              </div>

              <div className="rounded-2xl bg-red-100 p-3">
                <ShieldCheck className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Resumes */}
        <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Resumes</p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {stats.totalResumes}
                </h3>
              </div>

              <div className="rounded-2xl bg-emerald-100 p-3">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Feedbacks */}
        <Card className="rounded-[28px] border-0 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Feedbacks</p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {stats.totalFeedbacks || 0}
                </h3>
              </div>

              <div className="rounded-2xl bg-blue-100 p-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <Card className="mt-8 overflow-hidden rounded-3xl border-0 shadow-lg">
        <CardContent className="p-0">
          {/* Table Header */}
          <div
            className="
        hidden md:grid
        md:grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_80px]
        items-center
        gap-4
        bg-slate-100
        px-6 py-4
        font-semibold
        text-slate-700
      "
          >
            <p>Name</p>

            <p>Email</p>

            <p>Gender</p>

            <p>Role</p>

            <p>Created</p>

            <p>Action</p>
          </div>

          {/* Table Body */}
          {userList.map((user) => (
            <div
              key={user.id}
              className="
          grid gap-4 border-t
          px-6 py-5
          md:grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_80px]
          items-center
          transition-all duration-300
          hover:bg-slate-50
        "
            >
              {/* NAME */}
              <div className="flex items-center gap-3 min-w-0">
                <Avatar
                  className={`h-11 w-11 shrink-0 border shadow-md ${
                    user.role === "ADMIN"
                      ? "border-red-200 bg-linear-to-br from-red-500 to-orange-500"
                      : user.gender === "Male"
                        ? "border-blue-200 bg-linear-to-br from-blue-500 to-cyan-500"
                        : "border-pink-200 bg-linear-to-br from-pink-500 to-fuchsia-500"
                  }`}
                >
                  <AvatarFallback className="bg-transparent font-semibold text-white">
                    {user.fullName
                      ?.split(" ")
                      .map((name) => name.charAt(0))
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p
                    className={`
        wrap-break-words whitespace-normal
        text-sm font-semibold
        ${
          user.role === "ADMIN"
            ? "text-red-700"
            : user.gender === "Male"
              ? "text-blue-700"
              : "text-pink-700"
        }
      `}
                  >
                    {user.fullName}
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div
                className={`
    min-w-0 break-all text-sm font-medium
    ${
      user.role === "ADMIN"
        ? "text-red-600"
        : user.gender === "Male"
          ? "text-blue-600"
          : "text-pink-600"
    }
  `}
              >
                {user.email}
              </div>

              {/* GENDER */}
              <div>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    user.gender === "Male"
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-pink-100 text-pink-700 border border-pink-200"
                  }`}
                >
                  {user.gender}
                </span>
              </div>

              {/* ROLE */}
              <div>
                <Select
                  value={user.role}
                  onValueChange={(value) => handleRoleChange(user.id, value)}
                >
                  <SelectTrigger
                    className={`w-full font-semibold cursor-pointer ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-600 border-red-200"
                        : user.gender === "Male"
                          ? "bg-blue-100 text-blue-600 border-blue-200"
                          : "bg-pink-100 text-pink-600 border-pink-200"
                    }`}
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ADMIN">Admin</SelectItem>

                      <SelectItem value="USER">User</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* DATE */}
              <div
                className="
            text-sm text-slate-600
            wrap-break-words
          "
              >
                {format(new Date(user.createdAt), "dd MMM yyyy, hh:mm a")}
              </div>

              {/* DELETE */}
              <div className="flex justify-start md:justify-center">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      className="
                  rounded-xl bg-red-100
                  p-2 text-red-600
                  transition-all duration-300
                  hover:bg-red-200
                  hover:scale-105
                  cursor-pointer
                "
                    >
                      <Trash2 size={18} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete User?</AlertDialogTitle>

                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete
                        <span className="font-semibold"> {user.fullName}</span>.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>

                      <AlertDialogAction onClick={() => handleDelete(user.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
