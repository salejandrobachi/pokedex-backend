import { Request, Response } from 'express';
import { ResistenciaService } from '../services/resistencia.services';

const resistenciaService = new ResistenciaService();

export class ResistenciaController {
  async getAllResistencia(req: Request, res: Response): Promise<void> {
    try {
      const Resistencia = await resistenciaService.getAllResistencia();
      res.json(Resistencia);
    } catch (error) {
      console.error('Error fetching types:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // async getTypeByNombre(req: Request, res: Response): Promise<void> {
  //   const nombre = req.query.nombre; // El ID del tipo será un UUID (string)
  //   try {
  //     const Resistencia = await resistenciaService.getResByNombre(nombre);
  //     if (Resistencia) {
  //       res.json(Resistencia);
  //     } else {
  //       res.status(404).json({ message: 'Resistencia not found' });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching type by Nombre:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   } 
  //}

  async getTypeByNombre(req: Request, res: Response): Promise<void> {
      const nombre = req.query.name as string | undefined;
  
      if (nombre) {
        try {
          const resistencia = await resistenciaService.getResByNombre(nombre);
          if (resistencia && resistencia.length > 0) {
            res.json(resistencia);
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