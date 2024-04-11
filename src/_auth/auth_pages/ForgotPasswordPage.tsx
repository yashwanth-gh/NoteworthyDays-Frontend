import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmailValidation } from "@/lib/validations";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useForgotPassword } from "@/lib/tanstack-query/queriesAndMutation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import MiniLoader from "@/components/shared/MiniLoader";

const ForgotPasswordPage = () => {
    const {mutateAsync:sendResetPasswordLink,isPending:isRequesting,isError,isSuccess} = useForgotPassword()
    const {toast} = useToast();
  // 1. Define your form.
  const form = useForm<z.infer<typeof EmailValidation>>({
    resolver: zodResolver(EmailValidation),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof EmailValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if(!values.email) return;
    const res = await sendResetPasswordLink(values.email)
    if(!res.success){
        toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          });
    }else{
        toast({
            title: "🎉Success🎊",
            description: res.message,
          })
    }
  }

  if(isError){
    return (
      <div className="bg-white px-8 lg:px-12 py-4 rounded-lg max-w-[450px] w-full h-auto">
        <div className="text-center py-4 mb-3">
          <h1 className="nothing-you-could-do-regular text-2xl mb-4">
            Noteworthy<span className="text-red-600">Days!</span>
          </h1>
          <h2 className="font-medium text-2xl mb-2 text-red-500">Forgot Password</h2>
          <p className="font-regular text-sm text-red-500">
            Please wait for some time to resend email.Cool down time is 1 minute
          </p>
        </div>
      </div>
    )
  }

  if(isSuccess){
    return (
      <div className="bg-white px-8 lg:px-12 py-4 rounded-lg max-w-[450px] w-full h-auto">
        <div className="text-center py-4 mb-3">
          <h1 className="nothing-you-could-do-regular text-2xl mb-4">
            Noteworthy<span className="text-red-600">Days!</span>
          </h1>
          <img src="/public/emailSent.svg" alt="illustration" />
          <p className="font-bold text-md ">
            Please check your Email Inbox for the Reset link.
          </p>
        </div>
      </div>
    )
  }

  const { formState } = form;
  return (
    <div className="bg-white px-8 lg:px-12 py-4 rounded-lg max-w-[450px] w-full h-auto">
      <div className="text-center py-4 mb-3">
        <h1 className="nothing-you-could-do-regular text-2xl mb-4">
          Noteworthy<span className="text-red-600">Days!</span>
        </h1>
        <h2 className="font-medium text-2xl mb-2">Forgot Password</h2>
        <p className="font-thin text-sm ">
          Please enter your existing Email address.
        </p>
      </div>
      <div className="bg-blue-50 border rounded px-2 mb-2">
        <ul>
          {formState.errors.email && (
            <li>
              <span className="text-red-600 text-xs">
                ❎ {formState.errors.email.message}
              </span>
            </li>
          )}
        </ul>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="your password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 mb-2 flex justify-center"
              disabled={isRequesting}
            >
              {isRequesting ? <MiniLoader/> : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col items-center mt-2 gap-1">
        <Link to={"/signin"} className="w-full">
          <Button
            type="submit"
            className="w-full bg-black hover:bg-black text-white py-2"
          >
            Cancel
          </Button>
        </Link>
        <div>
          <p className="font-semi text-xs text-gray-400">
            Reset password link expires in 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
