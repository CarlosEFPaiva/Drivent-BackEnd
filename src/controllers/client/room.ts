import { Request, Response } from "express";
import * as service from "@/services/client/room";

export async function saveRoom(req: Request, res: Response) {
  const { selectedRoom, userId } = req.body;

  const result = await service.saveRoom(selectedRoom, userId);

  res.send(result);
}
