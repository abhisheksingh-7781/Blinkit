import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import uploadImage from '../utils/UploadImage';
import  Axios  from '../utils/Axios.config';
import AxiosToastError from '../utils/AxisoTostError';
import toast from 'react-hot-toast';


const UploadCategoryModel = ({close , fetchData}) => {
    const [loading, setLoading] = useState(false) 
    const [data, setData] = useState({
        name:"",
        image:""
    })

    const hendleOnchange =(e)=>{
         const {name,value} = e.target
         setData((preve)=>{
            return{
                ...preve,
                [name]:value
            }
         })

    }

    const handlesubmit = async(e)=>{
          e.preventDefault()
         try {
            setLoading(true)
            const response = await Axios.post("category/add-category",data)
            const { data : responseData } = response;
            if(responseData.success){
                toast.success(responseData.message);                
                close();
                fetchData();
            }
         } catch (error) {
            AxiosToastError(error)
         }finally{
               setLoading(false)
         }
    }

     const hendleUploadCategoryImage = async(e)=>{
           const file = e.target.files[0];

           if(!file){
            console.log("No selected file")
            return 
           }    

        const response= await uploadImage(file);
        const { data : ImageResponse} = response;
        setData((preve)=>{
            return{
            ...preve,
            image : ImageResponse.data.url
            }
        })
        
     }  


  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-900 opacity-90 flex items-center justify-center'>
        <div className='bg-white max-w-4xl w-full p-4 rounded '>
            <div className='flex items-center justify-between'>
                <h1 className='font-semibold opacity-100 text-2xl'>Category</h1>
                <button onClick={close} className=' cursor-pointer w-fit block ml-auto'>
                <IoClose size={25} />
            </button>
            </div>

                <form className='my-3 grid gap-2' onSubmit={handlesubmit}>
                   <div className='grid gap-1'>
                        <label id='categoryName'>Name</label>
                        <input 
                           type="text"
                           id='categoryName'
                           placeholder='Enter category Name'
                           value={data.name}
                           name='name'
                           onChange={hendleOnchange}
                           className='bg-blue-50 p-2 border border-blue-200 focus-within:border-amber-400 outline-none rounded'
                           />
                     </div>

                
                      <div className='grid gap-1'>
                          <p>Image</p>
                          <div className='flex gap-4 flex-col lg:flex-row items-center'>
                            <div className=' bg-white h-36 w-full lg:w-36 flex items-center justify-center border border-blue-200  rounded'>
                                 { data.image ? (
                                    <img 
                                     src={data.image}
                                     alt="category"
                                     className='w-full h-full object-scale-down'
                                     />
                                  ):(
                                  <p className='text-sm text-neutral-600'>No Image </p>
                                  )
                                }
                        </div>
                             <label htmlFor='uploadcategoryImage'>
                              <div  className={` px-3 py-2 rounded cursor-pointer font-medium
                                  ${!data.name ? "bg-gray-300" : " border border-amber-400 hover:bg-amber-400"} 
                                 `}  >Upload Image</div>
                             </label>
                                <input disabled={!data.name} onChange={hendleUploadCategoryImage} type="file" id='uploadcategoryImage' className=' hidden' />
                         </div>
                     </div>

                    <button 
                    className={`
                        ${data.name && data.image ?" bg-amber-400 hover:bg-amber-300" :"bg-slate-200"}
                        p-2 font-semibold rounded 
                        `}
                    >Add category </button>
                </form>
            </div>
    </section>
  )
}

export default UploadCategoryModel