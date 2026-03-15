"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebilidadesController = void 0;
const debilidad_services_1 = require("../services/debilidad.services");
const debilidadesService = new debilidad_services_1.DebilidadesService();
class DebilidadesController {
    getAllDebilidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Debilidad = yield debilidadesService.getAllDebilidades();
                res.json(Debilidad);
            }
            catch (error) {
                console.error('Error fetching types:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getDebByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.query.name;
            if (nombre) {
                try {
                    const Debilidad = yield debilidadesService.getDebByNombre(nombre);
                    if (Debilidad && Debilidad.length > 0) {
                        res.json(Debilidad);
                    }
                    else {
                        res.status(404).json({ message: 'Type not found' });
                    }
                }
                catch (error) {
                    console.error('Error fetching type by Name:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
            else {
                res.status(400).json({ error: 'Please provide the "name" query parameter.' });
            }
        });
    }
}
exports.DebilidadesController = DebilidadesController;
