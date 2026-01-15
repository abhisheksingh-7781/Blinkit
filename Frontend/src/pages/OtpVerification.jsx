import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import Axios from "../utils/Axios.config";
import AxiosToastError from "../utils/AxisoTostError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const fillAll = otp.every((el) => el);
  const navigate = useNavigate();
  const inputRef = useRef([])
  const location = useLocation()

  useEffect(()=>{
    if(!location?.state?.email){
         navigate("/forgotpassword")
    }
  },[])

  
    const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔒 stops URL leak
    try {
      const response = await Axios.put("user/verify-forgot-password-otp", {
        otp:otp.join(""),
        email: location?.state?.email
      });
         
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setOtp(["", "", "", "", "", ""]);
        navigate("/reset-password", {
          state: {
            otp: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-4">
      <div className="bg-white my-5 w-full max-w-md mx-auto rounded p-6">
 <h2 className="text-center text-2xl font-bold text-yellow-500">
          OTP Verification
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-3">
          <div className="grid gap-2">
            <label className="font-bold text-gray-600" htmlFor="otp">
              Enter Your OTP:
            </label>
            <div className=" flex justify-between gap-3 m-3 ">
              {otp.map((element, index) => {
                return (
                  <input
                  key={index}
                    type="text"
                    id="otp"
                    inputMode="numeric"
                    autoFocus={index === 0}
                    ref={(ref)=>{
                     inputRef.current[index] = ref
                     return ref
                    }}
                    value={otp[index]}
                    onChange={(e)=>{
                      const value= e.target.value
                      // console.log("value",value)
                      const newOtp=[...otp]
                      newOtp[index]=value
                      setOtp(newOtp)
                      if(value && index < 5){
                        inputRef.current[index+1].focus()
                      }
                    }} 
                    onKeyDown={(e) => handleKeyDown(e, index)}            
                    maxLength={1}                   
                    className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-300 text-center font-bold text-xl"
                    
                  />
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={!fillAll}
            className={` ${
              fillAll ? "bg-green-600" : "bg-gray-500"
            } text-white text-xl px-2 py-2 m-2 rounded-xl`}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </section>
  );
};

export default OtpVerification;
