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

type InstructorSelectProps = {
  current_select: string | null;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (instructor_name: string | null) => void;
};

export function InstructorSelect({
  current_select,
  is_open,
  set_is_open,
  on_select
}: InstructorSelectProps) {
  const {
    instructors,
    update,
    set_update
  } = use_filter_context();

  const formSchema = z.object({
    instructor: z
    .string()
    .refine(
      (value) => !instructors.some(v => v.instructor_name === value),
      {message: "value already existed"}
    )
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instructor: "",
    }
  })

  function on_add_submit(values: z.infer<typeof formSchema>) {
    const sql = `INSERT INTO instructor (instructor_name) VALUES ('${values.instructor}');`;
    sql_insert(sql);
    set_update(!update);
  }

  return (
    <Popover
      open={is_open}
      onOpenChange={(is_open) => {set_is_open(is_open)}}
      modal={true}
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
              <DialogTitle>Add new instructor:</DialogTitle>
              <DialogDescription>
                Add new instructor here. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(on_add_submit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="instructor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructor:</FormLabel>
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
        <Command className="rounded-lg border shadow-md md:min-w-[12rem]">
          <CommandInput placeholder="Type a instructor or search..." />
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
            {instructors.map((instructor) => (
              <CommandItem
                key={instructor.instructor_name}
                onSelect={() => {
                  on_select(instructor.instructor_name);
                  set_is_open(false);
                }}
              >
                <span>{instructor.instructor_name}</span>
                <div className="ml-auto"/>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    const sql = `DELETE FROM instructor WHERE instructor_name = '${instructor.instructor_name}';`;
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
