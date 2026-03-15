"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa express aquí
const debilidad_controller_1 = require("../controllers/debilidad.controller");
const router = express_1.default.Router();
const debilidadesController = new debilidad_controller_1.DebilidadesController();
router.get('/debilidades', debilidadesController.getAllDebilidades);
router.get('/debilidades/nombre', debilidadesController.getDebByNombre);
exports.default = router;
