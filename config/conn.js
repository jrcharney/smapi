/**
 * @file config/conn.js
 * @desc Set up the Mongoose/MongoDB connection
 */
import {connect, connection} from "mongoose";
import * as dotenv from dotenv;

dotenv.config();

const DB_PORT = process.env.DB_PORT || 27017;

connect("mongodb://localhost:${DB_PORT}/smapi",{
    useNewURLParser: true,
    useUnifiedTopology: true,
});

export {connection};