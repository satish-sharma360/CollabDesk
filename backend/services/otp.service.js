import crypto from 'crypto'
import twilio from 'twilio';
import hashService from './hash.service.js';

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;

const client = twilio(smsSid, smsAuthToken, {
    lazyLoading: true
})

class Otpservice {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
    }

    async sendBysms(phone, otp) {
        return await client.messages.create({
            to: phone,
            from: process.env.SMS_FROM_NUMBER,
            body: `Your CollabDesk OTP is ${otp}`
        });
    }
    verifyOtp(hashedOtp, data) {
        let computedhash = hashService.hashOtp(data);
        return computedhash === hashedOtp;
    }
}

export default new Otpservice()