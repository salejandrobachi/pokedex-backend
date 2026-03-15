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
exports.ResistenciaController = void 0;
const resistencia_services_1 = require("../services/resistencia.services");
const resistenciaService = new resistencia_services_1.ResistenciaService();
class ResistenciaController {
    getAllResistencia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Resistencia = yield resistenciaService.getAllResistencia();
                res.json(Resistencia);
            }
            catch (error) {
                console.error('Error fetching types:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    // async getTypeByNombre(req: Request, res: Response): Promise<void> {
    //   const nombre = req.query.nombre; // El ID del tipo será un UUID (string)
    //   try {
    //     const Resistencia = await resistenciaService.getResByNombre(nombre);
    //     if (Resistencia) {
    //       res.json(Resistencia);
    //     } else {
    //       res.status(404).json({ message: 'Resistencia not found' });
    //     }
    //   } catch (error) {
    //     console.error('Error fetching type by Nombre:', error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   } 
    //}
    getTypeByNombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.query.name;
            if (nombre) {
                try {
                    const resistencia = yield resistenciaService.getResByNombre(nombre);
                    if (resistencia && resistencia.length > 0) {
                        res.json(resistencia);
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
exports.ResistenciaController = ResistenciaController;
