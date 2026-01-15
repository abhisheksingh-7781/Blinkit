import { useState } from "react";
import toast from "react-hot-toast";

import Axios from "../utils/Axios.config";
import AxiosToastError from "../utils/AxisoTostError";
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",  
  });


  const navigate =useNavigate()

  const hendleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

    const fillAll = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔒 stops URL leak
    try {
      const response = await Axios.post("user/forgot-Password", {  
        email: data.email,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/otp-verification",{state : data})
        setData({
          email:"",
        })
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-4 py-10">
      <div className="bg-white my-3 w-full max-w-md mx-auto rounded p-6">
        <p className="text-center lg:text-2xl lg:font-bold text-yellow-500"> Forgot Password </p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-3">  

          <div className="grid gap-2">
            <label className="font-bold text-gray-600" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              className="w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-yellow-300"
              id="email"
              name="email"
              value={data.email}
              onChange={hendleChange}
            />
          </div>  

          <button
            type="submit"
            disabled={!fillAll}
            className={` ${fillAll ? "bg-green-600" : "bg-gray-500"
              } text-white text-xl px-2 py-2 m-2 rounded-xl`}
          >
            SEND OTP
          </button>
        </form>
       
      </div>
    </section>
  );
};

export default ForgotPassword;
