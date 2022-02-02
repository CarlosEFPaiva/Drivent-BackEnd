import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/talks";
import InvalidDataError from "@/errors/InvalidData";

export async function subscribeUserToTalk(req: Request, res: Response) {
  await service.subscribe(req.user.id, req.body.eventId);
  res.sendStatus(httpStatus.CREATED);
}

export async function unsubscribeUserToTalk(req: Request, res: Response) {
  await service.unsubscribe(req.user.id, req.body.eventId);
  res.sendStatus(httpStatus.NO_CONTENT);
}

export async function findDates(req: Request, res: Response) {
  const dates = await service.getDates();
  res.send(dates);
}

export async function specificDayEvents(req: Request, res: Response) {
  if(!Number(req.params.dayId)) {
    throw new InvalidDataError("id", ["id must be a number"]); 
  }
  const events = await service.getEventsByDayId(req.user.id, Number(req.params.dayId));

  res.send(events);
}

export async function getEventInfoByUser(req: Request, res: Response) {
  const result = await service.getTalksByUserId(req.user.id);
  res.send(result);
}
