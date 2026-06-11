"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type NoticeKind = "route" | "action" | "done";

type Notice = {
  kind: NoticeKind;
  text: string;
};

export function PageExperience() {
  const pathname = usePathname();
  const previousPath = useRef<string | null>(null);
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), 1450);
    return () => window.clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (previousPath.current && previousPath.current !== pathname) {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
      setNotice({ kind: "done", text: "เปิดหน้าเรียบร้อย" });
      noticeTimer.current = setTimeout(() => setNotice(null), 850);
    }
    previousPath.current = pathname;
  }, [pathname]);

  useEffect(() => {
    const showNotice = (nextNotice: Notice, duration = 950) => {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
      setNotice(nextNotice);
      noticeTimer.current = setTimeout(() => setNotice(null), duration);
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a[href]");
      if (link instanceof HTMLAnchorElement) {
        if (link.target || link.hasAttribute("download")) {
          return;
        }

        const url = new URL(link.href, window.location.href);
        const sameOrigin = url.origin === window.location.origin;
        const samePath = url.pathname === window.location.pathname && url.hash === window.location.hash;

        if (sameOrigin && !samePath) {
          showNotice({ kind: "route", text: "กำลังเปลี่ยนหน้า" }, 1800);
          return;
        }
      }

      if (target.closest("button, [role='button']")) {
        showNotice({ kind: "action", text: "กำลังดำเนินการ" });
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
    };
  }, []);

  return (
    <>
      <div className="page-load-notification" role="status" aria-live="polite" key={pathname}>
        <div className="mini-loader-card">
          <div className="mini-loader-orbit" aria-hidden="true" />
          <img src="/8045-transparent.png" alt="" />
          <strong>กำลังโหลดหน้าเว็บ</strong>
          <small>Nirut Sewana Digital Learning</small>
        </div>
      </div>

      {showSplash ? (
        <div className="site-splash" role="status" aria-label="กำลังโหลดเว็บไซต์">
          <div className="splash-orbit" aria-hidden="true" />
          <img src="/8045-transparent.png" alt="" />
          <span>Loading Nirut Sewana</span>
        </div>
      ) : null}

      {notice ? (
        <div className={`route-notification ${notice.kind}`} role="status" aria-live="polite">
          <div className="mini-loader-card">
            <div className="mini-loader-orbit" aria-hidden="true" />
            <img src="/8045-transparent.png" alt="" />
            <strong>{notice.text}</strong>
            <small>Nirut Sewana Digital Learning</small>
          </div>
        </div>
      ) : null}
    </>
  );
}
