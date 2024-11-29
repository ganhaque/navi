'use client'
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
import { use_filter_context } from "@/app/data_provider";
import { sql_query } from "@/utils";
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
    /* department_filter, */
    /* set_department_filter */
  } = use_filter_context();

  return (
    <Popover
      open={is_open}
      onOpenChange={(is_open) => {set_is_open(is_open)}}
    >
      <PopoverTrigger asChild>
        <Button variant="outline">{current_select}</Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        style={{
          padding: "0"
        }}
      >
        <Command className="rounded-lg border shadow-md md:min-w-[16rem]">
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
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
