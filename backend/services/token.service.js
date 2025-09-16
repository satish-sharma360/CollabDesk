import jwt from 'jsonwebtoken'
import refreshModel from '../models/refresh.model.js'
class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET,{
            expiresIn:'1h'
        })

        const refreshToken = jwt.sign(payload , process.env.JWT_REFRESH_SECRET,{
            expiresIn:'1y'
        })

        return {accessToken , refreshToken}
    }

    async storeRefreshToken(token ,userId) {
        try {
            await refreshModel.create({
                token,
                userId
            })
        } catch (error) {
         console.log(error.message)   
        }
    }

    async verifyAccessToken(token){
        return jwt.verify(token , process.env.JWT_ACCESS_SECRET)
    }
}
export default new TokenService()