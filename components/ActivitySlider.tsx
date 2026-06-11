"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Images } from "lucide-react";
import { activityGallery } from "@/lib/site-data";

type ActivitySliderProps = {
  variant?: "home" | "page";
};

export function ActivitySlider({ variant = "home" }: ActivitySliderProps) {
  const [activeIndex, setActiveIndex] = useState(Math.min(4, activityGallery.length - 1));
  const isPage = variant === "page";

  return (
    <section className={isPage ? "section-block activity-accordion-section page" : "section-block activity-accordion-section"}>
      <div className="activity-accordion-heading">
        <div>
          <span className="eyebrow">Activity Gallery</span>
          <h2>{isPage ? "คลังภาพกิจกรรมการเรียนรู้" : "ภาพกิจกรรมการเรียนรู้"}</h2>
          <p>
            สไลด์ภาพแบบ accordion ใช้ข้อมูลชุดเดียวกับหน้าภาพกิจกรรม แก้ไขรายการครั้งเดียวแล้วแสดงผลร่วมกันทั้งหน้าแรกและหน้ารวม
          </p>
        </div>
        {!isPage ? (
          <Link className="button secondary dark" href="/activities">
            <Images aria-hidden="true" />
            ดูภาพกิจกรรมทั้งหมด
          </Link>
        ) : null}
      </div>

      <div className="activity-accordion" aria-label="สไลด์ภาพกิจกรรมแบบ accordion">
        {activityGallery.map((item, index) => {
          const active = index === activeIndex;
          const className = active ? "activity-accordion-item active" : "activity-accordion-item";
          const panelContent = (
            <span className="activity-accordion-inner">
              <img src={item.image} alt={item.title} />
              <div className="activity-accordion-overlay" />
              <div className="activity-accordion-caption">
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
              <div className="activity-accordion-label">
                <strong>{item.title}</strong>
              </div>
              {!isPage ? <ArrowRight className="activity-accordion-arrow" aria-hidden="true" /> : null}
            </span>
          );

          if (isPage) {
            return (
              <article
                className={className}
                key={item.title}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                tabIndex={0}
              >
                {panelContent}
              </article>
            );
          }

          return (
            <Link
              className={className}
              href="/activities"
              key={item.title}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              {panelContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
