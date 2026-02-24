import { Request, Response } from 'express';
import { RegionService } from '../services/region.services';

const regionService = new RegionService();

export class RegionController {
  async getAllRegions(req: Request, res: Response): Promise<void> {
    try {
      const regions = await regionService.getAllRegions();
      res.json(regions);
    } catch (error) {
      console.error('Error fetching regions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getRegionById(req: Request, res: Response): Promise<void> {
    const id = req.params.id; // El ID de la región será un UUID (string)
    try {
      const region = await regionService.getRegionById(id);
      if (region) {
        res.json(region);
      } else {
        res.status(404).json({ message: 'Region not found' });
      }
    } catch (error) {
      console.error('Error fetching region by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getRegionByName(req: Request, res: Response): Promise<void> {
      const name = req.query.name as string | undefined;
  
      if (name) {
        try {
          const region = await regionService.getRegionByName(name);
          if (region && region.length > 0) {
            res.json(region);
          } else {
            res.status(404).json({ message: 'region not found' });
          }
        } catch (error) {
          console.error('Error fetching region by Name:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        res.status(400).json({ error: 'Please provide the "name" query parameter.' });
      }
    }
  
}