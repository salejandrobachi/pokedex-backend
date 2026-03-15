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
exports.PokemonService = void 0;
const database_1 = __importDefault(require("../database"));
class PokemonService {
    getRegionName(regionCodigo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = 'SELECT nombre FROM regiones WHERE codigo = $1';
            const { rows } = yield database_1.default.query(query, [regionCodigo]);
            return ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.nombre) || null;
        });
    }
    getTypeName(tipoCodigo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = 'SELECT nombre FROM tipos WHERE codigo = $1';
            const { rows } = yield database_1.default.query(query, [tipoCodigo]);
            return ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.nombre) || null;
        });
    }
    getWeaknessName(tipoCodigo) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!tipoCodigo) {
                return null;
            }
            const query = 'SELECT nombre FROM tipos WHERE codigo = $1';
            const { rows } = yield database_1.default.query(query, [tipoCodigo]);
            return ((_a = rows[0]) === null || _a === void 0 ? void 0 : _a.nombre) || null;
        });
    }
    mapPokemonToResponse(row) {
        return __awaiter(this, void 0, void 0, function* () {
            const regionName = yield this.getRegionName(row.region);
            const tipo1Name = yield this.getTypeName(row.tipo_1);
            const tipo2Name = row.tipo_2 ? yield this.getTypeName(row.tipo_2) : null;
            return {
                numero: row.numero,
                nombre: row.nombre,
                region: regionName,
                tipo_1: tipo1Name,
                tipo_2: tipo2Name,
                debilidad_1: yield this.getWeaknessName(row.debilidad_1),
                debilidad_2: yield this.getWeaknessName(row.debilidad_2),
                debilidad_3: yield this.getWeaknessName(row.debilidad_3),
                debilidad_4: yield this.getWeaknessName(row.debilidad_4),
                debilidad_5: yield this.getWeaknessName(row.debilidad_5),
                debilidad_6: yield this.getWeaknessName(row.debilidad_6),
                debilidad_7: yield this.getWeaknessName(row.debilidad_7),
            };
        });
    }
    getAllPokemon() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT
        numero,
        nombre,
        debilidad_1,
        debilidad_2,
        debilidad_3,
        debilidad_4,
        debilidad_5,
        debilidad_6,
        debilidad_7,
        key_pokedex,
        region,
        tipo_1,
        tipo_2
      FROM pokedex p
    `;
            const { rows } = yield database_1.default.query(query);
            return Promise.all(rows.map(row => this.mapPokemonToResponse(row)));
        });
    }
    getPokemonByNumber(number) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT
        numero,
        nombre,
        debilidad_1,
        debilidad_2,
        debilidad_3,
        debilidad_4,
        debilidad_5,
        debilidad_6,
        debilidad_7,
        key_pokedex,
        region,
        tipo_1,
        tipo_2
      FROM pokedex p
      WHERE p.numero = $1
    `;
            const { rows } = yield database_1.default.query(query, [number]);
            return rows[0] ? this.mapPokemonToResponse(rows[0]) : null;
        });
    }
    getPokemonByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT
        numero,
        nombre,
        debilidad_1,
        debilidad_2,
        debilidad_3,
        debilidad_4,
        debilidad_5,
        debilidad_6,
        debilidad_7,
        key_pokedex,
        region,
        tipo_1,
        tipo_2
      FROM pokedex p
      WHERE LOWER(p.nombre) LIKE LOWER($1)
    `;
            const { rows } = yield database_1.default.query(query, [`%${name}%`]);
            return rows[0] ? this.mapPokemonToResponse(rows[0]) : null;
        });
    }
    getPokemonByRegion(regionName) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const regionQuery = 'SELECT codigo FROM regiones WHERE LOWER(nombre) = LOWER($1)';
            const { rows: regionRows } = yield database_1.default.query(regionQuery, [regionName]);
            if (!((_a = regionRows[0]) === null || _a === void 0 ? void 0 : _a.codigo)) {
                return [];
            }
            const regionCode = regionRows[0].codigo;
            const query = `
        SELECT
            p.numero,
            p.nombre,
            p.debilidad_1,
            p.debilidad_2,
            p.debilidad_3,
            p.debilidad_4,
            p.debilidad_5,
            p.debilidad_6,
            p.debilidad_7,
            p.key_pokedex,
            p.region,
            p.tipo_1,
            p.tipo_2
        FROM pokedex p
        WHERE p.region = $1
        
    `;
            const { rows } = yield database_1.default.query(query, [regionCode]);
            return Promise.all(rows.map(row => this.mapPokemonToResponse(row)));
        });
    }
    getPokemonByType(type1, type2) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(type1, type2);
            let query = `
      SELECT
        p.numero,
        p.nombre,
        p.debilidad_1,
        p.debilidad_2,
        p.debilidad_3,
        p.debilidad_4,
        p.debilidad_5,
        p.debilidad_6,
        p.debilidad_7,
        p.key_pokedex,
        p.region,
        p.tipo_1,
        p.tipo_2
      FROM pokedex p
      LEFT JOIN
        tipos t1 ON p.tipo_1 = t1.codigo
      LEFT JOIN
        tipos t2 ON p.tipo_2 = t2.codigo
      WHERE (LOWER(t1.nombre) LIKE LOWER($1)
      OR LOWER(t2.nombre) LIKE LOWER($1))
    `;
            const values = [`%${type1}%`];
            if (type2) {
                query += `
        AND (LOWER(t1.nombre) LIKE LOWER($2)
        OR LOWER(t2.nombre) LIKE LOWER($2))
      `;
                values.push(`%${type2}%`);
            }
            const { rows } = yield database_1.default.query(query, values);
            return Promise.all(rows.map(row => this.mapPokemonToResponse(row))); // Mapea todos los resultados
        });
    }
    getPokemonByWeek(week1, week2, week3, week4, week5, week6, week7) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(week1, week2, week3, week4, week5, week6, week7);
            let query = `
      SELECT
        p.numero,
        p.nombre,
        p.debilidad_1,
        p.debilidad_2,
        p.debilidad_3,
        p.debilidad_4,
        p.debilidad_5,
        p.debilidad_6,
        p.debilidad_7,
        p.key_pokedex,
        p.region,
        p.tipo_1,
        p.tipo_2
      FROM pokedex p
      LEFT JOIN
        tipos t1 ON p.debilidad_1 = t1.codigo
      LEFT JOIN
        tipos t2 ON p.debilidad_2 = t2.codigo
      LEFT JOIN
        tipos t3 ON p.debilidad_3 = t3.codigo
      LEFT JOIN
        tipos t4 ON p.debilidad_4 = t4.codigo
      LEFT JOIN
        tipos t5 ON p.debilidad_5 = t5.codigo
      LEFT JOIN
        tipos t6 ON p.debilidad_6 = t6.codigo
      LEFT JOIN
        tipos t7 ON p.debilidad_7 = t7.codigo
      WHERE (LOWER(t1.nombre) LIKE LOWER($1)
      OR LOWER(t2.nombre) LIKE LOWER($1)
      OR LOWER(t3.nombre) LIKE LOWER($1)
      OR LOWER(t4.nombre) LIKE LOWER($1)
      OR LOWER(t5.nombre) LIKE LOWER($1)
      OR LOWER(t6.nombre) LIKE LOWER($1)
      OR LOWER(t7.nombre) LIKE LOWER($1)
      )
    `;
            const values = [`%${week1}%`];
            if (week2) {
                query += `
        AND (LOWER(t1.nombre) LIKE LOWER($2)
        OR LOWER(t2.nombre) LIKE LOWER($2)
        OR LOWER(t3.nombre) LIKE LOWER($2)
        OR LOWER(t4.nombre) LIKE LOWER($2)
        OR LOWER(t5.nombre) LIKE LOWER($2)
        OR LOWER(t6.nombre) LIKE LOWER($2)
        OR LOWER(t7.nombre) LIKE LOWER($2)
        )
      `;
                values.push(`%${week2}%`);
            }
            if (week3) {
                query += `
        AND (LOWER(t1.nombre) LIKE LOWER($3)
        OR LOWER(t2.nombre) LIKE LOWER($3)
        OR LOWER(t3.nombre) LIKE LOWER($3)
        OR LOWER(t4.nombre) LIKE LOWER($3)
        OR LOWER(t5.nombre) LIKE LOWER($3)
        OR LOWER(t6.nombre) LIKE LOWER($3)
        OR LOWER(t7.nombre) LIKE LOWER($3)
        )
      `;
                values.push(`%${week3}%`);
            }
            if (week4) {
                query += `
        AND (LOWER(t1.nombre) LIKE LOWER($4)
        OR LOWER(t2.nombre) LIKE LOWER($4)
        OR LOWER(t3.nombre) LIKE LOWER($4)
        OR LOWER(t4.nombre) LIKE LOWER($4)
        OR LOWER(t5.nombre) LIKE LOWER($4)
        OR LOWER(t6.nombre) LIKE LOWER($4)
        OR LOWER(t7.nombre) LIKE LOWER($4)
        )
      `;
                values.push(`%${week4}%`);
            }
            if (week5) {
                query += `
        AND (LOWER(t1.nombre) LIKE LOWER($5)
        OR LOWER(t2.nombre) LIKE LOWER($5)
        OR LOWER(t3.nombre) LIKE LOWER($5)
        OR LOWER(t4.nombre) LIKE LOWER($5)
        OR LOWER(t5.nombre) LIKE LOWER($5)
        OR LOWER(t6.nombre) LIKE LOWER($5)
        OR LOWER(t7.nombre) LIKE LOWER($5)
        )
      `;
                values.push(`%${week5}%`);
            }
            if (week6) {
                query += `
        AND (LOWER(t1.nombre) LIKE LOWER($6)
        OR LOWER(t2.nombre) LIKE LOWER($6)
        OR LOWER(t3.nombre) LIKE LOWER($6)
        OR LOWER(t4.nombre) LIKE LOWER($6)
        OR LOWER(t5.nombre) LIKE LOWER($6)
        OR LOWER(t6.nombre) LIKE LOWER($6)
        OR LOWER(t7.nombre) LIKE LOWER($6)
        )
      `;
                values.push(`%${week6}%`);
            }
            if (week7) {
                query += `
        AND (LOWER(t1.nombre) LIKE LOWER($7)
        OR LOWER(t2.nombre) LIKE LOWER($7)
        OR LOWER(t3.nombre) LIKE LOWER($7)
        OR LOWER(t4.nombre) LIKE LOWER($7)
        OR LOWER(t5.nombre) LIKE LOWER($7)
        OR LOWER(t6.nombre) LIKE LOWER($7)
        OR LOWER(t7.nombre) LIKE LOWER($7)
        )
      `;
                values.push(`%${week7}%`);
            }
            const { rows } = yield database_1.default.query(query, values);
            return Promise.all(rows.map(row => this.mapPokemonToResponse(row))); // Mapea todos los resultados
        });
    }
    getPokemonWithNoWeek() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT
        p.numero,
        p.nombre,
        p.debilidad_1,
        p.debilidad_2,
        p.debilidad_3,
        p.debilidad_4,
        p.debilidad_5,
        p.debilidad_6,
        p.debilidad_7,
        p.key_pokedex,
        p.region,
        p.tipo_1,
        p.tipo_2
      FROM pokedex p
      WHERE p.debilidad_1 IS NULL
        AND p.debilidad_2 IS NULL
        AND p.debilidad_3 IS NULL
        AND p.debilidad_4 IS NULL
        AND p.debilidad_5 IS NULL
        AND p.debilidad_6 IS NULL
        AND p.debilidad_7 IS NULL;
    `;
            const { rows } = yield database_1.default.query(query);
            return Promise.all(rows.map(row => this.mapPokemonToResponse(row)));
        });
    }
}
exports.PokemonService = PokemonService;
