import {
  siDocker, siGithub, siGithubactions, siGo, siJsonwebtokens, siKubernetes, siMysql, siOpenjdk,
  siPython, siRedis, siSpotify, siSpringboot, siSpringsecurity, siTerraform, siTypescript
} from "simple-icons";

// Brand logos are filled 24×24 paths. Simple Icons doesn't ship AWS logos,
// so AWS services and generic concepts get small outline icons instead.
export type Icon = { path: string; stroke?: boolean };

const brand = (i: { path: string }): Icon => ({ path: i.path });
const line = (path: string): Icon => ({ path, stroke: true });

const icons: Record<string, Icon> = {
  Go: brand(siGo),
  Java: brand(siOpenjdk),
  Python: brand(siPython),
  TypeScript: brand(siTypescript),
  "Spring Boot": brand(siSpringboot),
  "Spring Security": brand(siSpringsecurity),
  JWT: brand(siJsonwebtokens),
  Redis: brand(siRedis),
  MySQL: brand(siMysql),
  Kubernetes: brand(siKubernetes),
  Docker: brand(siDocker),
  Terraform: brand(siTerraform),
  "GitHub Actions": brand(siGithubactions),
  "Spotify Web API": brand(siSpotify),
  GitHub: brand(siGithub),

  "REST APIs": line("M8 6 3 12l5 6M16 6l5 6-5 6M14 4l-4 16"),
  WebSockets: line("M4 9h13l-3-3M20 15H7l3 3"),
  EC2: line("M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01"),
  Lambda: line("M6 4h3l9 16M12 11 6 20"),
  "API Gateway": line("M3 12h4M17 12h4M7 6h10v12H7zM10 10l2 2-2 2"),
  DynamoDB: line("M5 6c0-1.7 3.1-3 7-3s7 1.3 7 3-3.1 3-7 3-7-1.3-7-3Zm0 0v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"),
  S3: line("M4 6h16l-2 14H6zM4 6c0-1.1 3.6-2 8-2s8 .9 8 2"),
  "Live site": line("M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"),
  CloudFront: line("M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-9 9h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z")
};

export const iconFor = (name: string): Icon | undefined => icons[name];
