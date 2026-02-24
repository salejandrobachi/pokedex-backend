import express from 'express'; // Importa express aquí
import { ResistenciaController } from '../controllers/resistencia.controller';

const router = express.Router();
const resistenciaController = new ResistenciaController();

router.get('/resistencia', resistenciaController.getAllResistencia);
router.get('/resistencia/nombre', resistenciaController.getTypeByNombre);

export default router;