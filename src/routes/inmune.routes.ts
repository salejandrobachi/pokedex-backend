import express from 'express'; // Importa express aquí
import { InmunidadController } from '../controllers/inmune.controller';

const router = express.Router();
const inmunidadController = new InmunidadController();

router.get('/inmunidad', inmunidadController.getAllInmunidad);
router.get('/inmunidad/nombre', inmunidadController.getInmByNombre);

export default router;