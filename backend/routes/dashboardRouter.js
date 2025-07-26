import DashboardController from "../controllers/dashboardController.js";
import express from 'express'
const router=express.Router()

router.get('/dashboard',DashboardController.dashboardCount)

export default router

