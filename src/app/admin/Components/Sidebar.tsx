"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Link href="/admin">Admin</Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link
              href="/admin"
              className={pathname === "/admin" ? styles.active : ""}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/admin/posts"
              className={isActive("/admin/posts") ? styles.active : ""}
            >
              Posts
            </Link>
          </li>
          <li>
            <Link href="/" target="_blank">
              View Site
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
