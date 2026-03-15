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
exports.ResistenciaService = void 0;
const database_1 = __importDefault(require("../database"));
class ResistenciaService {
    getAllResistencia() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield database_1.default.query(`
    SELECT
        tp.nombre AS tipo_nombre,
        tp."LinkImage" AS tipo_link_image,
        tr1.nombre AS resistencia_1_nombre,
        tr1."LinkImage" AS resistencia_1_link_image,
        tr2.nombre AS resistencia_2_nombre,
        tr2."LinkImage" AS resistencia_2_link_image,
        tr3.nombre AS resistencia_3_nombre,
        tr3."LinkImage" AS resistencia_3_link_image,
        tr4.nombre AS resistencia_4_nombre,
        tr4."LinkImage" AS resistencia_4_link_image,
        tr5.nombre AS resistencia_5_nombre,
        tr5."LinkImage" AS resistencia_5_link_image,
        tr6.nombre AS resistencia_6_nombre,
        tr6."LinkImage" AS resistencia_6_link_image,
        tr7.nombre AS resistencia_7_nombre,
        tr7."LinkImage" AS resistencia_7_link_image,
        tr8.nombre AS resistencia_8_nombre,
        tr8."LinkImage" AS resistencia_8_link_image,
        tr9.nombre AS resistencia_9_nombre,
        tr9."LinkImage" AS resistencia_9_link_image,
        tr10.nombre AS resistencia_10_nombre,
        tr10."LinkImage" AS resistencia_10_link_image
    FROM
        resistencias r
    LEFT JOIN
        tipos tp ON r.tipo = tp.codigo
    LEFT JOIN
        tipos tr1 ON r.resistencia_1 = tr1.codigo
    LEFT JOIN
        tipos tr2 ON r.resistencia_2 = tr2.codigo
    LEFT JOIN
        tipos tr3 ON r.resistencia_3 = tr3.codigo
    LEFT JOIN
        tipos tr4 ON r.resistencia_4 = tr4.codigo
    LEFT JOIN
        tipos tr5 ON r.resistencia_5 = tr5.codigo
    LEFT JOIN
        tipos tr6 ON r.resistencia_6 = tr6.codigo
    LEFT JOIN
        tipos tr7 ON r.resistencia_7 = tr7.codigo
    LEFT JOIN
        tipos tr8 ON r.resistencia_8 = tr8.codigo
    LEFT JOIN
        tipos tr9 ON r.resistencia_9 = tr9.codigo
    LEFT JOIN
        tipos tr10 ON r.resistencia_10 = tr10.codigo`);
            return rows;
        });
    }
    getResByNombre(nombre) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query(`
    SELECT
        tp.nombre AS tipo_nombre,
        tp."LinkImage" AS tipo_link_image,
        tr1.nombre AS resistencia_1_nombre,
        tr1."LinkImage" AS resistencia_1_link_image,
        tr2.nombre AS resistencia_2_nombre,
        tr2."LinkImage" AS resistencia_2_link_image,
        tr3.nombre AS resistencia_3_nombre,
        tr3."LinkImage" AS resistencia_3_link_image,
        tr4.nombre AS resistencia_4_nombre,
        tr4."LinkImage" AS resistencia_4_link_image,
        tr5.nombre AS resistencia_5_nombre,
        tr5."LinkImage" AS resistencia_5_link_image,
        tr6.nombre AS resistencia_6_nombre,
        tr6."LinkImage" AS resistencia_6_link_image,
        tr7.nombre AS resistencia_7_nombre,
        tr7."LinkImage" AS resistencia_7_link_image,
        tr8.nombre AS resistencia_8_nombre,
        tr8."LinkImage" AS resistencia_8_link_image,
        tr9.nombre AS resistencia_9_nombre,
        tr9."LinkImage" AS resistencia_9_link_image,
        tr10.nombre AS resistencia_10_nombre,
        tr10."LinkImage" AS resistencia_10_link_image
    FROM
        resistencias r
    LEFT JOIN
        tipos tp ON r.tipo = tp.codigo
    LEFT JOIN
        tipos tr1 ON r.resistencia_1 = tr1.codigo
    LEFT JOIN
        tipos tr2 ON r.resistencia_2 = tr2.codigo
    LEFT JOIN
        tipos tr3 ON r.resistencia_3 = tr3.codigo
    LEFT JOIN
        tipos tr4 ON r.resistencia_4 = tr4.codigo
    LEFT JOIN
        tipos tr5 ON r.resistencia_5 = tr5.codigo
    LEFT JOIN
        tipos tr6 ON r.resistencia_6 = tr6.codigo
    LEFT JOIN
        tipos tr7 ON r.resistencia_7 = tr7.codigo
    LEFT JOIN
        tipos tr8 ON r.resistencia_8 = tr8.codigo
    LEFT JOIN
        tipos tr9 ON r.resistencia_9 = tr9.codigo
    LEFT JOIN
        tipos tr10 ON r.resistencia_10 = tr10.codigo
    WHERE
        LOWER(tp.nombre) LIKE LOWER('%' || $1 || '%');`, [nombre]);
            const rows = result.rows; // Doble casting aquí también
            return rows || [];
        });
    }
}
exports.ResistenciaService = ResistenciaService;
