import { MdCategory, MdCheck, MdDashboard, MdOutlineAllInbox, MdOutlineAssignment, MdOutlineDashboard, MdOutlineSendTimeExtension, MdRepeatOneOn } from "react-icons/md";
import { IoCheckmarkDoneSharp, IoCreateOutline, IoPersonCircleOutline } from "react-icons/io5"; 
import { TiFolderOpen } from "react-icons/ti";
import { GrInProgress, GrUserAdd } from "react-icons/gr";
import { paths } from "../paths";
import { useAuth } from "../../context/auth.context";
import {  BiLogIn } from "react-icons/bi";
import { FaFolderOpen } from "react-icons/fa";
import { BsBucket, BsFillArchiveFill } from "react-icons/bs";
import { CgColorPicker, CgProfile } from "react-icons/cg";

const AdminLinks = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    path: paths.admin,
  },
  {
    name: "Categories",
    icon: <MdCategory />,
    path: paths.createCategory,
  },
  {
    name: "All Tickets",
    icon: <MdOutlineAllInbox />,
    path: paths.allTickets,
  },
  {
    name: "Escalated Tickets",
    icon: <BsFillArchiveFill />,
    path: paths.escalatedTic,
  },
  {
    name: "Assign Ticket",
    icon: <MdCheck/>,
    path: paths.assignTickets,
  },
  {
    name: "Add User",
    icon: <GrUserAdd />,
    path: paths.createUser,
  },
  {
    name: "Profile",
    icon: <IoPersonCircleOutline />,
    gap: true,
    cat: "Settings",
    path: paths.adminProfile,
  },
  {
    name: "Logout",
    icon: <BiLogIn />,
    gap: false,
    cat: "",
    onClick: () => Logout(),
  },
  // many more
];


const agentLinks = [
  {
    gap: false,
    cats: "Overview",
    name: "Dashboard",
    path: paths.agent,
    icon: <MdOutlineDashboard size={19} />,
  },

  {
    gap: false,
    cats: "Tickets",
    name: "Bucket",
    path: paths.agentBucket,
    icon: <BsBucket size={19} />,
  },

  {
    gap: false,
    cats: "",
    name: "Picked",
    path: paths.agentPickTickets,
    icon: <CgColorPicker size={19} />,
  },

  {
    gap: false,
    name: "Reopens",
    path: paths.agentReopen,
    icon: <MdRepeatOneOn size={18} />,
  },

  {
    gap: false,
    name: "Handovers",
    path: paths.agentHandover,
    icon: <MdOutlineSendTimeExtension size={19} />,
  },

  {
    gap: false,
    name: "Assigned",
    path: paths.agentAssigned ,
    icon: <MdOutlineAssignment size={19} />,
  },

  {
    gap: true,
    cats: "Settings",
    name: "Profile",
    path: paths.agentProfile,
    icon: <CgProfile size={19} />,
  },
  {
    name: "Logout",
    icon: <BiLogIn />,
    gap: false,
    cat: "",
    onClick: () => Logout(),
  },

  // many more
];

const clientLinks = [
  {
    name: "Dashboard",
    icon: <MdDashboard />,
    gap: false,
    cat: "",
    path: paths.client,
  },
  {
    name: "Submit Ticket",
    icon: <IoCreateOutline />,
    gap: true,
    cat: "Tickets",
    path: paths.submit,
  },
  {
    name: "Open Tickets",
    icon: <TiFolderOpen />,
    gap: false,
    cat: "",
    path: paths.openClient,
  },
  {
    name: "ReOpen Tickets",
    icon: <FaFolderOpen />,
    gap: false,
    cat: "",
    path: paths.reOpen,
  },
  {
    name: "InProgress Tickets",
    icon: <GrInProgress />,
    gap: false,
    cat: "",
    path: paths.inProgressClient,
  },
  {
    name: "Resolved Tickets",
    icon: <IoCheckmarkDoneSharp />,
    gap: false,
    cat: "",
    path: paths.resolvedTicket,
  },
  {
    name: "Profile",
    icon: <IoPersonCircleOutline />,
    gap: true,
    cat: "Settings",
    path: paths.clientProfile,
  },
  {
    name: "Logout",
    icon: <BiLogIn />,
    gap: false,
    cat: "",
    onClick: () => Logout(),
  },
];

const SidebarLinks = () => {
  const [auth] = useAuth();
  const role = auth?.user?.role;

  if (!role) return [];

  return role === "admin"
    ? AdminLinks
    : role === "agent"
    ? agentLinks
    : clientLinks;
};

export default SidebarLinks;
