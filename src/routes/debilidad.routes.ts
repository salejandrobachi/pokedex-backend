import express from 'express'; // Importa express aquí
import { DebilidadesController } from '../controllers/debilidad.controller';

const router = express.Router();
const debilidadesController = new DebilidadesController();

router.get('/debilidades', debilidadesController.getAllDebilidades);
router.get('/debilidades/nombre', debilidadesController.getDebByNombre);

export default router;