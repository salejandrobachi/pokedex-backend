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
exports.RegionController = void 0;
const region_services_1 = require("../services/region.services");
const regionService = new region_services_1.RegionService();
class RegionController {
    getAllRegions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regions = yield regionService.getAllRegions();
                res.json(regions);
            }
            catch (error) {
                console.error('Error fetching regions:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getRegionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id; // El ID de la región será un UUID (string)
            try {
                const region = yield regionService.getRegionById(id);
                if (region) {
                    res.json(region);
                }
                else {
                    res.status(404).json({ message: 'Region not found' });
                }
            }
            catch (error) {
                console.error('Error fetching region by ID:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getRegionByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.query.name;
            if (name) {
                try {
                    const region = yield regionService.getRegionByName(name);
                    if (region && region.length > 0) {
                        res.json(region);
                    }
                    else {
                        res.status(404).json({ message: 'region not found' });
                    }
                }
                catch (error) {
                    console.error('Error fetching region by Name:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
            else {
                res.status(400).json({ error: 'Please provide the "name" query parameter.' });
            }
        });
    }
}
exports.RegionController = RegionController;
