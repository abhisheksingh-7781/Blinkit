import Axios from './Axios.config'

const FatchUserDetails = async() =>{
    try {
        const response = await Axios.get("user/login-user-details",)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default FatchUserDetails

