import prisma from "@/prisma";
import { NextFunction, Request, Response } from "express";
import { findNearest, getDistance, getLatitude, getLongitude, isPointWithinRadius } from "geolib";

export class StoreController {
  async getNearestStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { lat, long } = req.query;

      const stores = await prisma.store.findMany({});

      const latLongStores = stores.map((store) => ({
        latitude: store.latitude,
        longitude: store.longitude
      }));

      const nearest = findNearest({ latitude: Number(lat), longitude: Number(long) }, latLongStores);

      const nearestStore = stores.find((store) => (
        store.latitude === getLatitude(nearest) && store.longitude === getLongitude(nearest)
      ));

      const isInRadius = isPointWithinRadius(
        { latitude: getLatitude(nearest), longitude: getLongitude(nearest) },
        { latitude: Number(lat), longitude: Number(long) },
        10000);

      const distance = getDistance(
        { latitude: Number(lat), longitude: Number(long) },
        { latitude: getLatitude(nearest), longitude: getLongitude(nearest) }
      );

      if (!isInRadius) {
        return res.status(200).json({
          success: true,
          results: {
            store: stores[0],
            distance: distance / 1000,
            isInRadius
          },
          message: 'distance more than 10 KM'
        });
      }

      return res.status(200).json({
        success: true,
        results: {
          store: nearestStore,
          distance: distance / 1000,
          isInRadius
        }
      });
    } catch (error) {
      return next(error);
    }
  }

  async getAllStores(req: Request, res: Response, next: NextFunction) {
    try {
      const stores = await prisma.store.findMany({ include: { product_inventories: true, user: true } });

      return res.status(200).json({ success: true, results: stores });
    } catch (error) {
      return next(error);
    }
  }
}