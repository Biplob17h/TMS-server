import Ticket from "../model/ticketModel.js";

const createATicket = async (req, res) => {
  try {
    // get ticket data
    const { title, description, createdAt, createdBy } = req.body;

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

export { createATicket, sloveATicket };
