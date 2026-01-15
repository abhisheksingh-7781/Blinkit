import { useState } from "react";
import toast from "react-hot-toast";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import Axios from "../utils/Axios.config";
import AxiosToastError from "../utils/AxisoTostError";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../Store/Reducers/userSlice"; 



const Login = () => {
  const [data, setData] = useState({   
    email: "",
    password: "", 
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate()
  const dispatch=useDispatch()

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
      const response = await Axios.post("/user/login", {  
        email: data.email,
        password: data.password,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
         toast.success(response.data.message);       
         localStorage.setItem("accesstoken",response.data.data.accessToken);
         localStorage.setItem("refreshToken",response.data.data.refreshToken);

         const userDetails = await Axios.get("user/login-user-details",)
        setData({
          email:"",
          password:"",      
        }) 
        
        dispatch(setUser(userDetails.data.data))

        navigate("/")
      }
    } catch (error) {
      AxiosToastError(error);
      console.log(error)
    }
  };

  return (
    <section className="w-full container mx-auto px-4">
      <div className="bg-white my-3 w-full max-w-md mx-auto rounded p-6">
        {/* <p className="text-center text-2xl font-bold"> Welcome to blinkit </p> */}
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

          <div className="grid gap-2 ">
            <label className="font-bold text-gray-600" htmlFor="password">
              Password:
            </label>
            <div
              className=" flex items-center bg-gray-100 px-4 py-3 text-xl border-2 border-transparent rounded-xl outline-none  focus-within:border-yellow-300  "
              id="password"
            >
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-full outline-none "
                name="password"
                value={data.password}
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

          <Link to={"/forgotpassword"} className="ml-auto block text-amber-400 hover:text-amber-300 font-semibold ">Forgot Password</Link>
          <button
            type="submit"
            disabled={!fillAll}
            className={` ${fillAll ? "bg-green-600" : "bg-gray-500"
              } text-white text-xl px-2 py-2 m-2 rounded-xl`}
          >
            Login
          </button>
        </form>
      
          <p className="flex justify-center items-center">Don't have an account ? <Link to={"/register"} className=" hover:text-blue-600 font-semibold text-blue-400   ">&nbsp; Register</Link></p>
   
      </div>
    </section>
  );
};

export default Login;
