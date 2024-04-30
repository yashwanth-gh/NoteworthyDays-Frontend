import authFunctions from "@/api/authApi/auth";
import userFunctions from "@/api/userApi/user";
import Loader from "@/components/shared/Loader";
import { useAppDispatch } from "@/redux/hooks";
import { AuthState, setAuth } from "@/redux/slices/authSlice";
import { ApiResponse } from "@/types";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// The back end server, I am using Has both token Authentication and Session Authentication
// It Left to front end Choose Both token and session auth Or just use token authentication
// In my application, I am just using Token authentication.I left session Because, because it
// gets too much complicated. Wrapper component Helps in Refreshing the refresh token every time.
// When user accesses the private route. And also Feels the redux store with user information.

const PersistLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleUserResponse = async (response: ApiResponse) => {
      if (response.success === false) {
        if (response.message === "REFRESH ACCESS TOKEN") {
          // SHOULD REFRESH ACCESS TOKEN
          console.log("REFRESHing ACCESS TOKEN");
          const isRefreshed = await authFunctions.refreshAccessToken();
          return isRefreshed;
        } else if (response.message === "REDIRECT TO SIGNIN") {
          if (location.pathname != "/")
            navigate("/signin", { state: { from: location } });
        } else {
          if (location.pathname != "/")
            navigate("/signup", { state: { from: location } });
        }
      } else {
        // NOT REQUIRED TO REFRESH
        return response;
      }
    };

    const handleRefreshResponse = async (response: ApiResponse) => {
      if (response?.success === true && !response?.data) {
        // REFRESHING TOKEN
        console.log("REFRESHed TOKEN");
        return await userFunctions.getUserDetails();
      } else if (response?.success === false && !response?.data) {
        if (location.pathname != "/")
          navigate("/signin", { state: { from: location } });
      } else {
        // NOT REFRESHING TOKEN
        return response;
      }
    };

    const fetchData = async () => {
      try {
        const userResponse = await userFunctions.getUserDetails();
        const handledUserResponse = (await handleUserResponse(
          userResponse
        )) as ApiResponse;
        const handledRefreshResponse = (await handleRefreshResponse(
          handledUserResponse
        )) as ApiResponse;
        // FINAL DATA:", handledRefreshResponse
        return handledRefreshResponse;
      } catch (error) {
        console.error("Error:", error);
        navigate("/unauthorized");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData().then((res) => {
      const existingAccount = res;
      if (!existingAccount) return;
      const newUserData: AuthState = {
        id: existingAccount.data?._id,
        fullName: existingAccount.data?.fullName,
        email: existingAccount.data?.email,
        profilePicUrl:
          existingAccount.data?.profilePictureUrl ||
          "/public/defaultProfile.svg",
        isLoggedIn: true,
        isVerified: existingAccount.data?.is_email_verified,
        role: existingAccount.data?.role?.role_type,
        accountStatus: existingAccount.data?.account_status,
      };
      dispatch(setAuth(newUserData));
    });
  }, []);

  return <>{isLoading ? <Loader /> : <Outlet />}</>;
};

export default PersistLogin;
