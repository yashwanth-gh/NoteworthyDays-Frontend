import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import AuthLayout from "./_auth/AuthLayout";
import AdminAuthLayout from "./_auth/AdminAuthLayout";
import {
  AdminEmailVerify,
  AdminSignIn,
  AdminSignUp,
} from "./_auth/admin_auth_pages";
import {
  Account,
  Home,
  Missing,
  PersistLogin,
  Unauthorized,
} from "./_root/user_root_pages";
import {
  ForgotPasswordPage,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyOTP,
} from "./_auth/user_auth_pages";
import { Toaster } from "@/components/ui/toaster";
import { AdminHome, PersistAdminLogin } from "./_root/admin_root_pages";
import AdminRootLayout from "./_root/AdminRootLayout";

function App() {
  return (
    <main className="flex h-screen base-container">
      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route>
          {/* USER SIGN ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyOTP />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
          </Route>

          {/* USER SECURE ROUTES */}
          <Route element={<PersistLogin />}>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="account" element={<Account />} />
              <Route path="*" element={<Missing />} />
            </Route>
          </Route>
        </Route>

        <Route>
          {/* ADMIN SIGN ROUTES */}
          <Route path="/admin/*" element={<AdminAuthLayout />}>
            <Route path="signup" element={<AdminSignUp />} />
            <Route path="signin" element={<AdminSignIn />} />
            <Route path="verify" element={<AdminEmailVerify />} />
            {/* <Route path="unauthorized" element={<Unauthorized />} /> */}
          </Route>

          {/* ADMIN SECURE ROUTES */}
          <Route element={<PersistAdminLogin />}>
            <Route path="/admin/*" element={<AdminRootLayout />}>
              <Route path="home" element={<AdminHome />} />
              <Route path="*" element={<Missing />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
