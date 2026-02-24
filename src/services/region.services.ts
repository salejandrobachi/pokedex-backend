import pool from '../database';
import { Regiones } from '../models/regiones.model';

export class RegionService {
  async getAllRegions(): Promise<Regiones[]> {
    const { rows } = await pool.query<Regiones>('SELECT nombre, generacion, caracteristica, "Linkimage" FROM regiones');
    return rows;
  }

  async getRegionById(id: string): Promise<Regiones | null> {
    const { rows } = await pool.query<Regiones>('SELECT nombre, generacion, caracteristica, "Linkimage" FROM regiones WHERE codigo = $1', [id]);
    return rows[0] || null;
  }

 async getRegionByName(name: string): Promise<Regiones[]> {
    const result = await pool.query(
      `SELECT nombre, generacion, caracteristica, "Linkimage" FROM regiones WHERE LOWER(nombre) = LOWER($1)`,
      [name]
    );
    const rows: Regiones[] = (result.rows as any) as Regiones[]; // Doble casting aquí también
    return rows || [];
  }

}