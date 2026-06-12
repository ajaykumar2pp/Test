"use client";

import { DataTable } from "./data-table";
import { columns } from "./users-columns";

export default function UsersTable({
  users,
}) {
  const tableData = users.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    gender: user.gender,
    createdAt: user.createdAt,

    totalResumes:
      user.resumeAnalyses?.length || 0,

    resumeAnalyses:
      user.resumeAnalyses,
  }));

  return (
    <DataTable
      columns={columns}
      data={tableData}
    />
  );
}