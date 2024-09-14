import { Route, Routes } from "react-router-dom";
import { paths } from "../helpers/paths";
import Home from "./pages/common/Home";
import Login from "./pages/common/Login";
import Signup from "./pages/common/Signup";
import UserProfile from "./component/common/Profile";
// admin
import {
  AdminRouting,
  AdminCategory,
  CreateCategory,
  CreateUser,
  AdminDashboard,
  AssignTickets,
} from "../App/pages/admin"

// for client
import { 
  SubmitTicket,
    OpenTc,
    ClientDashboard,
    InProgress,
    ResolvedTicket,
    ReOpentic,
    ClientRouting,
  } from './pages/client'

// agent
import {
  AgentRouting,
  Bucket,
  ResolveAgent,
  AgentReopenTickets,
  AgentHandover,
  AgentAssignedTickets,
  AgentDashboard,
  AgentPickTickets,
} from "./pages/agent";
import AgentOpenTicketDetail from "./pages/agent/details/openTicketsDetails.agent";
import EscalatedTickets from "./pages/admin/escalatedTic.admin";
import AllTickets from "./pages/admin/AllTickets.admin";
import TicketDetail from "./pages/admin/detail/ticketDetail.admin";



const AppRouting = () => {
  return (
    <Routes>
      <Route path={paths.home} element={<Home />} />
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.signup} element={<Signup />} />
      {/* /client */}
      <Route path={paths.client} element={<ClientRouting />}>
        <Route path={""} element={<ClientDashboard />} />
        <Route path={paths.submit} element={<SubmitTicket />} />

        <Route path={paths.openClient} element={<OpenTc />} />
        <Route path={paths.inProgressClient} element={<InProgress />} />
        <Route path={paths.resolvedTicket} element={<ResolvedTicket />} />
        <Route path={paths.clientProfile} element={<UserProfile />} />
        <Route path={paths.reOpen} element={<ReOpentic />} />
      </Route>

      {/* agent */}
      <Route path={paths.agent} element={<AgentRouting />}>
        <Route path={""} element={<AgentDashboard />} />
        <Route path={paths.agentBucket} element={<Bucket />} />
        <Route path={paths.agentReopen} element={<AgentReopenTickets />} />
        <Route path={paths.agentHandover} element={<AgentHandover />} />
        <Route path={paths.agentAssigned} element={<AgentAssignedTickets />} />
        <Route path={paths.agentPickTickets} element={<AgentPickTickets />} />
        <Route path={"/agent/ticket/:id"} element={<AgentOpenTicketDetail />} />
        <Route path={"/agent/resolved-ticket"} element={<ResolveAgent />} />
        <Route path={paths.agentProfile} element={<UserProfile />} />
      </Route>

      {/* admin */}
      <Route path={paths.admin} element={<AdminRouting />}>
        {/* admin's routes */}
        <Route path={""} element={<AdminDashboard />} />
        <Route path={paths.category} element={<AdminCategory />} />
        <Route path={paths.createCategory} element={<CreateCategory />} />
        <Route path={paths.allTickets} element={<AllTickets />} />
        <Route path={paths.escalatedTic} element={<EscalatedTickets />} />
        <Route path={paths.createUser} element={<CreateUser />} />
        <Route path={paths.assignTickets} element={<AssignTickets />} />
        <Route path={paths.adminProfile} element={<UserProfile />} />
        <Route path={"/admin/ticketDetail/:id"} element={<TicketDetail />} />
      </Route>

      <Route path="*" element={<> Not Found </>} />
    </Routes>
  );
};
export default AppRouting;
