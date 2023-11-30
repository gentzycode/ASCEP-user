import {
  DemocracyIcon,
  DialogueIcon,
  MainIcon,
  ResponseIcon,
  SettingsIcon,
} from "@/Icons";

export const DemocracyLinks: NavLinkType[] = [
  {
    title: "Debates",
    path: "/debates",
  },
  {
    title: "Initiatives",
    path: "/debates",
  },
  {
    title: "Proposals",
    path: "/proposals",
  },
  {
    title: "Voting",
    path: "/debates",
  },
  {
    title: "Participatory Budgeting",
    path: "",
  },
  {
    title: "SDG",
    path: "",
  },
];
export const FooterLinks: NavLinkType[] = [
  {
    title: "About us",
    path: "#",
  },
  {
    title: "Contact us",
    path: "#",
  },
  {
    title: "Services",
    path: "#",
  },
  {
    title: "F.A.Qs",
    path: "#",
  },
];
export const sidebarLinks: NavLinkType[] = [
  {
    title: "Main",
    Icon: <MainIcon />,
    path: "",
  },
  {
    title: "ASCEP Response",
    Icon: <ResponseIcon />,
    path: "/response",
  },
  {
    title: "ASCEP Dialogue",
    Icon: <DialogueIcon />,
    path: "",
  },
  {
    title: "ASCEP Democracy",
    Icon: <DemocracyIcon />,
    path: "/debates",
  },
  {
    title: "Settings",
    Icon: <SettingsIcon />,
    path: "",
  },
];
