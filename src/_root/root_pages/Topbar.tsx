import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();
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
          <Link to={"/signin"} state={{from:location}} replace>
          <Button className='rounded-full px-6'>Login</Button>
          </Link>
        </div>
        <div>
          {/* add signup button here */}
          <Link to={"/signup"}>
          <Button className=" rounded-full">Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
