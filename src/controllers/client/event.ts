import { Request, Response } from "express";

import * as service from "@/services/client/event";

export async function get(req: Request, res: Response) {
  const eventInfo = await service.getEventInfo();
  res.send(eventInfo);
}

export async function getTicketsAndAccomodations(req: Request, res: Response) {
  const ticketsAndAccomodationsInfo = await service.getTicketsAndAccomodationsInfo();
  res.send(ticketsAndAccomodationsInfo);
}
