import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <section className="flex flex-col justify-between items-center md:flex-row p-4 md:px-20">
      <img
        src="/public/401.svg"
        alt="401-illustration"
        className="w-full h-full"
      />
      <Link to={"/"} className=" text-center ">
        <Button>Go back to Home</Button>
      </Link>
    </section>
  );
};

export default Unauthorized;
