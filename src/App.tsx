import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import {
  Account,
  Home,
  Missing,
  PersistLogin,
  Unauthorized,
} from "./_root/root_pages";
import AuthLayout from "./_auth/AuthLayout";
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
        {/* SIGN ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<VerifyOTP />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Route>

        {/* SECURE ROUTES */}
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
