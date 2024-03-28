import { Button } from "@/components/ui/button";
import React from "react";

const Topbar = () => {
  return (
    <div className="topbar">
      <div>
        {/* add logo here */}
        <h1 className="nothing-you-could-do-regular text-xl">
          Noteworthy<span className="text-red-600">Days!</span>
        </h1>
      </div>
      <div className="flex gap-2">
        <div>
          {/* add login button here */}
          <Button className='rounded-full px-6'>Login</Button>
        </div>
        <div>
          {/* add signup button here */}
          <Button className=" rounded-full">Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
