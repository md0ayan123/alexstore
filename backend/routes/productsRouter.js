import express from 'express'
const router=express.Router()
import  { isAdmin } from '../middleware/auth.js'
import ProductController from '../controllers/productControllers.js'


router.post('/create', isAdmin,ProductController.create)
router.get('/listed', ProductController.getproducts)
router.put("/:id",isAdmin,ProductController.update)
router.delete("/:id",isAdmin, ProductController.delete)

export default router