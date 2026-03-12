import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNode,
  FaGit,
  FaGithub,
  FaDocker,
  FaAws,
  FaDatabase,
  FaServer,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiRedux,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTailwindcss,
  SiJest,
  SiElectron,
  SiWebpack,
  SiBabel,
  SiNginx,
  SiJenkins,
  SiKubernetes,
} from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";
import type { IconType } from "react-icons";
import React from "react";

const icons: Record<string, IconType> = {
  HTML: FaHtml5,
  CSS: FaCss3Alt,
  JavaScript: FaJs,
  TypeScript: SiTypescript,
  React: FaReact,
  "Next.js": SiNextdotjs,
  "Node.js": FaNode,
  Redux: SiRedux,
  GraphQL: SiGraphql,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  Tailwind: SiTailwindcss,
  Jest: SiJest,
  Electron: SiElectron,
  Webpack: SiWebpack,
  Babel: SiBabel,
  Nginx: SiNginx,
  Jenkins: SiJenkins,
  Git: FaGit,
  GitHub: FaGithub,
  Docker: FaDocker,
  Kubernetes: SiKubernetes,
  AWS: FaAws,
  Database: FaDatabase,
  Server: FaServer,
  Default: BiCodeAlt,
};

export const TechIcon = ({ name }: { name: string }) => {
  const IconComponent = icons[name] || icons.Default;
  //@ts-ignore
  return React.createElement(IconComponent, { size: 16 });
};
