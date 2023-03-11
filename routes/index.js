/**
 * @file routes/index.js
 * @desc Routes for the database
 */
import { Router } from "express";
import apiRoutes from "./api";
const router = new Router();

router.use('/api',apiRoutes);
router.use((req,res) => {
    res.send("Wrong route!");
});

export {router};