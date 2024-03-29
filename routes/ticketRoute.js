import express from "express";
import {
  acceptTicket,
  createATicket,
  findASingleTicket,
  getAllTiket,
  sloveATicket,
} from "../controller/ticketController.js";
import verifyUser from "../utils/verifyUser.js";

const ticketRoute = express.Router();

ticketRoute.post("/create", createATicket);

ticketRoute.get("/allticket", verifyUser, getAllTiket);
ticketRoute.get("/getTicket/:id", findASingleTicket);

ticketRoute.patch("/slove", sloveATicket);
ticketRoute.patch("/accept/:id", acceptTicket);

export default ticketRoute;
