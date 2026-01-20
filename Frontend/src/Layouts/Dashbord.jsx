import { Outlet } from "react-router-dom"
import UserMenu from "../components/UserMenu"


const Dashbord = () => {
  return (
 
   <section className="bg-white">
    <div className=" container mx-auto p-5 grid lg:grid-cols-[250px_1fr] gap-6">

         {/* left for menu */}
          <div className=" max-h-[calc(100vh-96px)] py-4 sticky top-24 overflow-auto hidden lg:block border-r border-neutral-400">
            <UserMenu/>
          </div>
            {/* right for content  */}
          <div className=" min-h-[70vh] lg:min-h-[74vh]  ">
              <Outlet/>
          </div>
    </div>
   </section>


  )
}

export default Dashbord