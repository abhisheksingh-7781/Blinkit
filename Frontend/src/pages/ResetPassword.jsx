import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxisoTostError";
import Axios from "../utils/Axios.config";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState(false);


  const fillAll = Object.values(data).every((el) => el);


  useEffect(() => {
    if (!location?.state?.otp?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔒 stops URL leak

    if(data.newPassword !== data.confirmPassword){
         toast.error("New password and confirm password is not same")
         return
    }

    try {
      const response = await Axios.put("user/reset-password", {
        email:data.email,
        newPassword:data.newPassword,
        confirmPassword:data.confirmPassword
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

    const hendleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // console.log("data reset password", data);

  return (
    <section className="w-full container mx-auto px-4 py-10">
      <div className="bg-white my-3 w-full max-w-md mx-auto rounded p-6">
        <p className="text-center lg:text-2xl lg:font-bold text-yellow-500">
          {" "}
          Reset Your Password{" "}
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-3">
          <div className="grid gap-2 ">
            <label className="font-bold text-gray-600" htmlFor="newPassword">
              New Password: 
            </label> 
            <div  
              className=" flex items-center bg-gray-100 px-4 py-3 text-xl border-2 border-transparent rounded-xl outline-none  focus-within:border-yellow-300  "
              id="newPassword"
            >
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-full outline-none "
                name="newPassword"
                value={data.newPassword}
                onChange={hendleChange}
              />
              <div 
                onClick={() => setShowPassword((preve) => !preve)}
                className=" cursor-pointer"
              > 
                {showPassword ? <IoEye /> : <IoEyeOffSharp />}
              </div> 
            </div> 
          </div> 
          <div className="grid gap-2 "> 
            <label 
              className="font-bold text-gray-600"
              htmlFor="confirmPassword"
            > 
              Confirm Password:
            </label> 
            <div 
              className=" flex items-center bg-gray-100 px-4 py-3 text-xl border-2 border-transparent rounded-xl outline-none  focus-within:border-yellow-300  "
              id="confirmPassword"
            > 
              <input 
                type={confirmpassword ? "text" : "password"}
                className="w-full h-full outline-none "
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={hendleChange}
              /> 
              <div 
                onClick={() => setconfirmpassword((preve) => !preve)}
                className=" cursor-pointer"
              > 
                {confirmpassword ? <IoEye /> : <IoEyeOffSharp />}
              </div> 
            </div> 
          </div> 

          <button 
            type="submit"
            disabled={!fillAll}
            className={` ${
              fillAll ? "bg-green-600" : "bg-gray-500"
            } text-white text-xl px-2 py-2 m-2 rounded-xl`}
          >
            SEND OTP
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
