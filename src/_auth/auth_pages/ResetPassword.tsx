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
import { resetPasswordValidation } from "@/lib/validations";
import { z } from "zod";
import { useResetforgottenPassword } from "@/lib/tanstack-query/queriesAndMutation";
import { useToast } from "@/components/ui/use-toast";
import MiniLoader from "@/components/shared/MiniLoader";

const ResetPassword = () => {
  const {mutateAsync:resetPassword,isPending:isResetingPassword,isError} = useResetforgottenPassword();
  const {toast} = useToast();
  const navigate = useNavigate();
  // Get the current location object
  const location = useLocation();
  // Extract query parameters from location.search
  const searchParams = new URLSearchParams(location.search);
  // Get the 'resetToken' query parameter
  const resetToken = searchParams.get("resetToken") as string;

  // 1. Define your form.
  const form = useForm<z.infer<typeof resetPasswordValidation>>({
    resolver: zodResolver(resetPasswordValidation),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resetPasswordValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if(!values.newPassword || !values.confirmPassword) return;
    const password = values.confirmPassword;
    const res = await resetPassword({resetToken,password});
    if(res.success){
      toast({
        title: "🔑 Password reset successfully 🔒",
        description: "You can now login with your new password😊",
      });
      navigate("/signin");
    }else{
      toast({
        title: "Password reset failed",
        description: "Please try again",
      });
    }
  }

  const { formState } = form;

if(isError){
  return (
    <div className="bg-white px-8 lg:px-12 py-4 rounded-lg max-w-[450px] w-full h-auto">
    <div className="text-center py-4 mb-3">
      <h1 className="nothing-you-could-do-regular text-2xl mb-4">
        Noteworthy<span className="text-red-600">Days!</span>
      </h1>
      <h2 className="font-medium text-2xl mb-2 text-red-500">Reset Your Passwrod</h2>
      <p className="font-regular text-sm text-red-500">
        Error reseting password, Please try again after some time!
      </p>
    </div>
  </div>
  )
}

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
              className="w-full py-2 mb-2"
              disabled={isResetingPassword}
            >
              {isResetingPassword ? <MiniLoader/> : "Reset Password"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
