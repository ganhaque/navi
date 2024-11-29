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
import { use_filter_context } from "@/app/data_provider"
import { SemesterSelect } from "@/components/select/semester"

// TODO: make create course form where it is the same but 
export function CourseEditForm() {
  const [is_semester_select_open, set_is_semester_select_open] = useState(false);
  const [new_semester, set_new_semester] = useState("");

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
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "password must be at least 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function on_submit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    /* <div className="grid gap-4 py-4"> */
    <div>
      {/* <div className="grid grid-cols-4 items-center gap-4"> */}
      {/*   <Label htmlFor="name" className="text-right"> */}
      {/*     Semester */}
      {/*   </Label> */}
      {/*   <Input id="name" className="col-span-3" /> */}
      {/* </div> */}
      {/* <div className="grid grid-cols-4 items-center gap-4"> */}
      {/*   <Label htmlFor="username" className="text-right"> */}
      {/*     Username */}
      {/*   </Label> */}
      {/*   <Input id="username" className="col-span-3" /> */}
      {/* </div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(on_submit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                margin: "0"
              }}>
                <FormLabel>Semester</FormLabel>
                <FormControl>
                  <Popover
                    open={is_semester_select_open}
                    onOpenChange={(is_semester_select_open) => {set_is_semester_select_open(is_semester_select_open)}}
                  >
                    <PopoverTrigger asChild>
                      <Button variant="outline">{semester_filter}</Button>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      style={{
                        padding: "0"
                      }}
                    >
                      <Command className="rounded-lg border shadow-md md:min-w-[16rem]">
                        <CommandInput placeholder="Type a semester or search..." />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          {semesters.map((semester) => (
                            <CommandItem
                              key={semester.semester_title}
                              onSelect={() => {
                                /* set_semester_filter(semester.semester_title); */
                                // TODO: set new_semester = 
                                set_is_semester_select_open(false);
                              }}
                            >
                              <span>{semester.semester_title}</span>
                            </CommandItem>
                          ))}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem style={{
                margin: "0"
              }}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    style={{
                      width: "16rem"
                    }}
                    type="password"
                    placeholder="●●●●●●●●"
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
