import { Router } from "express";

import * as controller from "@/controllers/client/event";

const router = Router();

router.get("/", controller.get);
router.get("/tickets-data", controller.getTicketsAndAccomodations);

export default router;
