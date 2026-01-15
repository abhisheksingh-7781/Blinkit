import { FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import UserProfileAvtarEdit from "../components/UserProfileAvtarEdit";
import { useEffect, useState } from "react";
import  Axios  from '../utils/Axios.config';
import AxiosToastError from '../utils/AxisoTostError';
import toast from 'react-hot-toast';
import { setUser } from '../Store/Reducers/userSlice';
import FatchUserDetails from '../utils/FatchUserDetails';

const Profile = () => {
    const user = useSelector((state)=>state.user);
    const [openProfileavtarEdit, setProfileavtarEdit] = useState(false)
   
    
    const [userData, setUserData] = useState({
      name: user.name,
      mobile: user.mobile,
      email: user.email,
    })

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        setUserData({
           name: user.name,
           mobile: user.mobile,
           email: user.email,
          })
    },[user])

    const hendleOnChange =(e)=>{
      const {name,value}= e.target;
      setUserData((preve)=>{
         return {
          ...preve,
          [name]:value
         }
      })
    }

    const hendleSubmit= async(e)=>{
      e.preventDefault()
       try {
         setLoading(true)
            const response = await Axios.put("user/update-user",
              userData
            )

            const {data :responseData} = response

            if(responseData.success){
                 toast.success(responseData.message)
                 const userData = await FatchUserDetails() 
                 dispatch(setUser(userData.data))
            }
       } catch (error) {
         AxiosToastError(error)

       }finally{
        setLoading(false)
       }
    }
    
  return (
    <div>

      {/* Profile upload and display image */}

       <div className='w-20 h-20 flex items-center justify-center rounded-full  overflow-hidden drop-shadow-md '>
          {
            user.avatar ? (
             <img src={user.avatar} alt={user.name} />
            )
             :(<FaUserCircle size={65} />)
          }
        
        </div>

        <button onClick={()=>setProfileavtarEdit(true)} className="min-w-20 text-md border-2 border-amber-300 hover:border-amber-400 hover:bg-amber-300 px-3 py-1 rounded-full mt-3   ">Edit</button>     

         {
          openProfileavtarEdit && (
            
            <UserProfileAvtarEdit close={()=>setProfileavtarEdit(false)} />
          )
         }

        {/* name , mobile , Email , change Password  */}

        <form action="" className='my-4 grid gap-4' onSubmit={hendleSubmit} >
            <div className='grid '>
                <label htmlFor="">Name</label>
                <input type="text"
                      placeholder='Enter your name'
                      className='p-2 bg-blue-50 outline-0  border focus-within:border-amber-500 rounded'
                      value={userData.name}
                      name='name'
                      onChange={hendleOnChange}
                      required
                 />
            </div>

            <div className='grid'>
                <label htmlFor="email">Email</label>
                <input type="email"
                      id='email'
                      placeholder='Enter your Email'
                      className='p-2 bg-blue-50 outline-none border focus-within:border-amber-500 rounded'
                      value={userData.email}
                      name='email'
                      onChange={hendleOnChange}
                      required
                 />
            </div>


            <div className='grid'>
                <label htmlFor="mobile">Mobile</label>
                <input type="mobile"
                      id='mobile'
                      placeholder='Enter your Mobile'
                      className='p-2 bg-blue-50 outline-none border focus-within:border-amber-500 rounded'
                      value={userData.mobile}
                      name='mobile'
                      onChange={hendleOnChange}
                      required
                 />
            </div>
            
            <button className='border px-4 py-2 font-bold hover:border-yellow-400 hover:bg-yellow-400 text-yellow-400 hover:text-neutral-800  rounded cursor-pointer'>
              
              {
                loading ? "Loading..":"Submit"
              }
              </button>
            
        </form>

    </div>
  )
}

export default Profile


