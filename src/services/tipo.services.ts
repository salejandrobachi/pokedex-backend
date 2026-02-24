import pool from '../database';
import { Tipos } from '../models/tipos.model';

export class TypeService {
  async getAllTypes(): Promise<Tipos[]> {
    const result = await pool.query('SELECT codigo, nombre, "LinkImage" FROM tipos');
    const rows: Tipos[] = (result.rows as any) as Tipos[]; // Doble casting para "resetear" la inferencia
    return rows;
  }

  async getTypeByName(name: string): Promise<Tipos[]> {
    const result = await pool.query(
      `SELECT codigo, nombre, "LinkImage" FROM tipos WHERE LOWER(nombre) LIKE LOWER('%' || $1 || '%')`,
      [name]
    );
    const rows: Tipos[] = (result.rows as any) as Tipos[]; // Doble casting aquí también
    return rows || [];
  }
  
}