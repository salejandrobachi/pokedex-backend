import express from 'express'; // Importa express aquí
import { PokemonController } from '../controllers/pokemon.controller';

const router = express.Router();
const pokemonController = new PokemonController();

router.get('/pokemon', pokemonController.getAllPokemon);
router.get('/pokemon/number/:number', pokemonController.getPokemonByNumber);
router.get('/pokemon/name/:name', pokemonController.getPokemonByName);
router.get('/pokemon/region/:region', pokemonController.getPokemonByRegion);
router.get('/pokemon/type', pokemonController.getPokemonByType);
router.get('/pokemon/week', pokemonController.getPokemonByWeek);

export default router;