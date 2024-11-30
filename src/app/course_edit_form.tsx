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

type CourseEditFormProps = {
  current_course: Course;
};

// TODO: make create course form where it is the same but 
export function CourseEditForm({current_course} : CourseEditFormProps) {
  const [is_semester_select_open, set_is_semester_select_open] = useState(false);
  const [new_semester, set_new_semester] = useState(current_course.semester_title);

  const [new_available, set_new_available] = useState(current_course.available);

  const {
    current_schedule,
    set_current_schedule,
    courses,
    semester_filter,
    set_semester_filter,
    department_filter,
    set_department_filter,

    semesters,
  } = use_filter_context();

  const formSchema = z.object({
    semester: z
    .string(),
    department: z
    .string(),
    // TODO:
    available: z
    .number({message: "section has to be a positive integer"})
    .nonnegative({message: "available must be greater than or equal to 0"}),
    // TODO:
    enrollment: z
    .number({message: "enrollment has to be a positive integer"})
    .nonnegative({message: "enrollment must be greater than or equal to 0"}),
    // TODO:
    section: z
    .number({message: "section has to be a positive non-zero integer"})
    .positive({message: "section number must be greater than 0"}),
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
      title: current_course.course_title,
      instructor: current_course.instructor_name ? current_course.instructor_name : "",
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
                  <Input
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
