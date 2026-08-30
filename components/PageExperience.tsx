"use client";

import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";

type NoticeKind = "success" | "error";

type Notice = {
  kind: NoticeKind;
  text: string;
};

export function PageExperience() {
  const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

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
