import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../Store/Reducers/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxisoTostError";
import Axios from "../utils/Axios.config";

const UserMenu = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const firstName = user?.name?.split(" ")[0];

  const logoutHandler = async () => {
    try {
      const response = await Axios.get("/user/logout");

      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-56 bg-white shadow-lg rounded-xl p-4 border">
      {/* User Info */}
      <div className="flex items-center gap-3 border-b pb-3">
        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
          {firstName?.[0] || "U"}
        </div>
        <div>
          <p className="font-semibold text-gray-800">
            {firstName || user?.mobile}
          </p>
          <p className="text-xs text-gray-500">My Account</p>
        </div>
      </div>

      {/* Menu Links */}
      <div className="mt-3 text-sm text-gray-700">
        <Link to="/profile" className="block px-2 py-2 rounded-lg hover:bg-gray-100">
          👤 Profile
        </Link>

        <Link to="/orders" className="block px-2 py-2 rounded-lg hover:bg-gray-100">
          📦 Orders
        </Link>

        <Link to="/wishlist" className="block px-2 py-2 rounded-lg hover:bg-gray-100">
          ❤️ Wishlist
        </Link>

        <hr className="my-2" />

        <button
          onClick={logoutHandler}
          className="block w-full text-left px-2 py-2 rounded-lg text-red-500 hover:bg-red-50"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
