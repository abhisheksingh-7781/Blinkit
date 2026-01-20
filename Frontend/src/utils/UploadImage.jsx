import Axios from '../utils/Axios.config'

const uploadImage = async(image)=>{

   try { 
    const formData = new FormData();
    formData.append("image",image)
      const response = await Axios.post("/file/upload", 
      formData  
    )
      return response

      
   } catch (error) {
     return error
   }
}

export default uploadImage;

