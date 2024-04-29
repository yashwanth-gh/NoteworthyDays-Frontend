import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";

//~ shad cn/ui imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninValidation } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginIntoExistingAccount } from "@/lib/tanstack-query/queriesAndMutation";
import { useToast } from "@/components/ui/use-toast";
import MiniLoader from "@/components/shared/MiniLoader";
import { useAppDispatch } from "@/redux/hooks";
import { AuthState, setAuth } from "@/redux/slices/authSlice";

const SignIn = () => {
  const emailFocusRef = useRef<HTMLInputElement | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutateAsync: loginIntoAccount, isPending: isLogginIntoAccount } =
    useLoginIntoExistingAccount();
  const location = useLocation();
  const navigate = useNavigate();
  const fromLocation = location.state?.from?.pathname || "/";
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (emailFocusRef.current) {
      emailFocusRef.current.focus();
    }
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    if (!values) return;

    const existingAccount = await loginIntoAccount(values);

    if (!existingAccount.success) {
      return toast({
        title: "Error",
        description: existingAccount.message,
        variant: "destructive",
      });
    }

    const newUserData: AuthState = {
      id: existingAccount.data?._id,
      fullName: existingAccount.data?.fullName,
      email: existingAccount.data?.email,
      profilePicUrl:
        existingAccount.data?.profilePictureUrl || "/public/defaultProfile.svg",
      isLoggedIn: true,
      isVerified: existingAccount.data?.is_email_verified,
      role: existingAccount.data?.role?.role_type,
      accountStatus: existingAccount.data?.account_status,
    };
    dispatch(setAuth(newUserData));
    navigate(fromLocation, { replace: true });

    //*working correctly
  }

  const { formState } = form;

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="bg-white px-8 lg:px-12 py-4 rounded-lg max-w-[450px] w-full h-auto">
      <div className="text-center py-4">
        <h1 className="nothing-you-could-do-regular text-xl">
          Noteworthy<span className="text-red-600">Days!</span>
        </h1>
        <p className="font-thin text-lg ">
          Never miss any important Day again!
        </p>
        <h2 className="font-medium text-2xl ">Signin to existing account</h2>
      </div>
      <div>
        <Button type="submit" className="w-full">
          <i className="fa-brands fa-google"></i>&nbsp;&nbsp;Sign in with Google
          +
        </Button>
        <div className="relative py-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border rounded px-2">
        <ul>
          {formState.errors.email && (
            <li>
              <span className="text-red-600 text-xs">
                ❎ {formState.errors.email.message}
              </span>
            </li>
          )}
          {formState.errors.password && (
            <li>
              <span className="text-red-600 text-xs">
                ❎ {formState.errors.password.message}
              </span>
            </li>
          )}
        </ul>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johnDoe@gmail.com"
                    autoComplete="new-email"
                    {...field}
                    ref={emailFocusRef}
                  />
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
                      <Input
                        className="w-full rounded-none rounded-s-lg"
                        placeholder="your password"
                        autoComplete="new-password"
                        {...field}
                        type={isPasswordVisible ? "text" : "password"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-auto ml-auto rounded-none rounded-e-lg bg-white border hover:bg-transparent"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? (
                <i className="fa-solid fa-eye-slash password-vis"></i>
              ) : (
                <i className="fa-solid fa-eye password-vis"></i>
              )}
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLogginIntoAccount}
          >
            {!isLogginIntoAccount ? "Sign in" : <MiniLoader />}
          </Button>
        </form>
      </Form>
      <div className="flex justify-between items-center">
        <div className="text-center mt-2">
          <p className="font-thin text-sm">
            Don't have an account?&nbsp;
            <Link to={"/signup"} className="text-blue-700 font-normal">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="text-center mt-2">
          <p className="font-thin text-sm">
            <Link to={"/forgotPassword"} className="text-blue-700 font-normal">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
