import express from 'express';
import { TypeController } from '../controllers/tipo.controller';

const router = express.Router();
const typeController = new TypeController();

router.get('/tipos', typeController.getAllTypes);
router.get('/tipos/nombre', typeController.getTypeByName);

export default router;