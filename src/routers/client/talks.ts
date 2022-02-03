import { Router } from "express";

import * as controller from "@/controllers/client/talks";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import talkSubscriptionSchema from "@/schemas/talkSubscriptionSchema";

const router = Router();

router.post("/subscribe", schemaValidatingMiddleware(talkSubscriptionSchema), controller.subscribeUserToTalk);
router.post("/unsubscribe", schemaValidatingMiddleware(talkSubscriptionSchema), controller.unsubscribeUserToTalk);
router.get("/dates", controller.findDates);
router.get("/events/:dayId", controller.specificDayEvents);
router.get("/user-talks-info", controller.getEventInfoByUser);

export default router;
