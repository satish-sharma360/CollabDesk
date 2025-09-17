import hashService from "../services/hash.service.js"
import otpService from "../services/otp.service.js"
import tokenService from "../services/token.service.js"
import userService from "../services/user.service.js"
import useDto from "../Dtos/user.dto.js"
import auth from "../middleware/auth.middleware.js"

class AuthController {
    // Send OTP to user
    async sendOtp(req, res) {
        const { phone } = req.body;
        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone Number required!" });
        }

        // Generate OTP
        const otp = await otpService.generateOtp();
        const expires = Date.now() + 1000 * 60 * 5; // 5 minutes
        const otpStr = String(otp);
        const data = `${phone}.${otpStr}.${expires}`;
        const hashOtp = hashService.hashOtp(data);


        try {
            // await otpService.sendBysms(phone, otp);
            return res.json({
                hash: `${hashOtp}.${expires}`,
                phone,
                otp
            });
        } catch (error) {
            console.error("[sendOtp] Error sending SMS:", error);
            return res.status(500).json({ message: 'Error While sending Sms' });
        }
    }

    // Verify OTP
    async verifyOtp(req, res) {
        let { otp, hash, phone } = req.body;
        if (!otp || !hash || !phone) {
            return res.status(400).json({ success: false, message: "All Fields are Required!" });
        }

        // Split hash and expiry
        const lastDot = hash.lastIndexOf('.');
        if (lastDot === -1) {
            return res.status(400).json({ success: false, message: "Invalid hash format" });
        }
        const hashedOtp = hash.substring(0, lastDot);
        const expires = hash.substring(lastDot + 1);

        if (Date.now() > +expires) {
            return res.status(400).json({ success: false, message: "OTP Expired" });
        }

        const otpStr = String(otp);
        const data = `${phone}.${otpStr}.${expires}`;

        const isValid = otpService.verifyOtp(hashedOtp, data);
        if (!isValid) {
            return res.status(400).json({ success: false, message: "Invalid OTP" });
        }

        // Find or create user
        let user;
        try {
            user = await userService.findUser({ phone });
            if (!user) {
                user = await userService.createUser({ phone });
            }
        } catch (error) {
            console.error("[verifyOtp] Error creating/finding user:", error);
            return res.status(500).json({ message: 'Error While creating User' });
        }

        // Generate tokens
        const { accessToken, refreshToken } = tokenService.generateTokens({
            _id: user._id,
            activated: false
        });

        await tokenService.storeRefreshToken(refreshToken, user._id)

        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: false
        });


        const userDto = new useDto(user)
        res.json({ user: userDto, auth: true });
    }

    async refresh(req, res) {
        // get refresh token from cookie (should be req.cookies)
        const { refreshToken: refreshTokenFromCookie } = req.cookies;
        if (!refreshTokenFromCookie) {
            return res.status(401).json({ success: false, message: 'No refresh token provided' });
        }
        // check if token is valid
        let userdata;
        try {
            userdata = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        // check if token is in DB 
        try {
            const token = await tokenService.findRefreshToken(userdata._id, refreshTokenFromCookie);
            if (!token) {
                return res.status(401).json({ success: false, message: 'Token not in DB' });
            }
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Internal error' });
        }
        // find user (await!)
        const user = await userService.findUser({ _id: userdata._id });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not present in DB' });
        }
        // generate new token 
        const { accessToken, refreshToken } = tokenService.generateTokens({ _id: userdata._id });
        // update refresh Token
        try {
            await tokenService.updateRefreshToken(userdata._id, refreshToken);
        } catch (error) {
            return res.status(401).json({ success: false, message: 'Error while updating Token' });
        }

        // put in cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: true
        });

        res.cookie('accessToken', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30,
            httpOnly: false
        });

        // send response
        const userDto = new useDto(user);
        res.json({ user: userDto, auth: true });
    }

    async logout(req, res) {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            res.clearCookie('refreshToken');
            res.clearCookie('accessToken');
            return res.json({ user: null, auth: false });
        }
        await tokenService.removeToken(refreshToken);
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        return res.json({ user: null, auth: false });
    }
}

export default new AuthController();