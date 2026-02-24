import { Request, Response } from 'express';
import { InmunidadService } from '../services/inmune.services';

const inmunidadService = new InmunidadService();

export class InmunidadController {
  async getAllInmunidad(req: Request, res: Response): Promise<void> {
    try {
      const Inmunidad = await inmunidadService.getAllInmunidad();
      res.json(Inmunidad);
    } catch (error) {
      console.error('Error fetching types:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

async getInmByNombre(req: Request, res: Response): Promise<void> {
      const nombre = req.query.name as string | undefined;
  
      if (nombre) {
        try {
          const Inmunidad = await inmunidadService.getInmByNombre(nombre);
          if (Inmunidad && Inmunidad.length > 0) {
            res.json(Inmunidad);
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