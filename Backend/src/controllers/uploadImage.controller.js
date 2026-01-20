import uploadImageCloudinary from "../utils/uploadImageClodinary.js";


const uploadImageCatagory = async(request,response)=>{

    try {
        const file = request.file;
        const uploadImage= await uploadImageCloudinary(file)
        return response.json({
            message:"Upload done",
            data:uploadImage,
            success:true,
            error: false
        })

    } catch (error) {
        response.status(500).json({    
            message : error.message || error ,   
            success : false,  
            error:true   
        })  
    }   
}    

export default uploadImageCatagory;

