import {
  TrendUp,
  Messages1,
  Profile2User,
  Setting2,
  TickSquare,
  Facebook,
  Youtube,
} from "iconsax-react";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

export const DialogueLinks: NavLinkType[] = [
  {
    title: "Make a request",
    path: "/dialogue/make-a-request",
  },
  {
    title: "Browse requests",
    path: "/dialogue/browse-request",
  },
  {
    title: "View MDAs",
    path: "/dialogue/view-authorities",
  },
  {
    title: "Help",
    path: "/dialogue/dialogue-help",
  },
];
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
    path: "/democracy/voting",
  },
  {
    title: "Participatory Budgeting",
    path: "/democracy/budgeting",
  },
  {
    title: "SDG",
    path: "/democracy/sdg",
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
    Icon: <TrendUp size={25} />,
    path: "/main",
    module: "main",
  },
  {
    title: "ASCEP Response",
    Icon: <Messages1 size={25} />,
    path: "/response",
    module: "response",
  },
  // {
  //   title: "ASCEP Dialogue",
  //   Icon: <Profile2User size={25} />,
  //   path: "/dialogue",
  //   module: "dialogue",
  // },
  {
    title: "ASCEP Democracy",
    Icon: <TickSquare size={25} />,
    path: "/democracy",
    module: "democracy",
  },
  {
    title: "Settings",
    Icon: <Setting2 size={25} />,
    path: "/settings",
    module: "settings",
  },
];
export const SocialLinks: NavLinkType[] = [
  {
    title: "Facebook",
    path: "#",
    Icon: <Facebook variant="Bold" />,
  },
  {
    title: "X",
    path: "#",
    Icon: <FaTwitter />,
  },
  {
    title: "Youtube",
    path: "#",
    Icon: <Youtube variant="Bold" />,
  },
  {
    title: "Linkedin",
    path: "#",
    Icon: <FaLinkedin />,
  },
];
