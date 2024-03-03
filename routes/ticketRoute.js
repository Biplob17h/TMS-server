import express from "express";
import { createATicket, sloveATicket } from "../controller/ticketController.js";

const ticketRoute = express.Router();

ticketRoute.post("/create", createATicket);
ticketRoute.patch('/slove', sloveATicket)

export default ticketRoute;
