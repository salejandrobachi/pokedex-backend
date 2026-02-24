import { Request, Response } from 'express';
import { DebilidadesService } from '../services/debilidad.services';

const debilidadesService = new DebilidadesService();

export class DebilidadesController {
  async getAllDebilidades(req: Request, res: Response): Promise<void> {
    try {
      const Debilidad = await debilidadesService.getAllDebilidades();
      res.json(Debilidad);
    } catch (error) {
      console.error('Error fetching types:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

async getDebByNombre(req: Request, res: Response): Promise<void> {
      const nombre = req.query.name as string | undefined;
  
      if (nombre) {
        try {
          const Debilidad = await debilidadesService.getDebByNombre(nombre);
          if (Debilidad && Debilidad.length > 0) {
            res.json(Debilidad);
          } else {
            res.status(404).json({ message: 'Type not found' });
          }
        } catch (error) {
          console.error('Error fetching type by Name:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        res.status(400).json({ error: 'Please provide the "name" query parameter.' });
      }
    }
}