"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa express aquí
const pokemon_controller_1 = require("../controllers/pokemon.controller");
const router = express_1.default.Router();
const pokemonController = new pokemon_controller_1.PokemonController();
router.get('/pokemon', pokemonController.getAllPokemon);
router.get('/pokemon/number/:number', pokemonController.getPokemonByNumber);
router.get('/pokemon/name/:name', pokemonController.getPokemonByName);
router.get('/pokemon/region/:region', pokemonController.getPokemonByRegion);
router.get('/pokemon/type', pokemonController.getPokemonByType);
router.get('/pokemon/week', pokemonController.getPokemonByWeek);
exports.default = router;
