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

type CourseEditFormProps = {
  current_course: Course;
};

// TODO: make create course form where it is the same but 
export function CourseEditForm({current_course} : CourseEditFormProps) {
  const [is_semester_select_open, set_is_semester_select_open] = useState(false);
  const [is_department_select_open, set_is_department_select_open] = useState(false);
  const [is_day_pattern_select_open, set_is_day_pattern_select_open] = useState(false);
  const [is_time_slot_select_open, set_is_time_slot_select_open] = useState(false);
  const [is_location_select_open, set_is_location_select_open] = useState(false);
  const [is_course_type_select_open, set_is_course_type_select_open] = useState(false);
  const [is_special_enrollment_select_open, set_is_special_enrollment_select_open] = useState(false);
  const [is_credit_hour_select_open, set_is_credit_hour_select_open] = useState(false);

  /* const { */
  /*   current_schedule, */
  /*   set_current_schedule, */
  /*   courses, */
  /*   semester_filter, */
  /*   set_semester_filter, */
  /*   department_filter, */
  /*   set_department_filter, */
  /**/
  /*   semesters, */
  /* } = use_filter_context(); */

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
    available: z
    .coerce
    .number({message: "section has to be a positive integer"})
    .nonnegative({message: "available must be greater than or equal to 0"}),
    enrollment: z
    .coerce
    .number({message: "enrollment has to be a positive integer"})
    .nonnegative({message: "enrollment must be greater than or equal to 0"}),
    credit_hour: z
    .string(),
    title: z
    .string(),
    /* time_begin: z */
    /* .number(), */
    /* time_end: z */
    /* .number(), */
    time_slot: z.custom<TimeSlot>(),
    location: z.custom<Location>(),
    day_pattern: z
    .string(),
    instructor: z
    .string(),
    course_type: z
    .string(),
    special_enrollment: z
    .string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: current_course.semester_title,
      department: current_course.department_title,
      course_number: current_course.course_number,
      section: current_course.section,
      title: current_course.course_title,
      instructor: current_course.instructor_name ? current_course.instructor_name : "",
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
      special_enrollment: current_course.special_enrollment ? current_course.special_enrollment : "",
      credit_hour: current_course.credit_hour ? current_course.credit_hour : "",
    },
  })

  // 2. Define a submit handler.
  function on_submit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
                    type="number"
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
                  <Input
                    className="w-48"
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
