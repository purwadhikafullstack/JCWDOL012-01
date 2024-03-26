import { Request, Response, request } from 'express';
import prisma from '@/prisma';
import { getDistance } from 'geolib';
import axios from 'axios';

export class ShipmentController {
  async getcityId(req: Request, res: Response) {
    try {
      const city = await axios.get('https://api.rajaongkir.com/starter/city', {
        headers: {
          key: process.env.RAJAONGKIR_API_KEY,
          'content-type': 'application/json',
        },
      });
      return res.status(200).send(city.data);
    } catch (error) {
      console.error('error get city id', error);
    }
  }
  async getShippingCost(req: Request, res: Response) {
    const dataUser = req.dataUser;
    try {
      const address = await prisma.user_Address.findFirst({
        where: { user_id: dataUser.id, isPrimary: true },
      });
      const stores = await prisma.store.findMany();
      if (address) {
        const nearestStores = stores.filter((store) => {
          const distance = getDistance(
            {
              latitude: parseFloat(store.latitude.toString()),
              longitude: parseFloat(store.longitude.toString()),
            },
            {
              latitude: parseFloat(address.latitude.toString()),
              longitude: parseFloat(address.longitude.toString()),
            },
          );
          return distance <= 15000;
        });
        const nearestStoreCityId =
          nearestStores.length > 0 ? nearestStores[0].cityId : null;

        const nearestStoreId =
          nearestStores.length > 0 ? nearestStores[0].id : null;
        const shipment = [];
        const couriers = ['jne', 'tiki'];
        for (const courier of couriers) {
          const response = await axios.post(
            'https://api.rajaongkir.com/starter/cost',
            {
              origin: nearestStoreCityId,
              destination: address.cityId,
              weight: 1000,
              courier: courier,
            },
            {
              headers: {
                key: process.env.RAJAONGKIR_API_KEY,
                'content-type': 'application/json',
              },
            },
          );
          const results = response.data.rajaongkir.results;
          shipment.push({ courier, ...results[0] });
        }

        return res.status(200).send({
          shipment,
          addressId: address.id,
          storeId: nearestStoreId,
        });
      } else {
        throw new Error('cannot get Address');
      }
    } catch (error) {
      console.error('Error get Address', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}
