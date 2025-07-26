import express from 'express'
const router=express.Router()
import ProductController from '../controllers/productControllers.js'


router.post('/create',ProductController.create)
router.get('/listed',ProductController.getproducts)
router.put("/:id",ProductController.update)
router.delete("/:id", ProductController.delete)

export default router