'use client'
import {
  Pencil,
  Plus,
  Trash,
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
import { sql_delete, sql_query } from "@/utils";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

type CreditHourSelectProps = {
  current_select: string | null;
  is_open: boolean;
  set_is_open: (is_open: boolean) => void;
  on_select: (credit_hour_title: string | null) => void;
};

export function CreditHourSelect({
  current_select,
  is_open,
  set_is_open,
  on_select
}: CreditHourSelectProps) {
  const {
    credit_hours,
  } = use_filter_context();

  const formSchema = z.object({
    credit_hour: z
    .string()
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function on_add_submit(values: z.infer<typeof formSchema>) {
    const sql = `INSERT INTO credit_hours (credit_hour) VALUES ('${values.credit_hour}');`;
    console.log(sql);
  }

  /* function on_edit_submit(values: z.infer<typeof formSchema>, original_credit_hour: string) { */
  /*   const sql = `UPDATE credit_hours SET credit_hour = '${values.credit_hour}' WHERE credit_hour = '${original_credit_hour}';`; */
  /*   console.log(sql); */
  /* } */

  return (
    <Popover
      open={is_open}
      onOpenChange={(is_open) => {set_is_open(is_open)}}
      modal={true}
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
              <DialogTitle>Add new credit hour:</DialogTitle>
              <DialogDescription>
                Add new credit hour here. Click submit when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(on_add_submit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="credit_hour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Credit Hour:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0.0, 0-99, etc."
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
        <Command className="rounded-lg border shadow-md md:min-w-[12rem]">
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
                <div className="ml-auto"/>
                {/* TODO: the edit function is a UI nightmare
                return when better solution */}
                {/* <Dialog> */}
                {/*   <DialogTrigger asChild> */}
                {/*     <Button */}
                {/*       variant="ghost" */}
                {/*       size="icon" */}
                {/*       onClick={(e) => { */}
                {/*         e.stopPropagation() */}
                {/*       }} */}
                {/*     > */}
                {/*       <Pencil/> */}
                {/*     </Button> */}
                {/*   </DialogTrigger> */}
                {/*   <DialogContent className="sm:max-w-[325px]"> */}
                {/*     <DialogHeader> */}
                {/*       <DialogTitle>Edit credit hour:</DialogTitle> */}
                {/*       <DialogDescription> */}
                {/*         Edit this credit hour. */}
                {/*         Note: all others courses will be updated to the new value */}
                {/*       </DialogDescription> */}
                {/*     </DialogHeader> */}
                {/*     <Form {...form}> */}
                {/*       <form */}
                {/*         onSubmit={form.handleSubmit((values) => */}
                {/*           on_edit_submit(values, credit_hour.credit_hour) */}
                {/*         )} */}
                {/*         className="flex flex-col gap-4" */}
                {/*       > */}
                {/*         <FormField */}
                {/*           control={form.control} */}
                {/*           name="credit_hour" */}
                {/*           render={({ field }) => ( */}
                {/*             <FormItem> */}
                {/*               <FormLabel>Credit Hour:</FormLabel> */}
                {/*               <FormControl> */}
                {/*                 <Input */}
                {/*                   placeholder="0.0, 0-99, etc." */}
                {/*                   className="w-32" */}
                {/*                   {...field} */}
                {/*                 /> */}
                {/*               </FormControl> */}
                {/*               <FormMessage /> */}
                {/*             </FormItem> */}
                {/*           )} */}
                {/*         /> */}
                {/*         <Button type="submit" className="ml-auto">Save Changes</Button> */}
                {/*       </form> */}
                {/*     </Form> */}
                {/*   </DialogContent> */}
                {/* </Dialog> */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    const sql = `DELETE FROM credit_hour WHERE credit_hour = '${credit_hour.credit_hour}';`;
                    sql_delete(sql);
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
