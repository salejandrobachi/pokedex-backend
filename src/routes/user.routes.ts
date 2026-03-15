import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();
const userController = new UserController();

router.post('/users', userController.createUser.bind(userController));
router.get('/users/:id', userController.getUserById.bind(userController));
router.put('/users/:id', authMiddleware, userController.updateUser.bind(userController));
router.delete('/users/:id', authMiddleware, userController.deleteUser.bind(userController));

export default router;
