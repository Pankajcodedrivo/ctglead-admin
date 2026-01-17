const sidebarNav = [
  {
    link: "/admin/dashboard",
    section: "dashboard",
    icon: "lucide:layout-dashboard", //width:"20"
    text: "Dashboard",
    role: ["admin"],
  },
  {
    link: "/admin/career",
    section: "career",
    icon: "ph:briefcase",
    text: "Insurance Career",
    role: ["admin"],
  },
  {
    link: "/admin/users",
    section: "users",
    icon: "ph:users-bold", //width:"20"
    text: "Users Management",
    role: ["admin"],
  },
  // {
  //   link: "/admin/pages",
  //   section: "pages",
  //   icon: "mdi:file-document-outline", //width:"20"
  //   text: "Pages",
  //   role: ["admin"],
  // },
  {
    link: "/admin/settings",
    section: "settings",
    icon: "mdi:cog", //width:"20"
    text: "Settings",
    role: ["admin"],
  },
];

export default sidebarNav;
