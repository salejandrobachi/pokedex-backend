import { Request, Response } from 'express';
import { PokemonService } from '../services/pokemon.services1';

const pokemonService = new PokemonService();

export class PokemonController {
  async getAllPokemon(req: Request, res: Response): Promise<void> {
    try {
      const pokemon = await pokemonService.getAllPokemon();
      res.json(pokemon);
    } catch (error) {
      console.error('Error fetching all pokemon:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPokemonByNumber(req: Request, res: Response): Promise<void> {
    const number = req.params.number; // El número de Pokedex será un string
    try {
      const pokemon = await pokemonService.getPokemonByNumber(number);
      if (pokemon) {
        res.json(pokemon);
      } else {
        res.status(404).json({ message: 'Pokemon not found' });
      }
    } catch (error) {
      console.error('Error fetching pokemon by number:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPokemonByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    try {
      const pokemon = await pokemonService.getPokemonByName(name);
      if (pokemon) {
        res.json(pokemon);
      } else {
        res.status(404).json({ message: 'Pokemon not found' });
      }
    } catch (error) {
      console.error('Error fetching pokemon by name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPokemonByRegion(req: Request, res: Response): Promise<void> {
    const region = req.params.region;
    try {
      const pokemon = await pokemonService.getPokemonByRegion(region);
      if (pokemon) {
        res.json(pokemon);
      } else {
        res.status(404).json({ message: 'Pokemon not found' });
      }
    } catch (error) {
      console.error('Error fetching pokemon by name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getPokemonByType(req: Request, res: Response): Promise<void> {
    const { type1, type2 } = req.query;

    try {
      let pokemon;
      if (type1) {
        pokemon = await pokemonService.getPokemonByType(
          type1 as string,
          type2 as string | undefined
        );
        if (pokemon && pokemon.length > 0) {
          res.json(pokemon);
        } else {
          res.status(404).json({ message: 'Pokemon not found' });
        }
      } else {
        res.status(400).json({ message: 'Please provide at least one type to search.' });
      }
    } catch (error) {
      console.error('Error fetching pokemon by type:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


    async getPokemonByWeek(req: Request, res: Response): Promise<void> {
      const { week1, week2, week3, week4, week5, week6, week7, noWeek } = req.query;
  
      try {
        let pokemon;
  
        if (noWeek === 'true') {
          pokemon = await pokemonService.getPokemonWithNoWeek();
        } else if (week1) {
          pokemon = await pokemonService.getPokemonByWeek(
            week1 as string,
            week2 as string | undefined,
            week3 as string | undefined,
            week4 as string | undefined,
            week5 as string | undefined,
            week6 as string | undefined,
            week7 as string | undefined
          );
        } else {
          res.status(400).json({ message: 'Please provide at least one week to search or the "noWeakness" parameter.' });
        }
  
        if (pokemon && pokemon.length > 0) {
          res.json(pokemon);
        } else {
          res.status(404).json({ message: 'Pokemon not found' });
        }
      } catch (error) {
        console.error('Error fetching pokemon by week:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  }
}