"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { SheetClose } from "@/components/ui/sheet"
import { Course, TimeSlot, Location, use_filter_context } from "@/app/data_provider"
import { SemesterSelect } from "@/components/select/semester"
import { DepartmentSelect } from "@/components/select/department"
import { DayPatternSelect } from "@/components/select/day_pattern"
import { TimeSlotSelect } from "@/components/select/time_slot"
import { LocationSelect } from "@/components/select/location"
import { CourseTypeSelect } from "@/components/select/course_type"
import { SpecialEnrollmentSelect } from "@/components/select/special_enrollment"
import { CreditHourSelect } from "@/components/select/credit_hour"
import { sql_query, sql_update } from "@/utils"
import { InstructorSelect } from "@/components/select/instructor"

type CourseEditFormProps = {
  current_course: Course;
};

// TODO: make create course form where it is the same but 

// TODO: when editing enum dropdown, add option to add new to table
export function CourseEditForm({current_course} : CourseEditFormProps) {
  const [is_semester_select_open, set_is_semester_select_open] = useState(false);
  const [is_department_select_open, set_is_department_select_open] = useState(false);
  const [is_day_pattern_select_open, set_is_day_pattern_select_open] = useState(false);
  const [is_time_slot_select_open, set_is_time_slot_select_open] = useState(false);
  const [is_location_select_open, set_is_location_select_open] = useState(false);
  const [is_course_type_select_open, set_is_course_type_select_open] = useState(false);
  const [is_special_enrollment_select_open, set_is_special_enrollment_select_open] = useState(false);
  const [is_credit_hour_select_open, set_is_credit_hour_select_open] = useState(false);
  const [is_instructor_select_open, set_is_instructor_select_open] = useState(false);

  const {
    update,
    set_update
  } = use_filter_context();

  const formSchema = z.object({
    semester: z
    .string(),
    department: z
    .string(),
    course_number: z
    .coerce
    .number({message: "course number has to be a positive integer"})
    .nonnegative({message: "course number must be greater than or equal to 0"})
    .gte(1000, { message: "course number must be between 1000 and 9000"})
    .lt(10000, { message: "course number must be between 1000 to 9999"}),
    section: z
    .coerce
    .number({message: "section has to be a positive non-zero integer"})
    .positive({message: "section number must be greater than 0"}),
    // TODO: figure out how do nullable these fields without erroring
    available: z
    .coerce
    .number({message: "section has to be a positive integer"})
    .nonnegative({message: "available must be greater than or equal to 0"}),
    /* .nullable(), */
    enrollment: z
    .coerce
    .number({message: "enrollment has to be a positive integer"})
    .nonnegative({message: "enrollment must be greater than or equal to 0"}),
    /* .nullable(), */
    credit_hour: z
    .string()
    .nullable(),
    title: z
    .string(),
    /* time_begin: z */
    /* .number(), */
    /* time_end: z */
    /* .number(), */
    time_slot: z.custom<TimeSlot>().nullable(),
    location: z.custom<Location>().nullable(),
    day_pattern: z
    .string()
    .nullable(),
    instructor: z
    .string()
    .nullable(),
    course_type: z
    .string()
    .nullable(),
    special_enrollment: z
    .string()
    .nullable(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: current_course.semester_title,
      department: current_course.department_title,
      course_number: current_course.course_number,
      section: current_course.section,
      title: current_course.course_title,
      instructor: current_course.instructor_name,
      available: current_course.available ? current_course.available : 0,
      enrollment: current_course.enrollment ? current_course.enrollment : 0,
      day_pattern: current_course.day_pattern ? current_course.day_pattern : "",
      /* time_begin: current_course.time_begin ? current_course.time_begin : 0, */
      /* time_end: current_course.time_end ? current_course.time_end : 0, */
      /* time_slot: (current_course.time_begin && current_course.time_end) ? {current_course.time_begin, current_course.time_end} : {}, */
      time_slot: {
        time_begin: current_course.time_begin || 0,
        time_end: current_course.time_end || 0,
      },
      location: {
        room_number: current_course.room_number || 0,
        building_name: current_course.building_name || "",
      },
      course_type: current_course.course_type ? current_course.course_type : "",
      special_enrollment: current_course.special_enrollment,
      credit_hour: current_course.credit_hour ? current_course.credit_hour : "",
    },
  })

  // 2. Define a submit handler.
  function on_submit(values: z.infer<typeof formSchema>) {
    const updates: Record<string, any> = {};
    const course_id = current_course.course_id;

    const isEqual = (a: any, b: any) => {
      // Handle null and undefined equivalence
      if (a == null && b == null) return true;

      // Compare default fallbacks for specific types
      if ((a == null && (b === "" || b === 0)) || (b == null && (a === "" || a === 0))) return true;

      // Fallback to strict equality for all other cases
      return a === b;
    };

    // Compare each field to see if it has changed
    if (!isEqual(values.semester, current_course.semester_title)) updates.semester_title = values.semester;
    if (!isEqual(values.department, current_course.department_title)) updates.department_title = values.department;
    if (!isEqual(values.course_number, current_course.course_number)) updates.course_number = values.course_number;
    if (!isEqual(values.section, current_course.section)) updates.section = values.section;
    if (!isEqual(values.title, current_course.course_title)) updates.course_title = values.title;
    if (!isEqual(values.instructor, current_course.instructor_name)) updates.instructor_name = values.instructor;
    if (!isEqual(values.available, current_course.available)) updates.available = values.available;
    if (!isEqual(values.enrollment, current_course.enrollment)) updates.enrollment = values.enrollment;
    if (!isEqual(values.day_pattern, current_course.day_pattern)) updates.day_pattern = values.day_pattern;

    if (
      !isEqual(values.time_slot?.time_begin ?? null, current_course.time_begin) ||
        !isEqual(values.time_slot?.time_end ?? null, current_course.time_end)
    ) {
      updates.time_begin = values.time_slot?.time_begin ?? null;
      updates.time_end = values.time_slot?.time_end ?? null;
    }

    if (
      !isEqual(values.location?.room_number ?? null, current_course.room_number) ||
        !isEqual(values.location?.building_name ?? null, current_course.building_name)
    ) {
      updates.room_number = values.location?.room_number ?? null;
      updates.building_name = values.location?.building_name ?? null;
    }

    if (!isEqual(values.course_type, current_course.course_type)) updates.course_type = values.course_type;
    if (!isEqual(values.special_enrollment, current_course.special_enrollment)) updates.special_enrollment = values.special_enrollment;
    if (!isEqual(values.credit_hour, current_course.credit_hour)) updates.credit_hour = values.credit_hour;

    // If no fields were updated, log a message and return
    if (Object.keys(updates).length === 0) {
      console.log("No changes detected.");
      return;
    }

    // Generate the SQL command
    const set_clauses = Object.entries(updates)
    .map(([key, value]) => `${key} = ${typeof value === "string" ? `'${value}'` : value}`)
    .join(", ");
    const sql_statement = `UPDATE course SET ${set_clauses} WHERE course_id = ${course_id};`;

    /* console.log(sql_update); */
    /* sql_query(sql_update); */
    sql_update(sql_statement)
      .then(() => {
        set_update(!update);
      })
      .catch((error) => {
        console.error("Error editing course:", error);
        alert("Failed to edit course. Check the console for details.");
      });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(on_submit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel>Semester:</FormLabel>
                <FormControl>
                  <SemesterSelect
                    current_select={field.value}
                    is_open={is_semester_select_open}
                    set_is_open={set_is_semester_select_open}
                    on_select={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem className="flex gap-4 items-center">
                <FormLabel>Department:</FormLabel>
                <FormControl>
                  <DepartmentSelect
                    current_select={field.value}
                    is_open={is_department_select_open}
                    set_is_open={set_is_department_select_open}
                    on_select={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="course_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number:</FormLabel>
                  <FormControl>
                    <Input
                      className="w-16"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="section"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section:</FormLabel>
                  <FormControl>
                    <Input
                      className="w-12"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="credit_hour"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Credit Hour:</FormLabel>
                  <FormControl>
                    <CreditHourSelect
                      current_select={field.value}
                      is_open={is_credit_hour_select_open}
                      set_is_open={set_is_credit_hour_select_open}
                      on_select={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available:</FormLabel>
                  <FormControl>
                    <Input
                      className="w-14"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enrollment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enrollment:</FormLabel>
                  <FormControl>
                    <Input
                      className="w-14"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title:</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="time_slot"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Begin:</FormLabel>
                  <FormControl>
                    <TimeSlotSelect
                      current_select={field.value}
                      is_open={is_time_slot_select_open}
                      set_is_open={set_is_time_slot_select_open}
                      on_select={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="day_pattern"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Days:</FormLabel>
                  <FormControl>
                    <DayPatternSelect
                      current_select={field.value}
                      is_open={is_day_pattern_select_open}
                      set_is_open={set_is_day_pattern_select_open}
                      on_select={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Location:</FormLabel>
                <FormControl>
                  <LocationSelect
                    current_select={field.value}
                    is_open={is_location_select_open}
                    set_is_open={set_is_location_select_open}
                    on_select={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instructor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructor:</FormLabel>
                <FormControl>
                  <InstructorSelect
                    current_select={field.value}
                    is_open={is_instructor_select_open}
                    set_is_open={set_is_instructor_select_open}
                    on_select={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="course_type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Type:</FormLabel>
                  <FormControl>
                    <CourseTypeSelect
                      current_select={field.value}
                      is_open={is_course_type_select_open}
                      set_is_open={set_is_course_type_select_open}
                      on_select={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="special_enrollment"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Special:</FormLabel>
                  <FormControl>
                    <SpecialEnrollmentSelect
                      current_select={field.value}
                      is_open={is_special_enrollment_select_open}
                      set_is_open={set_is_special_enrollment_select_open}
                      on_select={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto">Save Changes</Button>
        </form>
      </Form>
    </div>
  )
}
