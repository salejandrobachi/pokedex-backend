import pool from "../database";
import { Debilidades } from "../models/debilidades.model";

export class DebilidadesService {
  async getAllDebilidades(): Promise<Debilidades[]> {
    const { rows } = await pool.query<Debilidades>(`
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
  }

  async getDebByNombre(nombre: string): Promise<Debilidades[]> {
    const result = await pool.query(
      `
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
        LOWER(tp.nombre) LIKE LOWER('%' || $1 || '%');`,
      [nombre]
    );
    const rows: Debilidades[] = result.rows as any as Debilidades[];
    return rows || [];
  }
}
