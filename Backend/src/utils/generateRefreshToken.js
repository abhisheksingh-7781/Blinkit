import  jwt  from 'jsonwebtoken';
import userModel from '../models/user.model.js';


const generateRefreshToken = async(userId)=>{
    const token = jwt.sign({id : userId},
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {expiresIn : "7d"}
    )

    const updateRefreshToken = await userModel.updateOne(
        {_id : userId},
        {
            refresh_token : token
        }

    )
    return token
}



export default generateRefreshToken