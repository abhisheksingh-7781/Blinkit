import { Outlet } from "react-router-dom"
import UserMenu from "../components/UserMenu"


const Dashbord = () => {
  return (
 
   <section className="bg-white">
    <div className=" container mx-auto p-5 grid lg:grid-cols-[250px_1fr] gap-6">
          <div className="py-4 sticky top-24px overflow-auto hidden lg:block">
            <UserMenu/>
          </div>

          <div className="bg-white p-4 ">
              <Outlet/>
          </div>
    </div>
   </section>


  )
}

export default Dashbord