"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa express aquí
const resistencia_controller_1 = require("../controllers/resistencia.controller");
const router = express_1.default.Router();
const resistenciaController = new resistencia_controller_1.ResistenciaController();
router.get('/resistencia', resistenciaController.getAllResistencia);
router.get('/resistencia/nombre', resistenciaController.getTypeByNombre);
exports.default = router;
