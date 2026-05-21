export interface CommandDef {
  cmd: string;
  description: string;
  path: string;
}

export const commands: CommandDef[] = [
  { cmd: "init index", description: "Navigate to home page", path: "/" },
  {
    cmd: "cd ../projects/",
    description: "View projects chapter",
    path: "/projects",
  },
  { cmd: "cd ../skills/", description: "View skills chapter", path: "/skills" },
  {
    cmd: "cd ../contact/",
    description: "View contact information",
    path: "/contact",
  },
  { cmd: "page --help", description: "Show this help page", path: "/help" },
];
