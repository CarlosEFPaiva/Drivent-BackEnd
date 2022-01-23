import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/payment";

export async function reserveTicket(req: Request, res: Response) {
  const user = await service.reserveTicket(req.user.id, req.body.ticketId, req.body.accomodationId);
  res.status(httpStatus.OK).send(user);
}
