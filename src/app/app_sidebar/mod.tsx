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
import { CourseTypeSelect } from "@/components/select/course_type"
import { SpecialEnrollmentSelect } from "@/components/select/special_enrollment"
import { DayPatternSelect } from "@/components/select/day_pattern"

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
  const [is_course_type_select_open, set_is_course_type_select_open] = useState(false);
  const [is_special_enrollment_select_open, set_is_special_enrollment_select_open] = useState(false);

  const [is_day_pattern_select_open, set_is_day_pattern_select_open] = useState(false);
  const [is_time_slot_select_open, set_is_time_slot_select_open] = useState(false);

  const {
    semester_filter,
    set_semester_filter,
    department_filter,
    set_department_filter,
    course_type_filter,
    set_course_type_filter,
    special_enrollment_filter,
    set_special_enrollment_filter,
    day_pattern_filter,
    set_day_pattern_filter,

    semesters,
    departments,
    course_types,
    special_enrollments,
    day_patterns,
  } = use_filter_context();

  return (
    <Sidebar>
      <SidebarContent className="gap-0">
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
        <h3 className="pt-4 pl-4">Filters</h3>

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

        <SidebarGroup>
          <SidebarGroupLabel>Course Type</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <CourseTypeSelect
                  current_select={course_type_filter}
                  is_open={is_course_type_select_open}
                  set_is_open={set_is_course_type_select_open}
                  on_select={set_course_type_filter}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Special Enrollment</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SpecialEnrollmentSelect
                  current_select={special_enrollment_filter}
                  is_open={is_special_enrollment_select_open}
                  set_is_open={set_is_special_enrollment_select_open}
                  on_select={set_special_enrollment_filter}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Day Pattern</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DayPatternSelect
                  current_select={day_pattern_filter}
                  is_open={is_day_pattern_select_open}
                  set_is_open={set_is_day_pattern_select_open}
                  on_select={set_day_pattern_filter}
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
