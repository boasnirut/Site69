"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const PA_INTRO_HIDE_UNTIL_KEY = "pa-intro-hide-until";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function PaIntroPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hideForOneDay, setHideForOneDay] = useState(false);

  useEffect(() => {
    const hideUntil = Number(window.localStorage.getItem(PA_INTRO_HIDE_UNTIL_KEY) || "0");

    if (Number.isFinite(hideUntil) && hideUntil > Date.now()) {
      setIsOpen(false);
      return;
    }

    window.localStorage.removeItem(PA_INTRO_HIDE_UNTIL_KEY);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const enterPaSite = () => {
    if (hideForOneDay) {
      window.localStorage.setItem(PA_INTRO_HIDE_UNTIL_KEY, String(Date.now() + ONE_DAY_MS));
    }

    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="pa-intro-popup" role="dialog" aria-modal="true" aria-label="ภาพต้อนรับการประเมิน PA">
      <div className="pa-intro-popup__glow" aria-hidden="true" />
      <div className="pa-intro-popup__image-wrap">
        <img src="/RF.jpg" alt="ยินดีต้อนรับคณะกรรมการการประเมินผลการพัฒนางานตามข้อตกลง PA" />
      </div>
      <div className="pa-intro-popup__action">
        <label className="pa-intro-popup__snooze">
          <input
            type="checkbox"
            checked={hideForOneDay}
            onChange={(event) => setHideForOneDay(event.target.checked)}
          />
          <span>ไม่แสดงอีก 1 วัน</span>
        </label>
        <button type="button" onClick={enterPaSite}>
          <span>เข้าสู่เว็บไซต์ PA</span>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
