"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa express aquí
const region_controller_1 = require("../controllers/region.controller");
const router = express_1.default.Router();
const regionController = new region_controller_1.RegionController();
router.get('/regions', regionController.getAllRegions);
router.get('/regions/id/:id', regionController.getRegionById);
router.get('/regions/name', regionController.getRegionByName);
exports.default = router;
