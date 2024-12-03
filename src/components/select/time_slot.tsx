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
import { TimeSlot, use_filter_context } from "@/app/data_provider";
import { format_course_time, sql_query } from "@/utils";
import { useEffect, useState } from "react";

type TimeSlotSelectProps = {
  current_select: TimeSlot | null;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (time_slot: TimeSlot | null) => void;
};

export function TimeSlotSelect({
  current_select,
  is_open,
  set_is_open,
  on_select,
}: TimeSlotSelectProps) {
  const {
    time_slots,
  } = use_filter_context();


  return (
    <Popover
      open={is_open}
      onOpenChange={(is_open) => {set_is_open(is_open)}}
    >
      <PopoverTrigger asChild>
        <Button variant="outline">
          {current_select ? format_course_time(current_select.time_begin, current_select.time_end) : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        style={{
          padding: "0"
        }}
      >
        <Command className="rounded-lg border shadow-md md:min-w-[16rem]">
          <CommandInput placeholder="Type a time_slot or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandItem
              onSelect={() => {
                on_select(null);
                set_is_open(false);
              }}
            >
              <span className="opacity-0">NULL</span>
            </CommandItem>
            {time_slots.map((time_slot) => {
              return (
                <CommandItem
                  key={time_slot.time_begin + "-" + time_slot.time_end}
                  onSelect={() => {
                    on_select(time_slot);
                    set_is_open(false);
                  }}
                >
                  <span>
                    {format_course_time(time_slot.time_begin, time_slot.time_end)}
                  </span>
                </CommandItem>
              )})}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
