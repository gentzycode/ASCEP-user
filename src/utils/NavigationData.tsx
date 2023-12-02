import {
  DemocracyIcon,
  DialogueIcon,
  FacebookIcon,
  LinkedinIcon,
  MainIcon,
  ResponseIcon,
  SettingsIcon,
  XIcon,
  YoutubeIcon,
} from "@/Icons";

export const DemocracyLinks: NavLinkType[] = [
  {
    title: "Debates",
    path: "/democracy/debates",
  },
  {
    title: "Initiatives",
    path: "/democracy/initiatives",
  },
  {
    title: "Proposals",
    path: "/democracy/proposals",
  },
  {
    title: "Voting",
    path: "#",
  },
  {
    title: "Participatory Budgeting",
    path: "#",
  },
  {
    title: "SDG",
    path: "#",
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
    path: "/main",
    module: "main",
  },
  {
    title: "ASCEP Response",
    Icon: <ResponseIcon />,
    path: "/response",
    module: "response",
  },
  {
    title: "ASCEP Dialogue",
    Icon: <DialogueIcon />,
    path: "/dialogue",
    module: "dialogue",
  },
  {
    title: "ASCEP Democracy",
    Icon: <DemocracyIcon />,
    path: "/democracy",
    module: "democracy",
  },
  {
    title: "Settings",
    Icon: <SettingsIcon />,
    path: "/settings",
    module: "settings",
  },
];
export const SocialLinks: NavLinkType[] = [
  {
    title: "Facebook",
    path: "#",
    Icon: <FacebookIcon />,
  },
  {
    title: "X",
    path: "#",
    Icon: <XIcon />,
  },
  {
    title: "Youtube",
    path: "#",
    Icon: <YoutubeIcon />,
  },
  {
    title: "Linkedin",
    path: "#",
    Icon: <LinkedinIcon />,
  },
];
