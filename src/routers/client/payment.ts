import { Router } from "express";

import * as controller from "@/controllers/client/payment";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import reserveTicketSchema from "@/schemas/reserveTicketSchema";

const router = Router();

router.post("/ticket-reservation", schemaValidatingMiddleware(reserveTicketSchema), controller.reserveTicket);
router.post("/confirmation", controller.confirmPayment);

export default router;
