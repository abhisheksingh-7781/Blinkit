import jwt from "jsonwebtoken"
const auth = (request,response,next)=>{
    try {
        const  accessToken  = request.cookies.accessToken || request?.headers?.authorization?.split("")[1]
        if(!accessToken){
            return response.status(401).json({
                message : "Unauthorized , Access token is missing",
                error : true,
                success : false,
            })
        }

        const decoded =jwt.verify(accessToken,process.env.JWT_ACCESS_TOKEN_SECRET)
        if(!decoded){
            return response.status(400).json({
                message : "unauthorized access",
                error : true,
                success : false
            });
        }
        request.userId = decoded.id
       next()
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }

}

export default auth