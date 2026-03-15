import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = express.Router();
const adminController = new AdminController();

router.use(authMiddleware, adminMiddleware);

router.get('/admin/users', adminController.listUsers.bind(adminController));
router.put('/admin/users/:id', adminController.updateUser.bind(adminController));

export default router;
