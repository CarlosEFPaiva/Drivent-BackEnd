import { Router } from "express";
import * as controller from "@/controllers/client/room";

const router = Router();

router.post("/", controller.saveRoom);

export default router;
