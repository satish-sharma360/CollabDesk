import express from "express";
import authController from "../controllers/auth.controller.js";
import activateController from "../controllers/activate.controller.js";
import auth from "../middleware/auth.middleware.js";


const router = express.Router()

router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp',authController.verifyOtp)
router.post('/api/activate',auth,activateController.activate)

export default router