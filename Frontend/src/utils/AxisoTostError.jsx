import toast from 'react-hot-toast'

const AxiosToastError = (error)=>{
    toast.error(
        // error?.response?.data?.message
         error?.response?.data?.message ||
    error?.message ||
    "Something went wrong"
    )
}

export default AxiosToastError
