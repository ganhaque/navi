"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Course, use_filter_context } from "@/app/data_provider";
import { format_course_time } from "@/utils"
import { CourseEditForm } from "./course_edit_form"


export function CourseDataTable() {
  const {
    current_schedule,
    set_current_schedule,
    courses,
    semester_filter,
    set_semester_filter,
    department_filter,
    set_department_filter,
  } = use_filter_context();
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
  React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Course>[] = [
    {
      id: "select",
      cell: ({ row }) => (
        <div
          style={{
            backgroundColor: (row.getIsSelected()) ? "hsl(var(--white))" : "hsl(var(--black))",
            borderColor: (row.getIsSelected()) ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))",
            width: "1.5rem",
            height: "1.5rem",
            borderWidth: "1px",
            borderRadius: "0.25rem",
          }}
          onClick={() => {
            row.toggleSelected(!row.getIsSelected())
          }}
        >
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "available",
      header: "Available",
      cell: ({ row }) => (
        <div className="capitalize">
          {/* {row.getValue("available")}/{row.getValue("available") + row.getValue("enrollment")} */}
          {(() => {
            const available = row.original.available;

            // Ensure both available and enrollment are numbers
            if (typeof available === "number") {
              if (available === 0) {
                return ( <div style={{color: "hsl(var(--muted-foreground))"}}> 0 </div>)
              }
              else {
                return ( <div> {available} </div>)
              }
            }
            return (
              <div style={{color: "hsl(var(--muted-foreground))"}}> TBA </div>
            );
          })()}
        </div>
      ),
    },
    {
      accessorKey: "enrollment",
      header: "Enrollment",
      cell: ({ row }) => (
        <div className="capitalize">
          {/* {row.getValue("available")}/{row.getValue("available") + row.getValue("enrollment")} */}
          {(() => {
            const available = row.original.available;
            const enrollment = row.original.enrollment;

            // Ensure both available and enrollment are numbers
            if (typeof available === "number" && typeof enrollment === "number") {
              return (
                <div> {enrollment}/{available + enrollment} </div>
              )
            }

            return (
              <div style={{color: "hsl(var(--muted-foreground))"}}> TBA </div>
            );
          })()}
        </div>
      ),
    },
    {
      accessorKey: "course_number",
      header: "Number-Section",
      cell: ({ row }) => (
        <div>
          {row.original.department_abbreviation} {row.original.course_number}-{row.original.section}
        </div>
      ),
    },
    {
      accessorKey: "course_title",
      header: "Title",
      cell: ({ row }) => (
        <div>
          {
            row.original.course_title
            .toLowerCase()
            .replace(/\b\w/g, (match) => match.toUpperCase())
            .replace(/Ii\b/g, 'II')
            .replace(/Iii\b/g, 'III')
            .replace(/Iv\b/g, 'IV')
            .replace(/Vi\b/g, 'VI')
            .replace(/Vii\b/g, 'VII')
            .replace(/Viii\b/g, 'VIII')
          }
        </div>
      ),
    },
    {
      accessorKey: "credit_hour",
      header: "CR",
      cell: ({ row }) => (
        <div>
          {row.original.credit_hour}
        </div>
      ),
    },
    {
      accessorKey: "time_begin",
      header: "Begin-End",
      cell: ({ row }) => (
        <div>
          {(() => {
            if (typeof row.original.time_begin === "number" && typeof row.original.time_end === "number") {

              return (
                <div> 
                  {format_course_time(row.original.time_begin, row.original.time_end)}
                </div>
              )
            }
            return (
              <div style={{color: "hsl(var(--muted-foreground))"}}> TBA </div>
            );
          })()}
        </div>
      ),
    },
    {
      accessorKey: "day_pattern",
      header: "Days",
      cell: ({ row }) => (
        <div>
          {(() => {
            if (row.original.day_pattern) {
              return ( <div> {row.original.day_pattern} </div>)
            }
            return (
              <div style={{color: "hsl(var(--muted-foreground))"}}> TBA </div>
            );
          })()}
        </div>
      ),
    },
    {
      accessorKey: "location",
      header: "Location",
      cell: ({ row }) => (
        <div>
          {(() => {
            if (row.original.building_name && row.original.room_number) {
              return ( <div className="capitalize"> {row.original.room_number} {row.original.building_name.toLowerCase()} </div>)
            }
            return (
              <div style={{color: "hsl(var(--muted-foreground))"}}> TBA </div>
            );
          })()}
        </div>
      ),
    },
    {
      accessorKey: "instructor_name",
      header: "Instructor",
      cell: ({ row }) => (
        <div>
          {(() => {
            if (row.original.instructor_name) {
              return ( <div> {row.original.instructor_name} </div>)
            }
            return (
              <div style={{color: "hsl(var(--muted-foreground))"}}> TBA </div>
            );
          })()}
        </div>
      ),
    },
    {
      accessorKey: "special_enrollment",
      header: "Special",
      cell: ({ row }) => (
        <div>
          {row.original.special_enrollment}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
                {/* <DropdownMenuItem */}
                {/*   onClick={() => navigator.clipboard.writeText(payment.id)} */}
                {/* > */}
                {/*   Copy payment ID */}
                {/* </DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}
                <DropdownMenuItem className="p-0">
                  <SheetTrigger className="h-full w-full" asChild>
                    <Button variant="ghost" className="h-auto px-2 py-1.5 justify-start">Edit</Button>
                  </SheetTrigger>
                </DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
                <CourseEditForm/>
              </SheetHeader>
              <SheetFooter>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        )
      },
    },
  ];

  const table = useReactTable({
    data: courses,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    /* getPaginationRowModel: getPaginationRowModel(), */
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // update row selection if any filter or data changes
  React.useEffect(() => {
    /* setTimeout(() => { */
    /*   table.getRowModel().rows.forEach((row) => { */
    /*     const isRowSelected = selectedCourses.some((course) => course === (row.original as Course)); */
    /*     row.toggleSelected(isRowSelected); */
    /*   }); */
    /* }, 0); */
  }, [
      /* selectedSemester, selectedDepartment, selectedDays, filterString, selectedCourses */
    ]);


  return (
    <div className="w-full p-2">
      <div className="flex items-center py-4">
        {/* <Input */}
        {/*   placeholder="Filter emails..." */}
        {/*   value={(table.getColumn("email")?.getFilterValue() as string) ?? ""} */}
        {/*   onChange={(event) => */}
        {/*     table.getColumn("email")?.setFilterValue(event.target.value) */}
        {/*   } */}
        {/*   className="max-w-sm" */}
        {/* /> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    if (row.getIsSelected()) {
                      // TODO: 
                      /* removeSelectedCourse(row.original as Course); */
                      /* removePickedCourse(row.original as Course); */
                      /* removeConflictedCourse(row.original as Course); */
                    }
                    else {
                      // TODO: 
                      /* addSelectedCourse(row.original as Course); */
                      /* addPickedCourse(row.original as Course); */
                      /* addConflictedCourse(row.original as Course); */
                      /* addConflict(row.original as Course); */
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4"> */}
      {/*   <div className="flex-1 text-sm text-muted-foreground"> */}
      {/*     {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
      {/*     {table.getFilteredRowModel().rows.length} row(s) selected. */}
      {/*   </div> */}
      {/*   <div className="space-x-2"> */}
      {/*     <Button */}
      {/*       variant="outline" */}
      {/*       size="sm" */}
      {/*       onClick={() => table.previousPage()} */}
      {/*       disabled={!table.getCanPreviousPage()} */}
      {/*     > */}
      {/*       Previous */}
      {/*     </Button> */}
      {/*     <Button */}
      {/*       variant="outline" */}
      {/*       size="sm" */}
      {/*       onClick={() => table.nextPage()} */}
      {/*       disabled={!table.getCanNextPage()} */}
      {/*     > */}
      {/*       Next */}
      {/*     </Button> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  )
}
