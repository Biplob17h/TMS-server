import express from "express";
import { createATicket } from "../controller/ticketController.js";

const ticketRoute = express.Router();

ticketRoute.post("/create", createATicket);

export default ticketRoute;
