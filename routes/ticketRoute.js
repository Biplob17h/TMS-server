import express from "express";
import {
  createATicket,
  findASingleTicket,
  getAllTiket,
  sloveATicket,
} from "../controller/ticketController.js";
import verifyUser from "../utils/verifyUser.js";

const ticketRoute = express.Router();

ticketRoute.post("/create", createATicket);

ticketRoute.get("/allticket",verifyUser,  getAllTiket);
ticketRoute.get('/getTicket/:id', findASingleTicket)

ticketRoute.patch("/slove",sloveATicket);

export default ticketRoute;
