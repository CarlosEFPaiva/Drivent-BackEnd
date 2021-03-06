import { Request, Response } from "express";

import * as service from "@/services/client/hotel";

export async function getHotels(req: Request, res: Response) {
  const hotelInfo = await service.getHotelsInfo();
  res.send(hotelInfo);
}
