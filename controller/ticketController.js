import Ticket from "../model/ticketModel.js";

const createATicket = async (req, res) => {
  try {
    // get ticket data
    const { title, description, createdAt, createdBy } = req.body;

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

export { createATicket };
