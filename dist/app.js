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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Importa el middleware cors
const region_routes_1 = __importDefault(require("./routes/region.routes"));
const tipo_routes_1 = __importDefault(require("./routes/tipo.routes"));
const pokemon_routes_1 = __importDefault(require("./routes/pokemon.routes"));
const resistencia_routes_1 = __importDefault(require("./routes/resistencia.routes"));
const debilidad_routes_1 = __importDefault(require("./routes/debilidad.routes"));
const inmune_routes_1 = __importDefault(require("./routes/inmune.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const app = (0, express_1.default)();
const allowedOrigins = [
    'http://localhost:3000',
    process.env.FRONTEND_URL, // tu frontend en Vercel
].filter(Boolean);
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use('/api', region_routes_1.default);
app.use('/api', tipo_routes_1.default);
app.use('/api', pokemon_routes_1.default);
app.use('/api', resistencia_routes_1.default);
app.use('/api', debilidad_routes_1.default);
app.use('/api', inmune_routes_1.default);
app.use('/api', user_routes_1.default);
app.use('/api', auth_routes_1.default);
app.use('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('pong');
}));
exports.default = app;
