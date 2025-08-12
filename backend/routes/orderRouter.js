import express from 'express'
const router =express.Router()
import  { isAdmin } from "../middleware/auth.js";  
import OrderController from '../controllers/orderController.js'

router.get('/listed', isAdmin, OrderController.listed)
router.get('/:id', isAdmin,OrderController.singleOrder)
router.put('/:id', isAdmin,OrderController.update)
router.delete('/:id', isAdmin,OrderController.delete)


export default router 