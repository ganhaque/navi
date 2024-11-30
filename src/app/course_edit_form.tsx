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
import { Course, use_filter_context } from "@/app/data_provider"
import { SemesterSelect } from "@/components/select/semester"
import { DepartmentSelect } from "@/components/select/department"

type CourseEditFormProps = {
  current_course: Course;
};

// TODO: make create course form where it is the same but 
export function CourseEditForm({current_course} : CourseEditFormProps) {
  const [is_semester_select_open, set_is_semester_select_open] = useState(false);
  const [is_department_select_open, set_is_department_select_open] = useState(false);

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
    .number({message: "course number has to be a positive integer"})
    .nonnegative({message: "course number must be greater than or equal to 0"}),
    section: z
    .number({message: "section has to be a positive non-zero integer"})
    .positive({message: "section number must be greater than 0"}),
    available: z
    .number({message: "section has to be a positive integer"})
    .nonnegative({message: "available must be greater than or equal to 0"}),
    enrollment: z
    .number({message: "enrollment has to be a positive integer"})
    .nonnegative({message: "enrollment must be greater than or equal to 0"}),
    // TODO:
    credit_hour: z
    .string(),
    title: z
    .string(),
    // TODO:
    day_pattern: z
    .string(),
    instructor: z
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
                    <Input className="w-16"
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
                    <Input className="w-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available:</FormLabel>
                  <FormControl>
                    <Input className="w-14"
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
                    <Input className="w-14"
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
          <FormField
            control={form.control}
            name="instructor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructor:</FormLabel>
                <FormControl>
                  <Input className="w-48"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-auto">Register</Button>
        </form>
      </Form>
    </div>
  )
}
