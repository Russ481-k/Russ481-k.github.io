// 고유명사 리스트 (계속 추가 가능)
export const properNouns = [
  // 프로그래밍 언어
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "React",
  "Next.js",
  "C++",
  "C#",
  "Ruby",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",

  // 프론트엔드
  "HTML",
  "CSS",
  "SASS",
  "SCSS",
  "jQuery",
  "Redux",
  "Vuex",
  "Webpack",
  "Babel",
  "ESLint",
  "Prettier",
  "Bootstrap",
  "Tailwind",
  "Material-UI",
  "Chakra-UI",
  "Storybook",
  "Jest",
  "Cypress",

  // 백엔드/서버
  "Node.js",
  "Express",
  "NestJS",
  "Spring",
  "Spring Boot",
  "Django",
  "Flask",
  "FastAPI",
  "Laravel",
  "Nginx",
  "Apache",
  "Tomcat",
  "PM2",
  "Jenkins",
  "Travis CI",
  "CircleCI",

  // 데이터베이스
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Elasticsearch",
  "Oracle",
  "SQLite",
  "MariaDB",
  "Sequelize",
  "Mongoose",
  "TypeORM",
  "Prisma",
  "GraphQL",
  "DynamoDB",
  "Cassandra",

  // 클라우드/인프라
  "AWS",
  "GCP",
  "Azure",
  "Docker",
  "Kubernetes",
  "Terraform",
  "Lambda",
  "S3",
  "EC2",
  "RDS",
  "ECS",
  "EKS",
  "CloudFront",
  "Route53",
  "VPC",
  "IAM",
  "Serverless",

  // 네트워크/보안
  "HTTP",
  "HTTPS",
  "TCP/IP",
  "DNS",
  "SSL",
  "TLS",
  "SSH",
  "FTP",
  "WebSocket",
  "REST",
  "OAuth",
  "JWT",
  "CORS",
  "Proxy",
  "Load Balancer",
  "Firewall",
  "VPN",

  // 버전관리/협업
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "SVN",
  "Jira",
  "Confluence",
  "Slack",
  "Notion",
  "Trello",
  "Figma",
  "Postman",
  "Swagger",

  // 터미널/CLI
  "Bash",
  "Shell",
  "PowerShell",
  "Vim",
  "Nano",
  "Curl",
  "Wget",
  "SSH",
  "SCP",
  "chmod",
  "chown",
  "sudo",
  "apt",
  "yum",
  "brew",

  // 빅데이터/AI
  "Hadoop",
  "Spark",
  "Kafka",
  "ELK",
  "Airflow",
  "TensorFlow",
  "PyTorch",
  "Pandas",
  "NumPy",
  "Scikit-learn",
  "Jupyter",
  "Tableau",
  "Power BI",

  // 아키텍처/방법론
  "MSA",
  "DDD",
  "TDD",
  "BDD",
  "SOLID",
  "REST",
  "GraphQL",
  "MVC",
  "MVVM",
  "Clean Architecture",
  "Event Sourcing",
  "CQRS",
  "Serverless",

  // 성능/최적화
  "CDN",
  "Cache",
  "Lazy Loading",
  "Code Splitting",
  "Tree Shaking",
  "Minification",
  "Compression",
  "Indexing",
  "Clustering",
  "Load Balancing",
  "Sharding",

  // 모니터링/로깅
  "Prometheus",
  "Grafana",
  "ELK Stack",
  "Datadog",
  "New Relic",
  "Sentry",
  "Winston",
  "Morgan",
  "Log4j",
  "Splunk",

  // 테스트/품질
  "Jest",
  "Mocha",
  "Chai",
  "Selenium",
  "Cypress",
  "JUnit",
  "PHPUnit",
  "SonarQube",
  "ESLint",
  "Prettier",

  // 한글 전문용어 추가
  "전자고지",
  "전자문서",
  "결제시스템",
  "통계시스템",
  "데이터베이스",
  "서버",
  "클라이언트",
  "프론트엔드",
  "백엔드",
  "웹소켓",
  "반응형",
  "대시보드",
  "모니터링",
  "파이프라인",
  "인프라",
  "아키텍처",
  "마이크로서비스",
  "컨테이너",
  "클라우드",
  "보안",
  "인증",
  "권한",
  "로깅",
  "캐싱",
];

// Pre-computed lookup structures for O(1) matching
export const properNounsSet = new Set(properNouns);
// Map from lowercase -> original proper noun
export const properNounsLowerMap = new Map<string, string>();
// Map from lowercase with separators stripped -> original proper noun
export const properNounsStrippedMap = new Map<string, string>();
for (const noun of properNouns) {
  const lower = noun.toLowerCase();
  if (!properNounsLowerMap.has(lower)) {
    properNounsLowerMap.set(lower, noun);
  }
  const stripped = noun.replace(/[-_.\s]+/g, "").toLowerCase();
  if (stripped !== lower && !properNounsStrippedMap.has(stripped)) {
    properNounsStrippedMap.set(stripped, noun);
  }
}

// Combined regex for word cleaning: special chars, camelCase split, separators to space, collapse spaces
export const cleanRegex = /[,.!?()[\]{}]|([a-z])([A-Z])|[-_.]/g;
export function cleanWord(word: string): string {
  return word
    .replace(cleanRegex, (match, lower, upper) => {
      if (lower && upper) return `${lower} ${upper}`; // camelCase split
      if (match === "-" || match === "_" || match === ".") return " "; // separators
      return ""; // special chars
    })
    .replace(/\s+/g, " ")
    .trim();
}
