import { TypeAnimation } from "react-type-animation";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useMobile from "../Hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setisSearchPage] = useState(false);
  const [isMobile] = useMobile();

  useEffect(() => {
    const isSearch = location.pathname === "/s";
    setisSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/s");
  };

  return (
    <div  
     className=" w-auto min-w-70 lg:min-w-100 h-10 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-700 bg-slate-100 group focus-within:border-amber-400 mx-3">

      <div>
        {(isMobile && isSearchPage) ? (
          <Link
            to={"/"}
            className="flex justify-center items-center h-full  gap-3 group-focus-within:text-amber-400 bg-white p-1 rounded-full m-2"
          >
            <IoMdArrowRoundBack size={22} />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full px-2 gap-3 group-focus-within:text-amber-400">
            <IoIosSearch size={22} />
          </button>
        )}
      </div>

      <div onClick={redirectToSearchPage}>
        {!isSearchPage ? (
          <div>
            <TypeAnimation
              sequence={[
                'Search "milk"',
                1000,
                'Search "sugar"',
                1000,
                'Search "bread"',
                1000,
                'Search "panner"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
                1000,
                'Search "diry milk"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "chocolate"',
                1000,
              ]}
              wrapper="span"
              speed={10}
              repeat={Infinity}
            />
          </div>
        ) : (
          <div>
            <input
             
              className=" outline-none"
              autoFocus
              type="text"
              placeholder="Search aata dal more."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
