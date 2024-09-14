const express = require("express");
const { verifyToken, isClient, isAgent, AdminAndManager } = require("../middleware/verifying");
const {
  createTicket,
  pickTicket,
  ticketBucket,
  pickedTicketListOfAgent,
  addComments,
  addCommentByClient,
  updateTicketToResolved,
  ClientsOpenTickets,
  ClientsInProgressTickets,
  resolvedTickets,
  reopenTicket,
  handoverTicket,
  allTickerts,
  handoverToMe,
  escalateTickets,
  allEscalatedTickets,
  assignTicket,
  assignToMe,
  allReponedTicketsOf_a_Agent,
  detailTicket,
  allReponedTicketsOf_a_Client,
  detailTicketsAdmin,
  ticketStats,
  updateTicketToOpen,
} = require("../controllers/tickets");

const router = express.Router();

router.get("/", verifyToken, ticketBucket);

// ------------

router.get("/my-picks", verifyToken, isAgent, pickedTicketListOfAgent);
router.get("/all-reopens", verifyToken, isAgent, allReponedTicketsOf_a_Agent);
router.put("/pick", verifyToken, isAgent, pickTicket);
router.put("/add-comments", verifyToken, isAgent, addComments);
router.put("/handover-ticket", verifyToken, isAgent, handoverTicket);
// all tickets that handover to me

router.put('/update-to-open/:ticketId', verifyToken, isAgent, updateTicketToOpen);
router.get("/handover-to-me", verifyToken, isAgent, handoverToMe);
router.get("/assign-to-me", verifyToken, isAgent, assignToMe);
router.put("/escalate", verifyToken, isAgent, escalateTickets);
router.get("/single/:ticketId", verifyToken, isAgent, detailTicket);

// ------------ client routers

router.post("/create", verifyToken, isClient, createTicket);
router.put("/add-comment", verifyToken, isClient, addCommentByClient);
router.get("/my-opens", verifyToken, isClient, ClientsOpenTickets);
router.get("/my-in-progress", verifyToken, isClient, ClientsInProgressTickets);
router.put("/reopen-ticket/:ticketId", verifyToken, isClient, reopenTicket);
router.get("/reopen-ticket", verifyToken, isClient, allReponedTicketsOf_a_Client);
router.get("/client-single/:ticketId", verifyToken, isClient, detailTicket);

// -------------------- for both
router.put("/update-to-resolved/:ticketId", verifyToken, updateTicketToResolved);

// -------------------- for any one
router.get("/resolved-tickets", verifyToken, resolvedTickets);

// -------------------- admins
router.get("/all-tickets", verifyToken, allTickerts);
router.get("/all-escalated-tickets", verifyToken, AdminAndManager, allEscalatedTickets);
router.get("/admin-ticket-detail/:ticketId", verifyToken, AdminAndManager, detailTicketsAdmin);
router.put("/assign-ticket", verifyToken, AdminAndManager, assignTicket);
// available for assigning ticket, category by ticket remaining****

router.get("/ticket-stats", verifyToken, AdminAndManager, ticketStats);

module.exports = router;
