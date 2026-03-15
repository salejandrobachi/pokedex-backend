import express from 'express';
import cors from 'cors'; // Importa el middleware cors
import regionRoutes from './routes/region.routes';
import typeRoutes from './routes/tipo.routes';
import pokemonRoutes from './routes/pokemon.routes';
import ResistenciaRoutes from './routes/resistencia.routes';
import DebilidadesRoutes from './routes/debilidad.routes';
import InmunidadRoutes from './routes/inmune.routes';
import UserRoutes from './routes/user.routes';
import AuthRoutes from './routes/auth.routes';
import AdminRoutes from './routes/admin.routes';

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL, // tu frontend en Vercel
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());


app.use('/api', regionRoutes);
app.use('/api', typeRoutes);
app.use('/api', pokemonRoutes);
app.use('/api', ResistenciaRoutes);
app.use('/api', DebilidadesRoutes);
app.use('/api', InmunidadRoutes);
app.use('/api', UserRoutes);
app.use('/api', AuthRoutes);
app.use('/api', AdminRoutes);
app.use('/ping', async (req, res) => {
    res.send('pong');
});

export default app;