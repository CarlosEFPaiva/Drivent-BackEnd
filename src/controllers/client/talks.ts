import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/talks";

export async function subscribeUserToTalk(req: Request, res: Response) {
  await service.subscribe(req.user.id, req.body.eventId);
  res.sendStatus(httpStatus.CREATED);
}
