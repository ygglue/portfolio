export interface Project {
  name: string;
  description: string;
  techTags: string[];
  githubUrl: string;
}

export const projects: Project[] = [
  {
    name: "project-alpha",
    description: "AI-native code analysis tool",
    techTags: ["Next.js", "Rust", "Python"],
    githubUrl: "https://github.com/user/project-alpha",
  },
  {
    name: "project-beta",
    description: "Real-time collaborative editor engine",
    techTags: ["TypeScript", "CRDT", "WebSocket"],
    githubUrl: "https://github.com/user/project-beta",
  },
  {
    name: "project-gamma",
    description: "Distributed task scheduler for LLM pipelines",
    techTags: ["Go", "gRPC", "Kubernetes"],
    githubUrl: "https://github.com/user/project-gamma",
  },
];
