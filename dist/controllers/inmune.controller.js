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
exports.InmunidadController = void 0;
const inmune_services_1 = require("../services/inmune.services");
const inmunidadService = new inmune_services_1.InmunidadService();
class InmunidadController {
    getAllInmunidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Inmunidad = yield inmunidadService.getAllInmunidad();
                res.json(Inmunidad);
            }
            catch (error) {
                console.error('Error fetching types:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getInmByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.query.name;
            if (nombre) {
                try {
                    const Inmunidad = yield inmunidadService.getInmByNombre(nombre);
                    if (Inmunidad && Inmunidad.length > 0) {
                        res.json(Inmunidad);
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
exports.InmunidadController = InmunidadController;
