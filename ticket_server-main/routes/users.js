const express = require("express");
const { verifyToken, isAgent, AdminAndManager } = require("../middleware/verifying");
const {
  AvailableUsersforHandoverTickets,
  AvailableUsersforAssignTickets,
  DeleteUser,
  UpdateUserByAdmin,
  getAgentsByMostTicketsSolved,
  getUsersWhoBreachedSecondSLA,
  userTicketStats,
} = require("../controllers/users");
const User = require("../models/Users");
const router = express.Router();

router.get("/available-for-handover", verifyToken, isAgent, AvailableUsersforHandoverTickets);
router.get("/available-for-assign/:ticketId", verifyToken, AdminAndManager, AvailableUsersforAssignTickets);

// just for check, not for production
router.get("/all-users", async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    // next(error);
  }
});

router.get("/all-agents", verifyToken, AdminAndManager, async (req, res) => {
  try {
    const users = await User.find({ role: "agent" }).populate("category").select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
    // next(error);
  }
});

router.get("/all-clients", verifyToken, AdminAndManager, async (req, res) => {
  try {
    const users = await User.find({ role: "client" }).populate("category").select("-password");
    res.json(users);
  } catch (error) {
    console.log(error);
    // next(error);
  }
});

router.delete("/delete-user/:id", verifyToken, AdminAndManager, DeleteUser);
router.put("/update-user/:id", verifyToken, AdminAndManager, UpdateUserByAdmin);

router.get("/who/solved/most", verifyToken, AdminAndManager, getAgentsByMostTicketsSolved);
router.get("/who/breached/2/sla", verifyToken, AdminAndManager, getUsersWhoBreachedSecondSLA);
router.get("/stats/:id", verifyToken, AdminAndManager, userTicketStats);

// userTicketStats
module.exports = router;
