'use client'
import {
  Pencil,
  Plus,
  Trash,
} from "lucide-react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
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

type SemesterSelectProps = {
  current_select: string;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (semester_title: string) => void;
};

export function SemesterSelect({ current_select, is_open, set_is_open, on_select }: SemesterSelectProps) {
  /* const [is_open, set_is_open] = useState(false); */
  /* const [semesters, set_semesters] = useState<Semester[]>([]); */
  const {
    semesters,
    update,
    set_update
  } = use_filter_context();

  const formSchema = z.object({
    semester: z
    .string()
    .refine(
      (value) => !semesters.some(v => v.semester_title === value),
      {message: "value already existed"}
    )
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      semester: "",
    }
  })

  function on_add_submit(values: z.infer<typeof formSchema>) {
    const sql = `INSERT INTO semester (semester_title) VALUES ('${values.semester}');`;
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
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add new semester:</DialogTitle>
              <DialogDescription>
                Add new semester here. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(on_add_submit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="semester"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Semester:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Spring/Fall 20.."
                          className="w-52"
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
          <CommandInput placeholder="Type a semester or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {semesters.map((semester) => (
              <CommandItem
                key={semester.semester_title}
                onSelect={() => {
                  on_select(semester.semester_title);
                  set_is_open(false);
                }}
              >
                <span>{semester.semester_title}</span>
                <div className="ml-auto"/>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    const sql = `DELETE FROM semester WHERE semester_title = '${semester.semester_title}';`;
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
