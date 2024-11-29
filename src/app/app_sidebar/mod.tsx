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
import { DepartmentPopover } from "./department"
import { SemesterSelect } from "@/components/select/semester"

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
          <SidebarGroupLabel>Department</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SemesterSelect/>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <DepartmentPopover/>

        <SidebarMenuItem>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  )
}
