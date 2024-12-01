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
import { Location, use_filter_context } from "@/app/data_provider";
import { format_course_time, sql_query } from "@/utils";
import { useEffect, useState } from "react";

type LocationSelectProps = {
  current_select: Location;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (location: Location) => void;
};

export function LocationSelect({
  current_select,
  is_open,
  set_is_open,
  on_select,
}: LocationSelectProps) {
  const {
    locations,
  } = use_filter_context();

  return (
    <Popover
      open={is_open}
      onOpenChange={(is_open) => {set_is_open(is_open)}}
    >
      <PopoverTrigger asChild>
        <Button variant="outline">{current_select.room_number} {current_select.building_name}</Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        style={{
          padding: "0"
        }}
      >
        <Command className="rounded-lg border shadow-md md:min-w-[16rem]">
          <CommandInput placeholder="Type a location or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {locations.map((location) => {
              return (
                <CommandItem
                  key={location.room_number + location.building_name}
                  onSelect={() => {
                    on_select(location);
                    set_is_open(false);
                  }}
                >
                  <span>
                    {location.room_number + " " + location.building_name}
                  </span>
                </CommandItem>
              )})}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
