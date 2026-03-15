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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserService {
    createUser(username_1, email_1, password_1) {
        return __awaiter(this, arguments, void 0, function* (username, email, password, role = 'user') {
            const password_hash = yield bcryptjs_1.default.hash(password, 10);
            const query = `
      INSERT INTO users (username, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email, created_at, role
    `;
            const { rows } = yield database_1.default.query(query, [username, email, password_hash, role]);
            return rows[0];
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE email = $1';
            const { rows } = yield database_1.default.query(query, [email]);
            return rows[0] || null;
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT id, username, email, created_at, role FROM users WHERE id = $1';
            const { rows } = yield database_1.default.query(query, [id]);
            return rows[0] || null;
        });
    }
}
exports.UserService = UserService;
