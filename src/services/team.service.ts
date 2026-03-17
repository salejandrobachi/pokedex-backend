import pool from '../database';
import { TeamSlot } from '../models/team.model';

export class TeamService {
  async getTeam(userId: string): Promise<TeamSlot[]> {
    const { rows } = await pool.query<TeamSlot>(
      `SELECT s.slot, t.pokemon_key
       FROM generate_series(1, 6) AS s(slot)
       LEFT JOIN user_team t ON t.user_id = $1 AND t.slot = s.slot
       ORDER BY s.slot`,
      [userId]
    );
    return rows;
  }

  async setTeamSlot(userId: string, pokemonKey: string, slot: number): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Remove pokemon from its current slot (if already in the team)
      await client.query(
        'DELETE FROM user_team WHERE user_id = $1 AND pokemon_key = $2',
        [userId, pokemonKey]
      );

      // Upsert into target slot (replaces whatever was there)
      await client.query(
        `INSERT INTO user_team (user_id, pokemon_key, slot) VALUES ($1, $2, $3)
         ON CONFLICT (user_id, slot) DO UPDATE SET pokemon_key = EXCLUDED.pokemon_key`,
        [userId, pokemonKey, slot]
      );

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async removeFromSlot(userId: string, slot: number): Promise<boolean> {
    const { rowCount } = await pool.query(
      'DELETE FROM user_team WHERE user_id = $1 AND slot = $2',
      [userId, slot]
    );
    return (rowCount ?? 0) > 0;
  }
}
