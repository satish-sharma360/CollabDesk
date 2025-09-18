import express from "express";
import authController from "../controllers/auth.controller.js";
import activateController from "../controllers/activate.controller.js";
import auth from "../middleware/auth.middleware.js";
import roomsControllers from "../controllers/rooms.controllers.js";


const router = express.Router()

router.post('/api/send-otp',authController.sendOtp)
router.post('/api/verify-otp',authController.verifyOtp)
router.post('/api/activate',auth,activateController.activate)
router.get('/api/refresh',authController.refresh)
router.post('/api/logout',auth,authController.logout)
router.post('/api/rooms',auth,roomsControllers.create)
router.get('/api/rooms',auth,roomsControllers.index)

export default router