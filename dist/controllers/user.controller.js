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
}
exports.UserController = UserController;
