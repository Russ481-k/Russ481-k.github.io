"use client";
import { useEffect, useState, useRef } from "react";
import "../Styles/side_index.scss";
import { FaCode } from "react-icons/fa";
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

// 고유명사 리스트 (계속 추가 가능)
const properNouns = [
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

// 기술 스택 아이콘 매핑
const techStackIcons: Record<string, JSX.Element> = {
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  React: <FaReact />,
  "Next.js": <SiNextdotjs />,
  "Node.js": <FaNode />,
  Redux: <SiRedux />,
  GraphQL: <SiGraphql />,
  MongoDB: <SiMongodb />,
  PostgreSQL: <SiPostgresql />,
  MySQL: <SiMysql />,
  Tailwind: <SiTailwindcss />,
  Jest: <SiJest />,
  Electron: <SiElectron />,
  Webpack: <SiWebpack />,
  Babel: <SiBabel />,
  Nginx: <SiNginx />,
  Jenkins: <SiJenkins />,
  Git: <FaGit />,
  GitHub: <FaGithub />,
  Docker: <FaDocker />,
  Kubernetes: <SiKubernetes />,
  AWS: <FaAws />,
  // 기본 아이콘들
  Database: <FaDatabase />, // DB 관련 기술들의 기본 아이콘
  Server: <FaServer />, // 서버 관련 기술들의 기본 아이콘
  Default: <BiCodeAlt />, // 기본 코드 아이콘
};

interface SideIndexProps {
  searchResults: string[];
  onKeywordSelect: (keyword: string) => void;
}

export const SideIndex = ({
  searchResults,
  onKeywordSelect,
}: SideIndexProps) => {
  const [keywords, setKeywords] = useState<
    Array<{ word: string; count: number; isTechStack: boolean }>
  >([]);
  const keywordListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchResults.length > 0) {
      // 단어 분리 로직 수정
      const words = searchResults
        .join(" ")
        .split(/[\s/,()[\]{}]+/)
        .map((word) => {
          // 기본 전처리
          const cleanedWord = word
            .replace(/[,.!?()[\]{}]/g, "") // 특수문자 제거
            .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase 분리
            .replace(/[-_.]/g, " ") // 하이픈, 언더스코어 공백으로 변경
            .replace(/\s+/g, " ") // 연속된 공백 제거
            .trim();

          // 한글 단어 처리
          if (/[\uAC00-\uD7AF]/.test(cleanedWord)) {
            return cleanedWord.length >= 2 ? cleanedWord : "";
          }

          // 영문 단어 처리
          if (cleanedWord.length > 1 && !/^\d+$/.test(cleanedWord)) {
            // 기술 스택 용어 처리
            const upperWord = cleanedWord.toUpperCase();
            if (properNouns.includes(upperWord)) {
              return upperWord;
            }

            const capitalizedWord =
              cleanedWord.charAt(0).toUpperCase() +
              cleanedWord.slice(1).toLowerCase();
            if (properNouns.includes(capitalizedWord)) {
              return capitalizedWord;
            }
          }

          return cleanedWord;
        })
        .flatMap((word) => word.split(" ")) // 공백으로 분리된 단어들을 평탄화
        .filter((word) => {
          // 빈 문자열 제거 및 숫자만으로 이루어진 단어 제거
          return word && word.length > 1 && !/^\d+$/.test(word);
        });

      // 단어 빈도수 계산
      const wordCounts = words.reduce(
        (acc: Record<string, number>, word: string) => {
          // 기술 스택 용어 매칭
          if (properNouns.includes(word)) {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
          }

          const properNoun = properNouns.find(
            (noun) =>
              noun.toLowerCase() === word?.toLowerCase() ||
              noun.replace(/[-_.]/g, "").toLowerCase() ===
                word?.toLowerCase() ||
              noun.replace(/\s+/g, "").toLowerCase() === word?.toLowerCase()
          );

          if (properNoun) {
            acc[properNoun] = (acc[properNoun] || 0) + 1;
            return acc;
          }

          // 일반 단어도 카운트
          const normalizedWord = word.length > 2 ? word : word.toUpperCase();
          acc[normalizedWord] = (acc[normalizedWord] || 0) + 1;
          return acc;
        },
        {}
      );

      // 빈도수로 정렬하고 불용어(중요하지 않은 단어) 필터링
      const sortedKeywords = Object.entries(wordCounts)
        .map(([word, count]) => ({
          word,
          count,
          isTechStack: properNouns.includes(word),
        }))
        .sort((a, b) => {
          if (a.isTechStack && !b.isTechStack) return -1;
          if (!a.isTechStack && b.isTechStack) return 1;
          return b.count - a.count;
        })
        .slice(0, 30);

      setKeywords(sortedKeywords);
    }
  }, [searchResults]);

  const renderKeywords = () => {
    return keywords.map(({ word, count, isTechStack }) => (
      <div
        key={word}
        className={`keyword_item ${isTechStack ? "tech_stack" : ""}`}
        onClick={() => onKeywordSelect(word)}
      >
        <span className="word">
          {isTechStack && (
            <span className="tech_icon">
              {techStackIcons[word] || techStackIcons.Default}
            </span>
          )}
          {word}
        </span>
        <span className="count">{count}</span>
      </div>
    ));
  };

  return (
    <div className="side_index">
      <div className="contents">
        <h3>Keywords</h3>
        <div className="keyword_list" ref={keywordListRef}>
          <div className="keywords_container">
            {renderKeywords()}
            {renderKeywords()} {/* 키워드 리스트 복제 */}
          </div>
        </div>
      </div>
    </div>
  );
};
