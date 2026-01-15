import  Axios  from '../utils/Axios.config';
import React, { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxisoTostError';
import { updateAvtar } from '../Store/Reducers/userSlice';
import { IoClose } from 'react-icons/io5';

const UserProfileAvtarEdit = ({close}) => {

    const user = useSelector((state)=>state.user);
    const dispatch = useDispatch()
    const [Loading, setLoading] = useState(false);


    const hendleUploadAvatar = async(e)=>{
         const file = e.target.files[0];

         if(!file) return;

         setLoading(true);
         const formData = new FormData();
            formData.append("avatar", file);
            
            try {
                 setLoading(true);
                 const response = await Axios.put("/user/upload-avatar", formData )
                 const {data : responseData} =response;
                 dispatch(updateAvtar(responseData.data))
               console.log(response);
            } catch (error) {
               AxiosToastError(error);
            }
            finally{
               setLoading(false);
            }
                  

    }
      return (
    <section className='fixed top-0 left-0 right-0 bottom-0  bg-neutral-900 opacity-90 flex items-center justify-center'>
          <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center gap-4'>
            <button onClick={close} className='text-neutral-900 w-fit block ml-auto cursor-pointer'>
              <IoClose size={25}/>
            </button>
             <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-md'>
                {
                    user.avatar ? (
                       <img src={user.avatar} alt={user.name} />
                    )
                    :(<FaUserCircle size={65} />)
                   }
                    
             </div>
                   <form action="" onSubmit={(e)=>e.preventDefault()}>
                    <label htmlFor="uploadFile">
                        <div className=' text-md font-bold border border-amber-300 hover:border-amber-400 hover:bg-amber-400 px-3 py-1 rounded my-2 cursor-pointer '>
                              {
                                Loading ? "Uploading..." : "Upload"
                              }
                   </div>
                    </label>
                     <input onChange={hendleUploadAvatar} type="file" id='uploadFile' className=' hidden' />
                   </form>       
          </div>

    </section>
  )
}

export default UserProfileAvtarEdit