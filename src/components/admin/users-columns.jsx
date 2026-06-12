"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const columns = [
  {
    id: "serial",
    header: "#",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "fullName",
    header: "Name",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    enableGlobalFilter: true,
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.gender;

      return (
        <Badge
          className={
            gender === "Male"
              ? "bg-blue-100 text-blue-700 hover:bg-blue-100  rounded-md"
              : "bg-pink-100 text-pink-700 hover:bg-pink-100  rounded-md"
          }
        >
          {gender}
        </Badge>
      );
    },
  },
  {
    accessorKey: "totalResumes",
    header: "Total Resumes",
    cell: ({ row }) => (
      <Badge variant="outline" className="font-medium rounded-md">
        {row.original.totalResumes}
      </Badge>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Joined On",
    cell: ({ row }) =>
      format(new Date(row.original.createdAt), "dd MMM yyyy, hh:mm a"),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <Link href={`/admin/users/${row.original.id}`}>
        <Button size="sm" variant="outline" className="cursor-pointer">
          <Eye className="h-4 w-4 mr-1" />
          View
        </Button>
      </Link>
    ),
  },
];
