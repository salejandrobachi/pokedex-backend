"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa express aquí
const inmune_controller_1 = require("../controllers/inmune.controller");
const router = express_1.default.Router();
const inmunidadController = new inmune_controller_1.InmunidadController();
router.get('/inmunidad', inmunidadController.getAllInmunidad);
router.get('/inmunidad/nombre', inmunidadController.getInmByNombre);
exports.default = router;
