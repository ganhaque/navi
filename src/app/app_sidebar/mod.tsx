"use client"

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

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
/* import { SemesterPopover } from "./semester" */
import { SemesterSelect } from "@/components/select/semester"
import { use_filter_context } from "@/app/data_provider"
import { useState } from "react"
import { DepartmentSelect } from "@/components/select/department"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
]

export function AppSidebar() {
  const [is_semester_select_open, set_is_semester_select_open] = useState(false);
  const [is_department_select_open, set_is_department_select_open] = useState(false);
  const {
    semester_filter,
    set_semester_filter,
    department_filter,
    set_department_filter,

    semesters,
    departments,
  } = use_filter_context();

  return (
    <Sidebar>
      <SidebarContent>
        {/* {items.map((item) => ( */}
        {/*   <SidebarMenuItem key={item.title}> */}
        {/*     <SidebarMenuButton asChild> */}
        {/*       <a href={item.url}> */}
        {/*         <item.icon /> */}
        {/*         <span>{item.title}</span> */}
        {/*       </a> */}
        {/*     </SidebarMenuButton> */}
        {/*   </SidebarMenuItem> */}
        {/* ))} */}

        <SidebarGroup>
          <SidebarGroupLabel>Semester</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SemesterSelect
                  current_select={semester_filter}
                  is_open={is_semester_select_open}
                  set_is_open={set_is_semester_select_open}
                  on_select={(semester_title: string) => {
                    set_semester_filter(semester_title);
                  }}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Department</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DepartmentSelect
                  current_select={department_filter}
                  is_open={is_department_select_open}
                  set_is_open={set_is_department_select_open}
                  on_select={(department_title: string) => {
                    set_department_filter(department_title);
                  }}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarMenuItem>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  )
}
