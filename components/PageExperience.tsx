"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Check, X } from "lucide-react";

type NoticeKind = "success" | "error";

type Notice = {
  kind: NoticeKind;
  text: string;
};

export function PageExperience() {
  const pathname = usePathname();
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showSplash, setShowSplash] = useState(true);
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setShowSplash(false), 1450);
    return () => window.clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const showNotice = (nextNotice: Notice, duration = 1200) => {
      if (noticeTimer.current) {
        clearTimeout(noticeTimer.current);
      }
      setNotice(nextNotice);
      noticeTimer.current = setTimeout(() => setNotice(null), duration);
    };

    const handleSiteNotice = (event: Event) => {
      const detail = (event as CustomEvent<Partial<Notice>>).detail;
      if (detail?.kind && detail.text) {
        showNotice({ kind: detail.kind, text: detail.text });
      }
    };

    window.addEventListener("site-notice", handleSiteNotice);
    return () => {
      window.removeEventListener("site-notice", handleSiteNotice);
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
          <div className="action-notice-card">
            <span className="action-notice-icon" aria-hidden="true">
              {notice.kind === "success" ? <Check /> : <X />}
            </span>
            <strong>{notice.text}</strong>
            <small>Nirut Sewana Digital Learning</small>
          </div>
        </div>
      ) : null}
    </>
  );
}
