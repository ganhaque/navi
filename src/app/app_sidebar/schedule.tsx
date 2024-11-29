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

export function SchedulePopover() {
  /* const [is_open, set_is_open] = useState(false); */
  /* const [schedule_titles, set_schedule_titles] = useState<Semester[]>([]); */
  /* const [schedule, set_schedule] = useState<Schedule>([]); */
  /* const {current_schedule_id, set_current_schedule_id} = use_filter_context(); */
  /* const [current_schedule_name, set_current_schedule_name ] = useState(""); */
  /* const [current_schedule_semester, set_current_schedule_semester ] = useState(""); */
  /**/
  /* useEffect(() => { */
  /*   // TODO: sort by chronological order */
  /*   sql_query("SELECT * FROM semester") */
  /*     .then((semesters: Semester[]) => { */
  /*       set_semesters(semesters); */
  /*     }) */
  /*     .catch((error) => { */
  /*       console.error("Error fetching semesters:", error); */
  /*     }); */
  /* }, []); */
  /**/
  /* return ( */
  /*   <SidebarGroup> */
  /*     <SidebarGroupLabel>Semester</SidebarGroupLabel> */
  /*     <SidebarGroupContent> */
  /*       <SidebarMenu> */
  /*         <SidebarMenuItem> */
  /*           <Popover */
  /*             open={is_open} */
  /*             onOpenChange={(is_open) => {set_is_open(is_open)}} */
  /*           > */
  /*             <PopoverTrigger asChild> */
  /*               <Button variant="outline">{current_schedule_id}</Button> */
  /*             </PopoverTrigger> */
  /*             <PopoverContent */
  /*               align="start" */
  /*               style={{ */
  /*                 padding: "0" */
  /*               }} */
  /*             > */
  /*               <Command className="rounded-lg border shadow-md md:min-w-[16rem]"> */
  /*                 <CommandInput placeholder="Type a semester or search..." /> */
  /*                 <CommandList> */
  /*                   <CommandEmpty>No results found.</CommandEmpty> */
  /*                   {semesters.map((semester) => ( */
  /*                     <CommandItem */
  /*                       key={semester.semester_title} */
  /*                       onSelect={() => { */
  /*                         set_semester_filter(semester.semester_title); */
  /*                         set_is_open(false); */
  /*                       }} */
  /*                     > */
  /*                       <span>{semester.semester_title}</span> */
  /*                     </CommandItem> */
  /*                   ))} */
  /*                 </CommandList> */
  /*               </Command> */
  /*             </PopoverContent> */
  /*           </Popover> */
  /*         </SidebarMenuItem> */
  /*       </SidebarMenu> */
  /*     </SidebarGroupContent> */
  /*   </SidebarGroup> */
  /* ) */
}
