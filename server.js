/**
 * @file server.js
 * @desc entry point of this assignment
 */
import { express } from "express";
import {db} from "./config/conn.js";
import { routes } from "./routes";
import process from "process";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));    // accept form data
app.use(express.json());                            // accept json data
app.use(routes);                                    // use routes

db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});
