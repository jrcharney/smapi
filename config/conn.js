/**
 * @file config/conn.js
 * @desc Set up the Mongoose/MongoDB connection
 */
import {connect, connection} from "mongoose";
import process from "process";
import * as dotenv from "dotenv";

dotenv.config();

const DB_PORT     = process.env.DB_PORT     || 27017;
const DB_APP      = process.env.DB_APP      || "smapi";
const DB_SITE     = process.env.DB_SITE     || "localhost";
const DB_PROTOCOL = process.env.DB_PROTOCOL || "mongodb";
const DB_URI      = process.env.DB_URI      || `${DB_PROTOCOL}://${DB_SITE}:${DB_PORT}/${DB_APP}`;

// "mongodb://localhost:${DB_PORT}/smapi"
connect(DB_URI,{
    useNewURLParser: true,
    useUnifiedTopology: true,
});

export {connection};