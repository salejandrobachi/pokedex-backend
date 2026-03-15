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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const authService = new auth_service_1.AuthService();
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: 'Email y password son requeridos' });
                return;
            }
            try {
                const result = yield authService.login(email, password);
                res.status(200).json(result);
            }
            catch (error) {
                if (error.message === 'INVALID_CREDENTIALS') {
                    res.status(401).json({ error: 'Credenciales inválidas' });
                }
                else {
                    console.error('Error en login:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                }
            }
        });
    }
}
exports.AuthController = AuthController;
