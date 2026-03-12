import type { Post } from "@/types/post";
import { CONTACT } from "@/constants/contact";

/**
 * Creates the default experience post object used as initial state
 * before the real data is fetched from the API.
 */
export function createDefaultExperiencePost(t: (key: string) => string): Post {
  return {
    id: "experience",
    title: t("header.nav.work"),
    content: t("experience.content"),
    date: new Date().toISOString(),
    category: "about",
    tags: [],
    thumbnail: "/images/experience.jpg",
    translations: {
      ko: {
        title: t("header.nav.work"),
        description: t("header.nav.work"),
        content: `
<h2>${t("experience.title")}</h2>

<div class="table-wrapper">
  <table>
    <thead>
      <tr>
        <th>프로젝트명</th>
        <th>기간</th>
        <th>역할 및 기여도</th>
        <th>기술 스택</th>
        <th>주요 성과</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>국제 아웃소싱 데이터 크롤링 웹서비스</td>
        <td>2025-02 ~ 2025-03</td>
        <td>FullStack 기여도 100%</td>
        <td>FastAPI, Next.js, React Query, PostgreSQL</td>
        <td>
          <ul>
            <li>아웃소싱 플랫폼의 신규 프로젝트 실시간 DB 반영</li>
            <li>국가 간 임금 격차 해소 및 한국 개발자의 해외 진출 지원</li>
          </ul>
        </td>
      </tr>
      <tr>
        <td>사이니지 통합관제 플랫폼</td>
        <td>2024-12 ~ 2025-03</td>
        <td>FullStack 기여도 100%</td>
        <td>React Native (Expo), Socket, 음성인식 알고리즘</td>
        <td>
          <ul>
            <li>음성인식률 95% 달성</li>
            <li>기능 도달률 99%</li>
            <li>안드로이드 사이니지 클라이언트 개발</li>
            <li>초당 1만건 데이터 처리 기능 구현</li>
          </ul>
        </td>
      </tr>
      <!-- ... 나머지 프로젝트들도 같은 형식으로 추가 ... -->
    </tbody>
  </table>
</div>`,
        tocItems: [],
      },
      en: {
        title: "Work Experience",
        description: "Work Experience",
        content: `<h2>Experience</h2>
                  <h3>${t("experience.company")} (2022 - ${t(
          "common.experience.current"
        )})</h3>
                  <p>${t("profile.position")}</p>
                  <ul>
                    <li>${t("experience.skills.nextjs")}</li>
                    <li>${t("experience.skills.optimization")}</li>
                  </ul>
                  <h3>${t("experience.projectSection.title")}</h3>
                  <ul>
                    <li>${t("experience.projectSection.blog")}</li>
                    <li>${t("experience.projectSection.portfolio")}</li>
                  </ul>`,
        tocItems: [],
      },
    },
    imageHeights: {},
  };
}

export interface MenuItem {
  key: string;
  label: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
}

/**
 * Creates the header menu items configuration.
 */
export function createMenuItems(
  t: (key: string) => string,
  handlers: {
    onIntroClick: () => void;
    onWorkClick: () => void;
  }
): MenuItem[] {
  return [
    {
      key: "intro",
      label: t("header.nav.intro"),
      onClick: handlers.onIntroClick,
    },
    {
      key: "work",
      label: t("header.nav.work"),
      onClick: handlers.onWorkClick,
    },
    {
      key: "notion",
      label: t("header.nav.notion"),
      href: CONTACT.NOTION_URL,
      external: true,
    },
  ];
}
