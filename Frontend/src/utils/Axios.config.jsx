import axios from "axios"

 const instance = axios.create({
     baseURL: "http://localhost:3000/api",
     withCredentials: true,
    //  timeout: 10000,
 })

 // sending access Token in the header 
  axios.interceptors.request.use(async(config)=>{
    const accessToken = localStorage.getItem("accesstoken")
    
    if(accessToken){
       config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config
  },
  (error)=>{
    return Promise.reject(error)
  }
)

// extend the life span of access token with 
// the help refresh

axios.interceptors.request.use((response) => {
  return response;
},
  async(error)=>{
     let originRequest = error.config

     if(error.response.status === 401 && !originRequest.retry){
       originRequest.retry = true
       const refreshToken = localStorage.getItem("refreshToken")

       if(refreshToken){
          const newAccessToken = await refreshAccessToken(refreshToken)

          if(newAccessToken){
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`
            return axios(originRequest)
          }
       }
     }
     return Promise.reject(error)
  } 
);

const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios.post({...'user/refresh-token',
          headers: {
                 Authorization: `Bearer ${refreshToken}`
          }
        })

        const accessToken = response.data.data.accessToken  
        localStorage.setItem('accesstoken',accessToken)
        return accessToken
        // console.log("response",response)
    } catch (error) {
       console.log("error",error)
    }
}


export default instance; 

