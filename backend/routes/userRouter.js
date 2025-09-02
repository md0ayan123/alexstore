import express from 'express'
const router = express.Router();
import UserController from'../controllers/userController.js'

// REGISTER
router.post('/register',UserController.register);

// SIGNUP
router.post('/signin',UserController.signin);
// listed user
router.get('/listed', UserController.listed)

router.get('/:id', UserController.single)

export default router;
