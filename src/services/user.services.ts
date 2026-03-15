import pool from '../database';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.model';

export class UserService {
  async createUser(username: string, email: string, password: string, role: string = 'user'): Promise<Omit<User, 'password_hash'>> {
    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, created_at, role
    `;
    const { rows } = await pool.query<Omit<User, 'password_hash'>>(query, [username, email, password_hash, role]);
    return rows[0];
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query<User>(query, [email]);
    return rows[0] || null;
  }

  async getUserById(id: string): Promise<Omit<User, 'password_hash'> | null> {
    const query = 'SELECT id, username, email, created_at, role FROM users WHERE id = $1';
    const { rows } = await pool.query<Omit<User, 'password_hash'>>(query, [id]);
    return rows[0] || null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await pool.query<User>(query, [username]);
    return rows[0] || null;
  }

  async updateUsername(id: string, username: string): Promise<Omit<User, 'password_hash'> | null> {
    const query = `
      UPDATE users SET username = $1
      WHERE id = $2
      RETURNING id, username, email, created_at, role
    `;
    const { rows } = await pool.query<Omit<User, 'password_hash'>>(query, [username, id]);
    return rows[0] || null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    return (rowCount ?? 0) > 0;
  }

  async getAllUsers(): Promise<Omit<User, 'password_hash'>[]> {
    const query = 'SELECT id, username, email, created_at, role FROM users ORDER BY created_at DESC';
    const { rows } = await pool.query<Omit<User, 'password_hash'>>(query);
    return rows;
  }

  async adminUpdateUser(
    id: string,
    fields: { username?: string; email?: string; role?: string }
  ): Promise<Omit<User, 'password_hash'> | null> {
    const setClauses: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (fields.username !== undefined) { setClauses.push(`username = $${idx++}`); values.push(fields.username); }
    if (fields.email !== undefined)    { setClauses.push(`email = $${idx++}`);    values.push(fields.email); }
    if (fields.role !== undefined)     { setClauses.push(`role = $${idx++}`);     values.push(fields.role); }

    if (setClauses.length === 0) return null;

    values.push(id);
    const query = `
      UPDATE users SET ${setClauses.join(', ')}
      WHERE id = $${idx}
      RETURNING id, username, email, created_at, role
    `;
    const { rows } = await pool.query<Omit<User, 'password_hash'>>(query, values);
    return rows[0] || null;
  }
}
