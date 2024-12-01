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

type CreditHourSelectProps = {
  current_select: string | null;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (credit_hour_title: string | null) => void;
};

export function CreditHourSelect({ current_select, is_open, set_is_open, on_select }: CreditHourSelectProps) {
  const {
    credit_hours,
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
          <CommandInput placeholder="Type a credit_hour or search..." />
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
            {credit_hours.map((credit_hour) => (
              <CommandItem
                key={credit_hour.credit_hour}
                onSelect={() => {
                  on_select(credit_hour.credit_hour);
                  set_is_open(false);
                }}
              >
                <span>{credit_hour.credit_hour}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
