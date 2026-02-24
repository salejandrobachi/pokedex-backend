import express from 'express';
import cors from 'cors'; // Importa el middleware cors
import regionRoutes from './routes/region.routes';
import typeRoutes from './routes/tipo.routes';
import pokemonRoutes from './routes/pokemon.routes';
import ResistenciaRoutes from './routes/resistencia.routes';
import DebilidadesRoutes from './routes/debilidad.routes';
import InmunidadRoutes from './routes/inmune.routes';

const app = express();

app.use(express.json());
app.use(cors());


app.use('/api', regionRoutes);
app.use('/api', typeRoutes);
app.use('/api', pokemonRoutes);
app.use('/api', ResistenciaRoutes);
app.use('/api', DebilidadesRoutes);
app.use('/api', InmunidadRoutes);
app.use('/ping', async (req, res) => {
    res.send('pong');
});

export default app;