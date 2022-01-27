import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import roomRouter from "@/routers/client/room";
import paymentRouter from "@/routers/client/payment";
import talksRouter from "@/routers/client/talks";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();
router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/save-room", tokenValidationMiddleware, roomRouter);
router.use("/payment", tokenValidationMiddleware, paymentRouter);
router.use("/talks", tokenValidationMiddleware, talksRouter);

export default router;
