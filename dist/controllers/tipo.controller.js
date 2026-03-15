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
exports.TypeController = void 0;
const tipo_services_1 = require("../services/tipo.services");
const typeService = new tipo_services_1.TypeService();
class TypeController {
    getAllTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const types = yield typeService.getAllTypes();
                res.json(types);
            }
            catch (error) {
                console.error('Error fetching types:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getTypeByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.query.name;
            if (name) {
                try {
                    const type = yield typeService.getTypeByName(name);
                    if (type && type.length > 0) {
                        res.json(type);
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
exports.TypeController = TypeController;
