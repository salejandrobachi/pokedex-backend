"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tipo_controller_1 = require("../controllers/tipo.controller");
const router = express_1.default.Router();
const typeController = new tipo_controller_1.TypeController();
router.get('/tipos', typeController.getAllTypes);
router.get('/tipos/nombre', typeController.getTypeByName);
exports.default = router;
