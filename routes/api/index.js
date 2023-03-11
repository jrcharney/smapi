/**
 * @file routes/api/index.js
 * @desc Routes for the index
 */
import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { thoughtRoutes } from "./thoughtRoutes.js";

const router = new Router();
router.use("/users",userRoutes);
router.use("/thought",thoughtRoutes);

export {router}