"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

export type AchievementCardData = {
  id: number;
  imgUrl: string;
  title: string;
  content: string;
};

type AchievementCarouselProps = {
  cards: AchievementCardData[];
  cardsPerView?: number;
};

export function AchievementCarousel({ cards, cardsPerView = 3 }: AchievementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const safeCardsPerView = Math.max(1, Math.min(cardsPerView, cards.length || 1));
  const isSingleCard = cards.length === 1;
  const cardWidth = 100 / (safeCardsPerView + 1);

  useEffect(() => {
    setCurrentIndex(0);
  }, [cards]);

  const visibleCards = useMemo(() => {
    if (!cards.length) return [];
    if (cards.length <= safeCardsPerView) return cards;

    return Array.from({ length: safeCardsPerView + 1 }, (_, index) => cards[(currentIndex + index) % cards.length]);
  }, [cards, currentIndex, safeCardsPerView]);

  const moveNext = () => {
    if (isAnimating || cards.length <= safeCardsPerView) return;
    setIsAnimating(true);

    if (containerRef.current) {
      containerRef.current.style.transition = "transform 520ms ease";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
    }

    window.setTimeout(() => {
      setCurrentIndex((current) => (current + 1) % cards.length);
      if (containerRef.current) {
        containerRef.current.style.transition = "none";
        containerRef.current.style.transform = "translateX(0)";
        void containerRef.current.offsetWidth;
      }
      setIsAnimating(false);
    }, 520);
  };

  const movePrevious = () => {
    if (isAnimating || cards.length <= safeCardsPerView) return;
    setIsAnimating(true);

    if (containerRef.current) {
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${cardWidth}%)`;
    }

    setCurrentIndex((current) => (current - 1 + cards.length) % cards.length);

    window.setTimeout(() => {
      if (containerRef.current) {
        void containerRef.current.offsetWidth;
        containerRef.current.style.transition = "transform 520ms ease";
        containerRef.current.style.transform = "translateX(0)";
      }
    }, 20);

    window.setTimeout(() => setIsAnimating(false), 540);
  };

  if (!cards.length) {
    return null;
  }

  return (
    <div className={isSingleCard ? "achievement-carousel single" : "achievement-carousel"}>
      {cards.length > safeCardsPerView ? (
        <>
          <button className="achievement-carousel-control previous" type="button" onClick={movePrevious} disabled={isAnimating} aria-label="ภาพก่อนหน้า">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button className="achievement-carousel-control next" type="button" onClick={moveNext} disabled={isAnimating} aria-label="ภาพถัดไป">
            <ChevronRight aria-hidden="true" />
          </button>
        </>
      ) : null}

      <div className="achievement-carousel-window">
        <div
          className="achievement-carousel-track"
          ref={containerRef}
          style={{
            transform: "translateX(0)",
            width: cards.length > safeCardsPerView ? `${((safeCardsPerView + 1) * 100) / safeCardsPerView}%` : "100%"
          }}
        >
          {visibleCards.map((card, index) => (
            <article
              className="achievement-image-card"
              key={`${card.id}-${currentIndex}-${index}`}
              style={{
                "--card-width": cards.length > safeCardsPerView ? `${100 / (safeCardsPerView + 1)}%` : `${100 / Math.min(safeCardsPerView, cards.length)}%`
              } as CSSProperties}
            >
              <div className="achievement-card-inner">
                <img src={card.imgUrl} alt={card.title} />
                <div className="achievement-card-overlay">
                  <Images aria-hidden="true" />
                  <h3>{card.title}</h3>
                  <p>{card.content}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
