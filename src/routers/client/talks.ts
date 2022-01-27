import { Router } from "express";

import * as controller from "@/controllers/client/talks";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import talkSubscriptionSchema from "@/schemas/talkSubscriptionSchema";

const router = Router();

router.post("/subscribe", schemaValidatingMiddleware(talkSubscriptionSchema), controller.subscribeUserToTalk);
router.post("/unsubscribe", schemaValidatingMiddleware(talkSubscriptionSchema), controller.unsubscribeUserToTalk);

export default router;
