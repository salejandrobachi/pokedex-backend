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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InmunidadService = void 0;
const database_1 = __importDefault(require("../database"));
class InmunidadService {
    getAllInmunidad() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield database_1.default.query(`
    SELECT
    tp.nombre AS tipo_nombre,
    tp."LinkImage" AS Tipo_Link_Image,
    t1.nombre AS Inmune_1_nombre,
    t1."LinkImage" AS Inmune_1_Link_Image,
    t2.nombre AS Inmune_2_nombre,
    t2."LinkImage" AS Inmune_2_Link_Image
FROM
    inmunidades i
LEFT JOIN
    tipos tp ON i.tipo = tp.codigo
LEFT JOIN
    tipos t1 ON i.inmune_1 = t1.codigo
LEFT JOIN
    tipos t2 ON i.inmune_2 = t2.codigo;`);
            return rows;
        });
    }
    getInmByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`
   SELECT
    tp.nombre AS tipo_nombre,
    tp."LinkImage" AS Tipo_Link_Image,
    t1.nombre AS Inmune_1_nombre,
    t1."LinkImage" AS Inmune_1_Link_Image,
    t2.nombre AS Inmune_2_nombre,
    t2."LinkImage" AS Inmune_2_Link_Image
FROM
    inmunidades i
LEFT JOIN
    tipos tp ON i.tipo = tp.codigo
LEFT JOIN
    tipos t1 ON i.inmune_1 = t1.codigo
LEFT JOIN
    tipos t2 ON i.inmune_2 = t2.codigo
WHERE
    LOWER(tp.nombre) LIKE LOWER('%' || $1 || '%');`, [nombre]);
            const rows = result.rows;
            return rows || [];
        });
    }
}
exports.InmunidadService = InmunidadService;
