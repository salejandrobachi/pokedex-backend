"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonController = void 0;
const pokemon_services1_1 = require("../services/pokemon.services1");
const pokemonService = new pokemon_services1_1.PokemonService();
class PokemonController {
    getAllPokemon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pokemon = yield pokemonService.getAllPokemon();
                res.json(pokemon);
            }
            catch (error) {
                console.error('Error fetching all pokemon:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getPokemonByNumber(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const number = req.params.number; // El número de Pokedex será un string
            try {
                const pokemon = yield pokemonService.getPokemonByNumber(number);
                if (pokemon) {
                    res.json(pokemon);
                }
                else {
                    res.status(404).json({ message: 'Pokemon not found' });
                }
            }
            catch (error) {
                console.error('Error fetching pokemon by number:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getPokemonByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.params.name;
            try {
                const pokemon = yield pokemonService.getPokemonByName(name);
                if (pokemon) {
                    res.json(pokemon);
                }
                else {
                    res.status(404).json({ message: 'Pokemon not found' });
                }
            }
            catch (error) {
                console.error('Error fetching pokemon by name:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getPokemonByRegion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const region = req.params.region;
            try {
                const pokemon = yield pokemonService.getPokemonByRegion(region);
                if (pokemon) {
                    res.json(pokemon);
                }
                else {
                    res.status(404).json({ message: 'Pokemon not found' });
                }
            }
            catch (error) {
                console.error('Error fetching pokemon by name:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getPokemonByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { type1, type2 } = req.query;
            try {
                let pokemon;
                if (type1) {
                    pokemon = yield pokemonService.getPokemonByType(type1, type2);
                    if (pokemon && pokemon.length > 0) {
                        res.json(pokemon);
                    }
                    else {
                        res.status(404).json({ message: 'Pokemon not found' });
                    }
                }
                else {
                    res.status(400).json({ message: 'Please provide at least one type to search.' });
                }
            }
            catch (error) {
                console.error('Error fetching pokemon by type:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    getPokemonByWeek(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { week1, week2, week3, week4, week5, week6, week7, noWeek } = req.query;
            try {
                let pokemon;
                if (noWeek === 'true') {
                    pokemon = yield pokemonService.getPokemonWithNoWeek();
                }
                else if (week1) {
                    pokemon = yield pokemonService.getPokemonByWeek(week1, week2, week3, week4, week5, week6, week7);
                }
                else {
                    res.status(400).json({ message: 'Please provide at least one week to search or the "noWeakness" parameter.' });
                }
                if (pokemon && pokemon.length > 0) {
                    res.json(pokemon);
                }
                else {
                    res.status(404).json({ message: 'Pokemon not found' });
                }
            }
            catch (error) {
                console.error('Error fetching pokemon by week:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.PokemonController = PokemonController;
