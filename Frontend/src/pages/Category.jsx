import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import Axios  from '../utils/Axios.config'

const Category = () => {
  const [openUpdateCategory,setOpenUpdateCategory]=useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const fetchCategory = async()=>{
    try {
      setLoading(true)
      const response = await Axios.get("/category/get")
      const {data : responseData } = response ;  
      
        if(responseData.success){
            setCategoryData(responseData.data)
        } 
      
    } catch (error) {
       
    }finally{
      setLoading(false)
    }
    
  }   

  useEffect(() => {    
      fetchCategory()     
  }, [])    
        
  return (
    <section>
        <div className='p-2 font-semibold bg-white shadow-md flex items-center justify-between'>
            <h2>Category</h2>
            <button onClick={()=>setOpenUpdateCategory(true)} className='text-sm border border-amber-400 hover:bg-amber-400 px-3 py-1 rounded '>Add category</button>
        </div>

           

         {
            !categoryData[0] && !loading && (
                <NoData/>
            )
         } 
           <div className='p-2  grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 lg:gap-3 '>
             {
            categoryData.map((category,index) => {
                  return (                      
                          <div key={index} className=' w-32 h-47 rounded-xl  lg:4 drop-shadow-lg ' >
                            <img 
                                src={category.image}
                                alt={category.name} 
                                className='w-full object-scale-down'
                            />
                          </div>
                       
                      )
            })
         }
           </div>

          {
            loading && (<Loading/>)
           }

           {
            openUpdateCategory &&(
              <UploadCategoryModel fetchData={fetchCategory} close={()=>setOpenUpdateCategory(false)} />
            )
           }
        
    </section>
  )
}

export default Category