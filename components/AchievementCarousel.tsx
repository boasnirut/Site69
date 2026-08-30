"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Images, X, ZoomIn, ZoomOut, RotateCcw, FileText, ExternalLink } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export type AchievementCardData = {
  id: number;
  imgUrl: string;
  title: string;
  content: string;
};

type AchievementCarouselProps = {
  cards: AchievementCardData[];
  cardsPerView?: number;
  isA4?: boolean;
};

const isDocument = (url: string) => {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.endsWith('.pdf') || lowerUrl.includes('drive.google.com/file/d/');
};

const getIframeUrl = (url: string) => {
  if (url.includes('drive.google.com/file/d/')) {
    return url.replace(/\/view.*$/, '/preview');
  }
  return url;
};

export function AchievementCarousel({ cards, cardsPerView = 3, isA4 = false }: AchievementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
              className={`achievement-image-card ${isA4 ? 'a4-ratio' : ''}`}
              key={`${card.id}-${currentIndex}-${index}`}
              style={{
                "--card-width": cards.length > safeCardsPerView ? `${100 / (safeCardsPerView + 1)}%` : `${100 / Math.min(safeCardsPerView, cards.length)}%`
              } as CSSProperties}
            >
              <div 
                className="achievement-card-inner cursor-pointer"
                onClick={() => setSelectedImage(card.imgUrl)}
              >
                {isDocument(card.imgUrl) ? (
                  <div className="w-full h-full relative overflow-hidden bg-white/5 flex items-center justify-center">
                    <iframe
                      src={`${getIframeUrl(card.imgUrl)}#toolbar=0&navpanes=0&scrollbar=0`}
                      className="w-full h-full border-none pointer-events-none select-none object-cover"
                      title={card.title}
                    />
                    <div className="absolute inset-0 bg-transparent" />
                  </div>
                ) : (
                  <img src={card.imgUrl} alt={card.title} />
                )}
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

      {/* Universal Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/92 flex flex-col items-center justify-between p-2 md:p-6 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          {/* Top Header Bar */}
          <div 
            className="w-full max-w-6xl flex items-center justify-between z-[120] py-2.5 px-4 bg-black/70 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl mb-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-white/90 font-medium text-sm">
              <FileText className="w-4 h-4 text-orange-400" />
              <span>{isDocument(selectedImage) ? "เอกสารแนบ (PDF / Drive)" : "รูปภาพประกอบ"}</span>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <a
                href={selectedImage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white/80 bg-white/10 hover:bg-white/20 hover:text-white transition-all border border-white/10"
                title="เปิดไฟล์ในหน้าต่างใหม่"
              >
                <span>เปิดในหน้าใหม่</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button 
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl p-1.5 transition-colors"
                onClick={() => setSelectedImage(null)}
                title="ปิด"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Main Viewer Body */}
          <div 
            className="relative w-full flex-1 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {isDocument(selectedImage) ? (
              <div className="w-full max-w-6xl h-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <iframe 
                  src={getIframeUrl(selectedImage)} 
                  className="w-full h-full border-none"
                  title="Document Viewer"
                  allow="autoplay"
                />
              </div>
            ) : (
              <TransformWrapper
                initialScale={1}
                minScale={0.8}
                maxScale={5}
                centerOnInit={true}
                centerZoomedOut={true}
                wheel={{ step: 0.05 }}
                panning={{ velocityDisabled: false }}
                doubleClick={{ step: 0.5 }}
              >
                {({ zoomIn, zoomOut, resetTransform, state }) => (
                  <>
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-[110] bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-2xl">
                      <button 
                        className="text-white/80 hover:text-orange-400 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
                        onClick={() => zoomOut()}
                        title="ซูมออก"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="text-white text-xs font-mono px-1 min-w-[42px] text-center">
                        {Math.round((state?.scale || 1) * 100)}%
                      </span>
                      <button 
                        className="text-white/80 hover:text-orange-400 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
                        onClick={() => zoomIn()}
                        title="ซูมเข้า"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <div className="w-px h-4 bg-white/20 mx-1" />
                      <button 
                        className="text-white/80 hover:text-orange-400 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
                        onClick={() => resetTransform()}
                        title="คืนค่าเดิม"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>

                    <TransformComponent
                      wrapperStyle={{ width: "100%", height: "100%" }}
                      contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                      <img 
                        src={selectedImage} 
                        alt="Expanded view" 
                        className="max-h-[82vh] max-w-[90vw] object-contain rounded-xl shadow-2xl cursor-grab active:cursor-grabbing select-none"
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
