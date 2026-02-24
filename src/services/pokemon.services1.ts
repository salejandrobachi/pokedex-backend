import pool from '../database';
import { Pokemon } from '../models/pokemon.model';
import { Regiones } from '../models/regiones.model';
import { Tipos } from '../models/tipos.model';

interface PokemonQueryResult {
  numero: string;
  nombre: string;
  debilidad_1: string | null;
  debilidad_2: string | null;
  debilidad_3: string | null;
  debilidad_4: string | null;
  debilidad_5: string | null;
  debilidad_6: string | null;
  debilidad_7: string | null;
  key_pokedex: string;
  region: string; // Solo el código de la región
  tipo_1: string; // Solo el código del tipo 1
  tipo_2: string | null; // Solo el código del tipo 2
}

interface PokemonResponse {
  numero: string;
  nombre: string;
  region: string | null;
  tipo_1: string | null;
  tipo_2: string | null;
  debilidad_1: string | null;
  debilidad_2: string | null;
  debilidad_3: string | null;
  debilidad_4: string | null;
  debilidad_5: string | null;
  debilidad_6: string | null;
  debilidad_7: string | null;
}

export class PokemonService {
  private async getRegionName(regionCodigo: string): Promise<string | null> {
    const query = 'SELECT nombre FROM regiones WHERE codigo = $1';
    const { rows } = await pool.query<{ nombre: string }>(query, [regionCodigo]);
    return rows[0]?.nombre || null;
  }

  private async getTypeName(tipoCodigo: string): Promise<string | null> {
    const query = 'SELECT nombre FROM tipos WHERE codigo = $1';
    const { rows } = await pool.query<{ nombre: string }>(query, [tipoCodigo]);
    return rows[0]?.nombre || null;
  }

  private async getWeaknessName(tipoCodigo: string | null): Promise<string | null> {
    if (!tipoCodigo) {
      return null;
    }
    const query = 'SELECT nombre FROM tipos WHERE codigo = $1';
    const { rows } = await pool.query<{ nombre: string }>(query, [tipoCodigo]);
    return rows[0]?.nombre || null;
  }

  private async mapPokemonToResponse(row: PokemonQueryResult): Promise<Omit<PokemonResponse, 'weaknesses'>> {
    const regionName = await this.getRegionName(row.region);
    const tipo1Name = await this.getTypeName(row.tipo_1);
    const tipo2Name = row.tipo_2 ? await this.getTypeName(row.tipo_2) : null;

    return {
      numero: row.numero,
      nombre: row.nombre,
      region: regionName,
      tipo_1: tipo1Name,
      tipo_2: tipo2Name,
      debilidad_1: await this.getWeaknessName(row.debilidad_1),
      debilidad_2: await this.getWeaknessName(row.debilidad_2),
      debilidad_3: await this.getWeaknessName(row.debilidad_3),
      debilidad_4: await this.getWeaknessName(row.debilidad_4),
      debilidad_5: await this.getWeaknessName(row.debilidad_5),
      debilidad_6: await this.getWeaknessName(row.debilidad_6),
      debilidad_7: await this.getWeaknessName(row.debilidad_7),
    };
  }

  async getAllPokemon(): Promise<Omit<PokemonResponse, 'weaknesses'>[]> {
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
    const { rows } = await pool.query<PokemonQueryResult>(query);
    return Promise.all(rows.map(row => this.mapPokemonToResponse(row)));
  }

  async getPokemonByNumber(number: string): Promise<Omit<PokemonResponse, 'weaknesses'> | null> {
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
    const { rows } = await pool.query<PokemonQueryResult>(query, [number]);
    return rows[0] ? this.mapPokemonToResponse(rows[0]) : null;
  }

  async getPokemonByName(name: string): Promise<Omit<PokemonResponse, 'weaknesses'> | null> {
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
    const { rows } = await pool.query<PokemonQueryResult>(query, [`%${name}%`]);
    return rows[0] ? this.mapPokemonToResponse(rows[0]) : null;
  }

  async getPokemonByRegion(regionName: string): Promise<Omit<PokemonResponse, 'weaknesses'>[]> {
    const regionQuery = 'SELECT codigo FROM regiones WHERE LOWER(nombre) = LOWER($1)';
    const { rows: regionRows } = await pool.query<{ codigo: string }>(regionQuery, [regionName]);

    if (!regionRows[0]?.codigo) {
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
    const { rows } = await pool.query<PokemonQueryResult>(query, [regionCode]);
    return Promise.all(rows.map(row => this.mapPokemonToResponse(row)));
  }

  async getPokemonByType(type1: string, type2?: string): Promise<Omit<PokemonResponse, 'weaknesses'>[]> { // Cambia el tipo de retorno a un array
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
    const values: string[] = [`%${type1}%`];
  
    if (type2) {
      query += `
        AND (LOWER(t1.nombre) LIKE LOWER($2)
        OR LOWER(t2.nombre) LIKE LOWER($2))
      `;
      values.push(`%${type2}%`);
    }
  
    const { rows } = await pool.query<PokemonQueryResult>(query, values);
    return Promise.all(rows.map(row => this.mapPokemonToResponse(row))); // Mapea todos los resultados
   }

   async getPokemonByWeek(week1?: string,
    week2?: string,
    week3?: string,
    week4?: string,
    week5?: string,
    week6?: string,
    week7?: string,
   ): Promise<Omit<PokemonResponse, 'weaknesses'>[]> { // Cambia el tipo de retorno a un array
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
    const values: string[] = [`%${week1}%`];
  
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
  
    const { rows } = await pool.query<PokemonQueryResult>(query, values);
    return Promise.all(rows.map(row => this.mapPokemonToResponse(row))); // Mapea todos los resultados
   }

   async getPokemonWithNoWeek(): Promise<Omit<PokemonResponse, 'weaknesses'>[]> {
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
    const { rows } = await pool.query<PokemonQueryResult>(query);
    return Promise.all(rows.map(row => this.mapPokemonToResponse(row)));
  }
}