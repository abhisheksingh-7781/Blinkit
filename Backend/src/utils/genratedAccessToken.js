import jwt from 'jsonwebtoken'


const generateAccessToken= async(userId) => {
    const token = jwt.sign({id : userId},
        process.env.JWT_ACCESS_TOKEN_SECRET,
        {expiresIn : "10h"}
    )
    return token
}

export default generateAccessToken;
