"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Info, X } from "lucide-react";

const assessmentNotes = [
  {
    level: "ระดับ 1",
    description: "ปฏิบัติได้ต่ำกว่าระดับฯที่คาดหวังมาก",
    tone: "red"
  },
  {
    level: "ระดับ 2",
    description: "ปฏิบัติได้ต่ำกว่าระดับฯที่คาดหวัง",
    tone: "yellow"
  },
  {
    level: "ระดับ 3",
    description: "ปฏิบัติได้ตามระดับฯที่คาดหวัง",
    tone: "blue"
  },
  {
    level: "ระดับ 4",
    description: "ปฏิบัติได้สูงกว่าระดับฯที่คาดหวัง",
    tone: "green"
  }
];

export function PaAssessmentInfoPopover() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const panelWidth = Math.min(340, window.innerWidth - 28);
      const panelHeight = panelRef.current?.offsetHeight || 320;
      const left = Math.min(
        Math.max(rect.right - panelWidth, 14),
        window.innerWidth - panelWidth - 14
      );
      const preferredTop = rect.bottom + 10;
      const top =
        preferredTop + panelHeight > window.innerHeight - 14
          ? Math.max(14, rect.top - panelHeight - 10)
          : preferredTop;

      setPosition({ top, left });
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || panelRef.current?.contains(target)) {
        return;
      }
      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="pa-assessment-popover__button"
        aria-label="ดูคำอธิบายระดับการประเมินตนเอง"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <Info aria-hidden="true" />
      </button>

      {isMounted && isOpen
        ? createPortal(
            <div
              ref={panelRef}
              className="pa-assessment-popover__panel"
              role="dialog"
              aria-label="คำอธิบายระดับผลการประเมินตนเอง"
              style={{ top: position.top, left: position.left }}
            >
              <div className="pa-assessment-popover__heading">
                <div>
                  <span>Assessment Level</span>
                  <strong>ระดับผลการประเมินตนเอง</strong>
                </div>
                <button
                  type="button"
                  className="pa-assessment-popover__close"
                  aria-label="ปิดคำอธิบาย"
                  onClick={() => setIsOpen(false)}
                >
                  <X aria-hidden="true" />
                </button>
              </div>
              <ul className="pa-assessment-popover__list">
                {assessmentNotes.map((item) => (
                  <li
                    key={item.level}
                    className={`pa-assessment-popover__item pa-assessment-popover__item--${item.tone}`}
                  >
                    <b>{item.level}</b>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
