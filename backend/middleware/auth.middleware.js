import tokenService from "../services/token.service.js";

const auth = async (req,res,next) =>{
    try {
        const {accessToken} = req.cookies;
        if (!accessToken) {
            throw new Error()
        }
        const userData = await tokenService.verifyAccessToken(accessToken)
        if (!userData) {
            throw new Error()
        }
        req.user = userData
        next()
    } catch (error) {
        res.status(500).json({message:'Error while token validation'})
    }
}
export default auth