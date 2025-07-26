import express from 'express'
const router=express.Router()
import OwnerController from '../controllers/ownerController.js'


router.post('/login', async (req,res)=>{
    const result=await OwnerController.admin(req.body)
    res.status(result.success ? 200 : 401).json(result);
})


export default router