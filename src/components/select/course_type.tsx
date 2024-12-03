'use client'
import {
  Pencil,
  Plus,
  Trash,
} from "lucide-react"
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
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
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { use_filter_context } from "@/app/data_provider";
import { sql_delete, sql_insert, sql_query } from "@/utils";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

type CourseTypeSelectProps = {
  current_select: string | null;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (course_type_title: string | null) => void;
};

export function CourseTypeSelect({ current_select, is_open, set_is_open, on_select }: CourseTypeSelectProps) {
  const {
    course_types,
    update,
    set_update,
  } = use_filter_context();

  const formSchema = z.object({
    course_type: z
    .string()
    .refine(
      (value) => !course_types.some(v => v.course_type === value),
      {message: "value already existed"}
    )
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course_type: "",
    }
  })

  function on_add_submit(values: z.infer<typeof formSchema>) {
    const sql = `INSERT INTO course_type (course_type) VALUES ('${values.course_type}');`;
    sql_insert(sql);
    set_update(!update);
  }

  return (
    <Popover
      open={is_open}
      onOpenChange={(is_open) => {set_is_open(is_open)}}
    >
      <div className="flex">
        <PopoverTrigger asChild>
          <Button
            style={{
              borderTopRightRadius: "0",
              borderBottomRightRadius: "0"
            }}
            variant="outline"
          >
            {current_select}
          </Button>
        </PopoverTrigger>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              style={{
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                borderLeftWidth: "0",
              }}
              variant="outline"
              size="icon">
              <Plus/>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[325px]">
            <DialogHeader>
              <DialogTitle>Add new course type:</DialogTitle>
              <DialogDescription>
                Add new course type here. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(on_add_submit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="course_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Type:</FormLabel>
                      <FormControl>
                        <Input
                          className="w-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="ml-auto">Add</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <PopoverContent
        align="start"
        style={{
          padding: "0"
        }}
      >
        <Command className="rounded-lg border shadow-md md:min-w-[16rem]">
          <CommandInput placeholder="Type a course_type or search..." />
          <CommandList>
            <CommandItem
              onSelect={() => {
                on_select(null);
                set_is_open(false);
              }}
            >
              <span className="opacity-0">NULL</span>
            </CommandItem>
            <CommandEmpty>No results found.</CommandEmpty>
            {course_types.map((course_type) => (
              <CommandItem
                key={course_type.course_type}
                onSelect={() => {
                  on_select(course_type.course_type);
                  set_is_open(false);
                }}
              >
                <span>{course_type.course_type}</span>
                <div className="ml-auto"/>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    const sql = `DELETE FROM course_type WHERE course_type = '${course_type.course_type}';`;
                    sql_delete(sql);
                    set_update(!update);
                  }}
                >
                  <Trash/>
                </Button>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
