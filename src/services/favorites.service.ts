import pool from '../database';

export class FavoritesService {
  async getFavorites(userId: string): Promise<string[]> {
    const { rows } = await pool.query<{ pokemon_key: string }>(
      'SELECT pokemon_key FROM user_favorites WHERE user_id = $1 ORDER BY created_at ASC',
      [userId]
    );
    return rows.map(r => r.pokemon_key);
  }

  async addFavorite(userId: string, pokemonKey: string): Promise<void> {
    await pool.query(
      'INSERT INTO user_favorites (user_id, pokemon_key) VALUES ($1, $2)',
      [userId, pokemonKey]
    );
  }

  async removeFavorite(userId: string, pokemonKey: string): Promise<boolean> {
    const { rowCount } = await pool.query(
      'DELETE FROM user_favorites WHERE user_id = $1 AND pokemon_key = $2',
      [userId, pokemonKey]
    );
    return (rowCount ?? 0) > 0;
  }
}
