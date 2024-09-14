// import ClientProfile from "../App/pages/client/ClientProfile";
import InProgress from "../App/pages/client/InProgress";
import OpenTc from "../App/pages/client/OpenTc";

export const paths = {
  login: "/login",
  signup: "/signup",
  home: "/",

  // client
  client: "/client", //cliet dashboard
  submit: "/client/submit",
  resolvedTicket: "/client/resolved",
  openClient: "/client/open",
  reOpen: "/client/reOpentic",
  inProgressClient: "/client/inprogress",
  clientProfile: "/client/profile",

  // agents
  agent: "/agent", //agent dashboard
  resolvetic: "/agent/resolved-ticket", //cliet dashboard
  agentBucket: "/agent/bucket",
  agentReopen: "/agent/reopen",
  agentAssigned: "/agent/assigned",
  agentHandover: "/agent/handover",
  agentPickTickets: "/agent/my-picks",
  agentProfile: "/agent/profile",

  // agentOpenTicketDetail: (id = id) => `agent/ticket/:${id}`

  // admin
  admin: "/admin", //cliet dashboard
  category: "/admin/category", //cliet dashboard
  allTickets: "/admin/allTickets", //cliet dashboard
  createCategory: "/admin/createCats", //cliet dashboard
  createUser: "/admin/createUser", // user with role
  escalatedTic: "/admin/escalatedTickets",
  adminProfile: "/admin/profile",
  assignTickets: "/admin/assignTickets",
};
