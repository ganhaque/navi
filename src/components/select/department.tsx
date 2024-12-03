'use client'
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

type DepartmentSelectProps = {
  current_select: string;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (department_title: string) => void;
};

export function DepartmentSelect({
  current_select,
  is_open,
  set_is_open,
  on_select
}: DepartmentSelectProps) {
  /* const [is_open, set_is_open] = useState(false); */
  /* const [departments, set_departments] = useState<Department[]>([]); */
  const {
    departments,
    update,
    set_update,
  } = use_filter_context();

  const formSchema = z.object({
    department: z
    .string()
    .refine(
      (value) => !departments.some(v => v.department_title === value),
      {message: "value already existed"}
    )
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      department: "",
    }
  })

  function on_add_submit(values: z.infer<typeof formSchema>) {
    const sql = `INSERT INTO department (department_title) VALUES ('${values.department}');`;
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
              <DialogTitle>Add new department:</DialogTitle>
              <DialogDescription>
                Add new department here. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(on_add_submit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department:</FormLabel>
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
        <Command className="rounded-lg border shadow-md md:min-w-[20rem]">
          <CommandInput placeholder="Type a department or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {departments.map((department) => (
              <CommandItem
                key={department.department_title}
                onSelect={() => {
                  on_select(department.department_title);
                  set_is_open(false);
                }}
              >
                <span>{department.department_title}</span>
                <div className="ml-auto"/>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    const sql = `DELETE FROM department WHERE department_title = '${department.department_title}';`;
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
