import CustomAlertDialog from "@/components/shared/CustomAlertDialog";
import MiniLoader from "@/components/shared/MiniLoader";
import { Button } from "@/components/ui/button";
import { topbarLinks } from "@/constants";
import { useLogoutOfAccount } from "@/lib/tanstack-query/queriesAndMutation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearAuth } from "@/redux/slices/authSlice";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Topbar = () => {
  const [open, setOpen] = useState(false); //this is for delete confirmation dialog
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isLoggedIn);
  const { mutateAsync: logout, isPending, isError } = useLogoutOfAccount();
  const { toast } = useToast();

  const handleLogout = async () => {
    const res = await logout();

    if (!res.success) {
      console.log(res)
      return toast({
        title: "Error",
        description: res.message,
        variant: "destructive",
      });
    }
    dispatch(clearAuth());
    if (location.pathname !== "/")
      navigate("/signin", {
        state: { from: location },
        replace: true,
      });
    return toast({
      title: "Success",
      description: "Logged out successfully",
    });
  };

  return (
    <div className="topbar">
      <div className="mobile-menu">
        <span className="material-symbols-rounded text-4xl text-primary">
          menu
        </span>
      </div>
      <div>
        {/* add logo here */}
        <h1 className="nothing-you-could-do-regular text-lg md:text-2xl">
          Noteworthy<span className="text-yellow-300">Days!</span>
        </h1>
      </div>
      <nav className="flex flex-1 justify-end items-center">
        <ul className="hidden md:flex flex-1 justify-evenly">
          {topbarLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.route} className="font-bold">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        {!isAuthenticated ? (
          <div className="flex gap-5">
            <div>
              {/* add login button here */}
              <Button
                className="rounded-none font-bold"
                onClick={() =>
                  navigate("/signin", {
                    state: { from: location },
                    replace: true,
                  })
                }
              >
                LOGIN
              </Button>
            </div>
            <div>
              {/* add signup button here */}
              <Button
                className="rounded-none font-bold"
                onClick={() => navigate("/signup")}
              >
                SIGN UP
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link to={"/account"}>
              {/* add accout button here */}
              <span className="material-symbols-rounded text-black text-4xl bg-primary">
                person
              </span>
            </Link>
            <div>
              {/* add logout button here */}
              <Button
                className="rounded-none font-bold px-1.5 md:px-4"
                onClick={() => setOpen(true)}
                disabled={isPending}
              >
                {!isPending ? (
                  <>
                    <span className="hidden md:inline-block">LOGOUT</span>
                    <span className="material-symbols-rounded md:hidden font-bold">
                      logout
                    </span>
                  </>
                ) : (
                  <MiniLoader />
                )}
              </Button>
              <CustomAlertDialog
                open={open}
                setOpen={setOpen}
                OkFunction={handleLogout}
                dialogTitle="Are you sure to logout?"
                dialogDescription="You will be logged out of your account."
              />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Topbar;
