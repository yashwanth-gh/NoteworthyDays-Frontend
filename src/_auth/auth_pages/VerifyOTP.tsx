import { Button } from "@/components/ui/button";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { useVerifyOTP } from "@/lib/tanstack-query/queriesAndMutation";
import MiniLoader from "@/components/shared/MiniLoader";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {email:"yashwanthbm36@gmail.com"};
  const {mutateAsync : verifyOTP ,isPending:isVerifyingOTP,isError} = useVerifyOTP();


  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const otp = formData.get('otp') as string;
    const response = await verifyOTP({email,otp});
    if(response.message){
        navigate("/signin")
    }
    navigate("/signin")
  };
//   ------------------------ below code is regarding resend timer ------------------------
  const Completionist = () => (
    <span>
      <a href="" className="text-blue-400">
        Resend
      </a>
    </span>
  );

  // Renderer callback with condition
  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className=" text-blue-500">
          {minutes}:{seconds}s
        </span>
      );
    }
  };
//   ------------------------ above code is regarding resend timer ------------------------

  return (
    <div className="bg-white px-8 lg:px-12 py-4 rounded-lg max-w-[450px] w-full h-auto">
      <div className="text-center py-4 mb-6">
        <h1 className="nothing-you-could-do-regular text-2xl mb-4">
          NoteworthyDays!
        </h1>
        <h2 className="font-medium text-2xl mb-2">OTP verification</h2>
        <p className="font-thin text-sm ">
          Please enter your one-time-password(OTP) sent to your registered email
          address to complete your verification.
        </p>
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="number"
            name="otp"
            placeholder="Enter OTP"
            pattern="\d{6}"
            className="flex h-10 mb-4 w-full rounded-md border border-black bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50"
          />

          <Button
            type="submit"
            className="w-full text-white py-2 rounded-md mb-2"
            disabled={isVerifyingOTP}
          >
            {isVerifyingOTP ? <MiniLoader/> : "Verify"}
          </Button>
          <Button
            type="button"
            className="w-full bg-gray-600 hover:bg-black text-white py-2 rounded-md"
            onClick={() => navigate("/signin")}
            disabled={isVerifyingOTP}
          >
            Cancel
          </Button>
        </form>
      </div>
      <div className="flex flex-col items-center mt-2 gap-1">
        {/* resend and expires in */}
        <div>
          <p className="font-semi text-xs ">
            resend OTP in?&nbsp;
            <Countdown date={Date.now() + 65000} renderer={renderer} />
          </p>
        </div>
        <div>
          <p className="font-semi text-xs text-gray-400">
            OTP expires in 10 minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
