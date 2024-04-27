import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SigninValidation } from "@/lib/validations";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import MiniLoader from "@/components/shared/MiniLoader";

const AdminSignIn = () => {
  const emailFocusRef = useRef<HTMLInputElement | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SigninValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
          Noteworthy<span className="text-yellow-400">Days!</span>
        </h1>
        <p className="font-thin text-sm mb-8">
          Never miss any important Day again!
        </p>
        <h2 className="font-medium text-2xl ">Admin Signin</h2>
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
            // disabled={isLogginIntoAccount}
          >
            {!true ? "Sign in" : <MiniLoader />}
          </Button>
        </form>
      </Form>
      <div className="flex justify-between items-center">
        <div className="text-center mt-2">
          <p className="font-thin text-sm">
            Don't have an account?&nbsp;
            <Link to={"/admin/signup"} className="text-blue-700 font-normal">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignIn;
