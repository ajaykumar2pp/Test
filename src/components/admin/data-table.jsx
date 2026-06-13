"use client";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({ columns, data }) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter,
    },

    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Hero Section */}
      <div
        className="
      relative overflow-hidden
      rounded-3xl p-5 sm:p-6 md:p-8
      bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600
      text-white shadow-xl
    "
      >
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,white,transparent_60%)]" />

        <div className="relative space-y-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
            User Management Dashboard
          </h1>

          <p className="text-white/85 text-sm md:text-base max-w-2xl leading-relaxed">
            Monitor user registrations, resume analyses, and engagement metrics
            in real-time to understand platform activity and growth.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Search by name or email..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full sm:max-w-sm"
        />

        <div className="text-sm text-muted-foreground">
          Total Users:{" "}
          <span className="font-semibold">
            {table.getFilteredRowModel().rows.length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-x-auto">
        <Table className="min-w-225">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          Showing {table.getRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} users
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button variant="outline" size="sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
