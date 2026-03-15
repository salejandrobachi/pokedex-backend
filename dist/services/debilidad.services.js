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
exports.DebilidadesService = void 0;
const database_1 = __importDefault(require("../database"));
class DebilidadesService {
    getAllDebilidades() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield database_1.default.query(`
    SELECT
        tp.nombre AS tipo_nombre,
        tp."LinkImage" AS tipo_Link_Image,
        t1.nombre AS debilidad_1_nombre,
        t1."LinkImage" AS debilidad_1_Link_Image,
        t2.nombre AS debilidad_2_nombre,
        t2."LinkImage" AS debilidad_2_Link_Image,
        t3.nombre AS debilidad_3_nombre,
        t3."LinkImage" AS debilidad_3_Link_Image,
        t4.nombre AS debilidad_4_nombre,
        t4."LinkImage" AS debilidad_4_Link_Image,
        t5.nombre AS debilidad_5_nombre,
        t5."LinkImage" AS debilidad_5_Link_Image
    FROM
        debilidades d
    LEFT JOIN
        tipos tp ON d.tipo = tp.codigo
    LEFT JOIN
        tipos t1 ON d.debilidad_1 = t1.codigo
    LEFT JOIN
        tipos t2 ON d.debilidad_2 = t2.codigo
    LEFT JOIN
        tipos t3 ON d.debilidad_3 = t3.codigo
    LEFT JOIN
        tipos t4 ON d.debilidad_4 = t4.codigo
    LEFT JOIN
        tipos t5 ON d.debilidad_5 = t5.codigo;`);
            return rows;
        });
    }
    getDebByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`
    SELECT
        tp.nombre AS tipo_nombre,
        tp."LinkImage" AS tipo_Link_Image,
        t1.nombre AS debilidad_1_nombre,
        t1."LinkImage" AS debilidad_1_Link_Image,
        t2.nombre AS debilidad_2_nombre,
        t2."LinkImage" AS debilidad_2_Link_Image,
        t3.nombre AS debilidad_3_nombre,
        t3."LinkImage" AS debilidad_3_Link_Image,
        t4.nombre AS debilidad_4_nombre,
        t4."LinkImage" AS debilidad_4_Link_Image,
        t5.nombre AS debilidad_5_nombre,
        t5."LinkImage" AS debilidad_5_Link_Image
    FROM
        debilidades d
    LEFT JOIN
        tipos tp ON d.tipo = tp.codigo
    LEFT JOIN
        tipos t1 ON d.debilidad_1 = t1.codigo
    LEFT JOIN
        tipos t2 ON d.debilidad_2 = t2.codigo
    LEFT JOIN
        tipos t3 ON d.debilidad_3 = t3.codigo
    LEFT JOIN
        tipos t4 ON d.debilidad_4 = t4.codigo
    LEFT JOIN
        tipos t5 ON d.debilidad_5 = t5.codigo
    WHERE
        LOWER(tp.nombre) LIKE LOWER('%' || $1 || '%');`, [nombre]);
            const rows = result.rows;
            return rows || [];
        });
    }
}
exports.DebilidadesService = DebilidadesService;
