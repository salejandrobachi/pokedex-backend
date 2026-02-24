import express from 'express'; // Importa express aquí
import { RegionController } from '../controllers/region.controller';

const router = express.Router();
const regionController = new RegionController();

router.get('/regions', regionController.getAllRegions);
router.get('/regions/id/:id', regionController.getRegionById);
router.get('/regions/name', regionController.getRegionByName);

export default router;