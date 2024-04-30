import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <section className="flex flex-col justify-center gap-8 items-center md:flex-row p-4 md:px-20">
      <img
        src="/public/404NF.svg"
        alt="404-illustration"
        className="md:w-2/4 md:h-2/4 w-full h-full"
      />
      <Link to={"/"} className=" text-center">
        <Button>Go back to Home</Button>
      </Link>
    </section>
  );
};

export default Missing;
