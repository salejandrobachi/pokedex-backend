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
exports.UserController = void 0;
const user_services_1 = require("../services/user.services");
require("../types/express");
const userService = new user_services_1.UserService();
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password, role } = req.body;
            if (!username || !email || !password) {
                res.status(400).json({ error: 'username, email y password son requeridos' });
                return;
            }
            try {
                const user = yield userService.createUser(username, email, password, role);
                res.status(201).json(user);
            }
            catch (error) {
                if (error.code === '23505') {
                    res.status(409).json({ error: 'El email o username ya está en uso' });
                }
                else {
                    console.error('Error creating user:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield userService.getUserById(id);
                if (user) {
                    res.json(user);
                }
                else {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error('Error fetching user:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { username } = req.body;
            if (req.user.id !== id) {
                res.status(403).json({ error: 'No puedes editar la cuenta de otro usuario' });
                return;
            }
            if (!username) {
                res.status(400).json({ error: 'username es requerido' });
                return;
            }
            try {
                const user = yield userService.updateUsername(id, username);
                if (!user) {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                    return;
                }
                res.json(user);
            }
            catch (error) {
                if (error.code === '23505') {
                    res.status(409).json({ error: 'El username ya está en uso' });
                }
                else {
                    console.error('Error updating user:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (req.user.id !== id) {
                res.status(403).json({ error: 'No puedes eliminar la cuenta de otro usuario' });
                return;
            }
            try {
                const deleted = yield userService.deleteUser(id);
                if (!deleted) {
                    res.status(404).json({ error: 'Usuario no encontrado' });
                    return;
                }
                res.status(204).send();
            }
            catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.UserController = UserController;
