import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPaaswordValidation } from "@/lib/validations";
import { z } from "zod";

const ResetPassword = () => {
  const navigate = useNavigate();
  // Get the current location object
  const location = useLocation();
  // Extract query parameters from location.search
  const searchParams = new URLSearchParams(location.search);
  // Get the 'resetToken' query parameter
  const resetToken = searchParams.get("resetToken");

  // 1. Define your form.
  const form = useForm<z.infer<typeof resetPaaswordValidation>>({
    resolver: zodResolver(resetPaaswordValidation),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof resetPaaswordValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const { formState } = form;

  return (
    <div className="bg-white px-8 lg:px-12 py-4 rounded-lg max-w-[450px] w-full h-auto">
      <div className="text-center py-4 mb-3">
        <h1 className="nothing-you-could-do-regular text-2xl mb-4">
          Noteworthy<span className="text-red-600">Days!</span>
        </h1>
        <h2 className="font-medium text-2xl mb-2">Reset Your Passwrod</h2>
        <p className="font-thin text-sm ">
          Please enter your new Password. Make sure to enter a new password that
          is strong and also you can remember
        </p>
      </div>
      <div className="bg-blue-50 border rounded px-2 mb-2">
        <ul>
          {formState.errors.newPassword && (
            <li>
              <span className="text-red-600 text-xs">
                ❎ {formState.errors.newPassword.message}
              </span>
            </li>
          )}
          {formState.errors.confirmPassword && (
            <li>
              <span className="text-red-600 text-xs">
                ❎ {formState.errors.confirmPassword.message}
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
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="your password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="retype password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-white py-2 rounded-md mb-2"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col items-center mt-2 gap-1">
        <div>
          <p className="font-semi text-xs text-gray-400">
            OTP expires in 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
