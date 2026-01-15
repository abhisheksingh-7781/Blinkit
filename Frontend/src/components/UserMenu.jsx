import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Store/Reducers/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxisoTostError";
import Axios from "../utils/Axios.config";
import Divider from "./Divider";
import { FiExternalLink } from "react-icons/fi";

const UserMenu = ({close}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  const logoutHandler = async () => {
    try {
      const response = await Axios.get("/user/logout");

      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response?.data?.message);
        window.history.back();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

    const hendleClose=()=>{
      if(close){
        close()
       }
    }

  return (
    <div>
      <div className=" font-semibold ">MY Account</div>
      <div className="text-bold flex items-center gap-2  ">
        <span className="max-w-52 line-clamp-1">{user.name || user.mobile}</span>
        <Link onClick={hendleClose} to={"/dashboard/profile" } className=" hover:text-amber-300">
          <FiExternalLink />
        </Link>
      </div>
      <Divider />
      <div className="text-sm grid gap-2 ">
        <Link onClick={hendleClose} to={"/dashboard/myorder"} className="px-2">
          MY Order
        </Link>
        <Link onClick={hendleClose} to={"/dashboard/address"} className="px-2">
          MY Address
        </Link>
        <button
          onClick={logoutHandler}
          className="text-left  px-2 hover:bg-red-300"
        > LogOut</button>
        
      </div>
    </div>
  );
};

export default UserMenu;
