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
import { sql_insert, sql_query, sql_update } from "@/utils"
import { InstructorSelect } from "@/components/select/instructor"

export function CourseAddForm() {
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
    set_update,
    semester_filter,
    department_filter,
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
      instructor: null,
      day_pattern: null,
      course_type: null,
      special_enrollment: null,
      credit_hour: null,

      semester: semester_filter,
      department: department_filter,

      // NOTE: these cannot be undefined, otherwise it will give error when input
      course_number: 1000,
      section: 1,
      available: 0,
      enrollment: 0,
      title: "",
    },
  })

  // 2. Define a submit handler.
  function on_submit(values: z.infer<typeof formSchema>) {
    const course_template_sql_command = `
INSERT OR IGNORE INTO course_template (
department_title,
course_number,
course_title,
credit_hour,
course_type
) VALUES (
'${values.department}',
${values.course_number},
'${values.title.replace("'", "''")}',
${values.credit_hour ? `'${values.credit_hour}'` : 'NULL'},
${values.course_type ? `'${values.course_type}'` : 'NULL'}
);
`;

    const course_sql_command = `
INSERT INTO course (
semester_title,
department_title,
course_number,
section,
available,
enrollment,
time_begin,
time_end,
day_pattern,
room_number,
building_name,
instructor_name,
special_enrollment
) VALUES (
'${values.semester}',
'${values.department}',
${values.course_number},
${values.section},
${values.available},
${values.enrollment},
${values.time_slot?.time_begin || 'NULL'},
${values.time_slot?.time_end || 'NULL'},
${values.day_pattern ? `'${values.day_pattern}'` : 'NULL'},
${values.location?.room_number || 'NULL'},
${values.location?.building_name ? `'${values.location.building_name.replace("'", "''")}'` : 'NULL'},
${values.instructor ? `'${values.instructor.replace("'", "''")}'` : 'NULL'},
${values.special_enrollment ? `'${values.special_enrollment}'` : 'NULL'}
);
`;

    console.log(course_template_sql_command, course_sql_command);

    // execute SQL commands sequentially
    sql_insert(course_template_sql_command)
      .then(() => {
        return sql_insert(course_sql_command);
      })
      .then(() => {
        set_update(!update);
        alert("Added new course successfully!");
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        alert("Failed to add course. Check the console for details.");
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
                <FormLabel>Semester*</FormLabel>
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
                <FormLabel>Department*</FormLabel>
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
                  <FormLabel>Number*</FormLabel>
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
                  <FormLabel>Section*</FormLabel>
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
                  <FormLabel>Credit Hour</FormLabel>
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
                  <FormLabel>Available*</FormLabel>
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
                  <FormLabel>Enrollment*</FormLabel>
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
                <FormLabel>Title*</FormLabel>
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
                  <FormLabel>Begin-End</FormLabel>
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
                  <FormLabel>Days</FormLabel>
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
                <FormLabel>Location</FormLabel>
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
                <FormLabel>Instructor</FormLabel>
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
                  <FormLabel>Type</FormLabel>
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
                  <FormLabel>Special</FormLabel>
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
          <Button type="submit" className="ml-auto">Add</Button>
        </form>
      </Form>
    </div>
  )
}
