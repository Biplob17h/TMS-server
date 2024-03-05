import Ticket from "../model/ticketModel.js";

const createATicket = async (req, res) => {
  try {
    // get ticket data
    const { title, description, createdAt, createdBy } = req.body;

    console.log(req.body);

    // CHECK CREDENTIALS
    if (!title || !description || !createdAt || !createdBy) {
      return res.status(400).json({
        status: "fail",
        error: "please provide your credentials",
      });
    }

    // save ticket to database
    const ticketData = {
      title,
      description,
      createdAt,
      createdBy,
    };
    const ticket = new Ticket(ticketData);
    const result = await ticket.save();

    res.status(200).json({
      status: "success",
      message: "ticket created successfully",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const sloveATicket = async (req, res) => {
  try {
    const { sloved, slovedAt, ticketId } = req.body;

    // CHECK CREDENTIALS
    if (!sloved || !slovedAt || !ticketId) {
      return res.status(400).json({
        status: "fail",
        error: "please provide your credentials",
      });
    }

    // find ticket
    const ticket = await Ticket.findOne({ _id: ticketId });
    if (!ticket) {
      return res.status(400).json({
        status: "fail",
        error: "ticket not found",
      });
    }

    // update ticket data
    ticket.sloved = sloved;
    ticket.slovedAt = slovedAt;
    ticket.status = "sloved";

    // update ticket
    const result = await Ticket.updateOne({ _id: ticketId }, { $set: ticket });

    res.status(200).json({
      status: "success",
      message: "ticket sloved",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const getAllTiket = async (req, res) => {
  try {
    // get user
    const user = req.user;

    // filter
    const filter = req.query.filter;

    // query
    let query = {};
    if (filter === "all") {
      if (user.role === "user") {
        query = {
          createdBy: user.email,
        };
      }
    } else {
      if (user.role === "user") {
        query = {
          createdBy: user.email,
          status: filter,
        };
      } else {
        query = {
          status: filter,
        };
      }
    }

    const result = await Ticket.find(query);

    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

const findASingleTicket = async (req, res) => {
  try {
    const _id = req.params.id;

    const result = await Ticket.findOne(_id);
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

export { createATicket, sloveATicket, getAllTiket,findASingleTicket };
