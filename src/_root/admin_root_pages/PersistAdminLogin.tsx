import adminFunctions from "@/api/adminApi/admin";
import authFunctions from "@/api/authApi/auth";
import { useAppDispatch } from "@/redux/hooks";
import { AuthState, setAuth } from "@/redux/slices/authSlice";
import { ApiResponse } from "@/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PersistAdminLogin = () => {
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
          navigate("/admin/signin", { state: { from: location } });
        } else if (response.message === "NO ACCESS TO ADMIN PRIVILEGES") {
          navigate("/unauthorized");
        } else {
          navigate("/admin/signup", { state: { from: location } });
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
        return await adminFunctions.getAdminDetails();
      } else if (response?.success === false && !response?.data) {
        navigate("/admin/signin", { state: { from: location } });
      } else {
        // NOT REFRESHING TOKEN
        return response;
      }
    };

    const fetchData = async () => {
      try {
        const userResponse = await adminFunctions.getAdminDetails();
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

export default PersistAdminLogin;
