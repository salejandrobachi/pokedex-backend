import { Request, Response } from 'express';
import { TypeService } from '../services/tipo.services';

const typeService = new TypeService();

export class TypeController {
  async getAllTypes(req: Request, res: Response): Promise<void> {
    try {
      const types = await typeService.getAllTypes();
      res.json(types);
    } catch (error) {
      console.error('Error fetching types:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getTypeByName(req: Request, res: Response): Promise<void> {
    const name = req.query.name as string | undefined;

    if (name) {
      try {
        const type = await typeService.getTypeByName(name);
        if (type && type.length > 0) {
          res.json(type);
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