const errorHandler = require("../middleware/errorHandler");
const User = require("../models/Users");
const Ticket = require("../models/tickets");

const AvailableUsersforHandoverTickets = async (req, res, next) => {
  try {
    const _user = await User.findById(req.user.id);

    const _users = await User.find({ role: "agent", category: _user.category });

    return res.status(200).json({ users: _users });
  } catch (error) {
    next(error);
  }
};

const AvailableUsersforAssignTickets = async (req, res, next) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    const _users = await User.find({ role: "agent", category: ticket.category });

    return res.status(200).json({ users: _users });
  } catch (error) {
    next(error);
  }
};

const DeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};

const UpdateUserByAdmin = async (req, res) => {
  try {
    const data = {};

    if (req.body.name) {
      data.name = req.body.name;
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.json({
          error: "password required & should be minimum 6 chr long",
        });
      } else {
        data.password = await hashPassword(req.body.password);
      }
    }

    if (req.body.role) {
      data.role = req.body.role;
    }

    if (req.body.category) {
      data.category = req.body.category;
    }

    let user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    user.password = undefined;
    user.role = undefined;
    user.passwordResetOTP = undefined;
    user.passwordResetExpiry = undefined;

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.json({ error: "Duplicate error" });
    }
    console.log("failed error", error);
  }
};

// getting user who solved most of the tickets
const getAgentsByMostTicketsSolved = async (req, res) => {
  try {
    const aggregatedTickets = await Ticket.aggregate([
      { $match: { status: "Resolved" } },
      {
        $group: {
          _id: "$assignedTo",
          solvedCount: { $sum: 1 },
        },
      },
      {
        $sort: { solvedCount: -1 },
      },
    ]);

    // Fetch the actual user details
    const userIds = aggregatedTickets.map((a) => a._id);
    const users = await User.find({ _id: { $in: userIds }, role: "agent" });

    // Return the users sorted by most tickets solved
    let resUsers = users.sort((a, b) => {
      const countA = aggregatedTickets.find((ticket) => String(ticket._id) === String(a._id)).solvedCount;
      const countB = aggregatedTickets.find((ticket) => String(ticket._id) === String(b._id)).solvedCount;
      return countB - countA;
    });

    res.json(resUsers);
  } catch (error) {
    console.log(err);
  }
};

// users who breach second SLA
const getUsersWhoBreachedSecondSLA = async (req, res) => {
  try {
    // Find all tickets where the second SLA has been breached
    const ticketsWithSLABreach = await Ticket.find({
      secondSLABreach: true,
    }).populate("createdBy");

    // Collect user IDs and their associated ticket IDs
    const userTicketsMap = new Map();
    for (const ticket of ticketsWithSLABreach) {
      if (ticket.createdBy && ticket.createdBy._id) {
        const userId = ticket.createdBy._id.toString();
        if (!userTicketsMap.has(userId)) {
          userTicketsMap.set(userId, []);
        }
        userTicketsMap.get(userId).push(ticket._id.toString());
      }
    }

    // Find users by their IDs and add their breached ticket IDs
    const userIds = Array.from(userTicketsMap.keys());
    const users = await User.find({ _id: { $in: userIds } });
    const usersWithTickets = users.map((user) => {
      const userObj = user.toObject();
      userObj.SecondSLABreachedTickets = userTicketsMap.get(user._id.toString());
      delete userObj.password; // Remove the password from the output
      delete userObj.__v; // Remove the version key from the output
      return userObj;
    });

    return res.status(200).json({
      message: "Users who breached the second SLA",
      users: usersWithTickets,
    });
  } catch (error) {
    console.log("Error fetching users who breached the second SLA:", error);
    return res.status(500).json({ error: "An error occurred while processing your request" });
  }
};

const userTicketStats = async (req, res, next) => {
  try {
    const userId = req.params.id; // Assuming userId is passed as a route parameter

    // Count how many tickets the user has solved
    const solvedCount = await Ticket.countDocuments({ resolvedBy: userId });

    // Count how many tickets the user has picked
    const pickedCount = await Ticket.countDocuments({ pickedBy: userId });

    // Count how many tickets are currently assigned to the user as the current agent
    const currentAgentCount = await Ticket.countDocuments({ currentAgent: userId });

    // Count how many tickets picked by the user have breached the second SLA
    const secondSLABreachCount = await Ticket.countDocuments({ pickedBy: userId, secondSLABreach: true });

    res.json({
      solvedCount,
      pickedCount,
      currentAgentCount,
      secondSLABreachCount,
    });
  } catch (error) {
    next(error); // Pass errors to Express error handler, which can handle them accordingly
  }
};

module.exports = {
  AvailableUsersforHandoverTickets,
  AvailableUsersforAssignTickets,
  DeleteUser,
  UpdateUserByAdmin,
  getAgentsByMostTicketsSolved,
  getUsersWhoBreachedSecondSLA,
  userTicketStats,
};
