import pool from "../database";
import { Inmunidad } from "../models/inmunidades.model";

export class InmunidadService {
  async getAllInmunidad(): Promise<Inmunidad[]> {
    const { rows } = await pool.query<Inmunidad>(`
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
  }

  async getInmByNombre(nombre: string): Promise<Inmunidad[]> {
    const result = await pool.query(
      `
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
    LOWER(tp.nombre) LIKE LOWER('%' || $1 || '%');`,
      [nombre]
    );
    const rows: Inmunidad[] = result.rows as any as Inmunidad[];
    return rows || [];
  }
}
