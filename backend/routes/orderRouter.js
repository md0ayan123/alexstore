import express from 'express'
const router =express.Router()
import OrderController from '../controllers/orderController.js'

router.get('/listed',OrderController.listed)
router.get('/:id',OrderController.singleOrder)
router.put('/:id',OrderController.update)
router.delete('/:id',OrderController.delete)


export default router 