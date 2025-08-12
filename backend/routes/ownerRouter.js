import express from 'express'
const router=express.Router()
import OwnerController from '../controllers/ownerController.js'


router.post('/login',OwnerController.admin)


export default router