"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
})

export default function RegisterForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function on_submit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div style={{
      /* height: "100%", */
      flexGrow: "1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(on_submit)} className="space-y-8 flex flex-col gap-1">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem style={{
                margin: "0"
              }}>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    style={{
                      width: "16rem"
                    }}
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem style={{
                margin: "0"
              }}>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    style={{
                      width: "16rem"
                    }}
                    type="password"
                    placeholder="●●●●●●●●"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  )
}
