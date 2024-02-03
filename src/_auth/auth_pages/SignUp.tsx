import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { conf } from '@/conf/conf'

//~ shad cn/ui imports
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignupValidation } from '@/lib/validations'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Link } from 'react-router-dom'



const SignUp = () => {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setIsPasswordVisible((prev) => !prev);
    console.log(isPasswordVisible)
  }

  return (
    <div className='bg-white px-8 lg:px-12 py-4 rounded-lg w-auto h-auto'>
      <div className='text-center py-4'>
        <h1 className='nothing-you-could-do-regular text-xl'>
          NoteworthyDays!
        </h1>
        <p className='font-thin text-lg '>
          Never miss any important Day again!
        </p>
        <h2 className='font-medium text-2xl '>
          Create an account
        </h2>
      </div>
      <div>
        <Button type="submit" className='w-full'>
          <i className="fa-brands fa-google"></i>&nbsp;&nbsp;Sign in with Google +
        </Button>
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johnDoe@gmail.com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex items-end w-full justify-start">
            <div className="w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input className="w-full rounded-none rounded-s-lg" placeholder="your password" {...field} type={isPasswordVisible ? "text" : "password"} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className='w-auto ml-auto rounded-none rounded-e-lg bg-white border hover:bg-transparent' onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <i className="fa-solid fa-eye-slash password-vis"></i>
              ) : (
                <i className="fa-solid fa-eye password-vis"></i>)}
            </Button>
          </div>
          <Button type="submit" className='w-full'>Submit</Button>
        </form>
      </Form>
      <div className='text-center mt-2'>
        <p className='font-thin text-sm'>
          Don't have an account?&nbsp;
          <Link to={"/signin"} className='text-blue-700 font-normal'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp