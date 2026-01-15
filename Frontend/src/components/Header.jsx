import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown, FaAngleUp, FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import useMobile from "../Hooks/useMobile";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import { useState } from "react";

const Header = () => {


 const user = useSelector((state) => state?.user)
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const navigate = useNavigate();
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearch = location.pathname === "/s";
  const redirectLoginPage = () => {
    navigate("/login");
  };
  const hendleCloseUserMenu =() =>{
    setOpenUserMenu(false)
  }

  const hendleMobileUser = () => {
   if(!user._id){
    navigate("/login");
    return;
   }
    navigate("/user");
  }

  return (
    <header className="h-26 lg:h-20  lg:shadow-md  bg-white flex  flex-col justify-center gap-2">
      {!(isSearch && isMobile) && (
        <div className="container mx-auto flex items-center  px-4 justify-between">
          {/* Logo */}
          <div className="h-full">
            <Link to={"/"} className="h-full flex justify-center items-center">
              <img
                src={logo}
                width={170}
                height={60}
                alt="logo"
                className="hidden lg:block"
              />

              
              <img
                src={logo}
                width={130}
                height={60}
                alt="logo"
                className="lg:hidden"
              />
            </Link>
            
          </div>
          {/* search */}

          <div className=" hidden lg:block px-2">
            <Search />
          </div>

          {/* Login */}

          <div className="">
            {/* This is only show for moblie version */}
            <button className="text-neutral-800 lg:hidden" 
            onClick={hendleMobileUser}>
              <FaUserCircle size={30}  />
            </button>

            {/* This is show on destop version  */}
            <div className=" hidden lg:flex items-center gap-10  ">
              {
                user?._id ? (
                  <div className=" relative">

                    <div 
                    onClick={() => setOpenUserMenu(prev => !prev)} className="flex items-center gap-1 select-none cursor-pointer px-2 ">
                      <p className="font-bold text-green-600">
                        Account
                      </p>
                      {openUserMenu ? (
                          <FaAngleUp size={25} />
                        ) : (
                          <FaAngleDown size={25} />
                        )
                      }
                    </div>
                    {
                      openUserMenu && (
                      <div className=" absolute right-0 top-13 w-max ">
                        <div className="bg-white rounded p-4 min-w-52 lg: shadow-lg border border-gray-200">
                          <UserMenu close={hendleCloseUserMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={redirectLoginPage}
                    className="text-xl font-semibold  cursor-pointer px-2"
                  >
                    Login
                  </button>
                )}

              {/* Add to cart icon */}
              <button className="flex items-center gap-2 px-3 py-3 bg-green-800 hover:bg-green-500 rounded text-white ">
                <div className="animate-bounce">
                  <TiShoppingCart size={28} />
                </div>
                <div className=" font-bold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" container mx-auto lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
