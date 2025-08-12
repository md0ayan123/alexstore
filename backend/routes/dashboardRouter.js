import DashboardController from "../controllers/dashboardController.js";
import express from 'express'
import { isAdmin } from "../middleware/auth.js";  
const router=express.Router()

router.get('/dashboard', isAdmin,  DashboardController.dashboardCount)

export default router

