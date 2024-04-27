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
} from "./_root/root_pages";
import {
  ForgotPasswordPage,
  ResetPassword,
  SignIn,
  SignUp,
  VerifyOTP,
} from "./_auth/auth_pages";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <main className="flex h-screen base-container">
      <Routes>
        {/* USER SIGN ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyOTP />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>
        {/* ADMIN SIGN ROUTES */}
        <Route element={<AdminAuthLayout />}>
          <Route path="/admin/signup" element={<AdminSignUp />} />
          <Route path="/admin/signin" element={<AdminSignIn />} />
          <Route path="/admin/verify" element={<AdminEmailVerify />} />
          <Route path="/admin/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* USER SECURE ROUTES */}
        <Route element={<PersistLogin />}>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Missing />} />
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
}

export default App;
