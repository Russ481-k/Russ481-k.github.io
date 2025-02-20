import { useTranslation } from "react-i18next";

export const useCategories = () => {
  const { t } = useTranslation();

  return [
    {
      id: "all",
      name: t("categories.all"),
      description: "View all posts",
    },
    {
      id: "projects",
      name: t("categories.projects"),
      description: "Project portfolio",
    },
    {
      id: "about",
      name: t("categories.about"),
      description: "Developer introduction",
    },
    {
      id: "career",
      name: t("categories.career"),
      description: "Work experience",
    },
    {
      id: "architecture",
      name: t("categories.architecture"),
      description: "System architecture",
    },
    {
      id: "database",
      name: t("categories.database"),
      description: "Database design",
    },
    {
      id: "frontend",
      name: t("categories.frontend"),
      description: "Frontend development",
    },
    {
      id: "backend",
      name: t("categories.backend"),
      description: "Backend development",
    },
  ];
};
