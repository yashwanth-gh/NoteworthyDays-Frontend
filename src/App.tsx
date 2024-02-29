import React from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "./_root/RootLayout";
import { Home } from "./_root/root_pages";
import AuthLayout from "./_auth/AuthLayout";
import { SignIn, SignUp } from "./_auth/auth_pages";


function App() {
  return (
    <main className="flex h-screen">
      
      <Routes>
        {/* SIGN ROUTES */}
        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Route>

        {/* SECURE ROUTES */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>

    </main>
  );
}

export default App;
