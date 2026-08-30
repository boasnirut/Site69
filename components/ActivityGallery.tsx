"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X, FileText, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type GalleryItem = {
  id?: string;
  title: string;
  category?: string;
  image?: string;
  imgUrl?: string;
  images?: string[];
  albumUrl?: string;
  detail: string;
};

export function ActivityGallery({ 
  initialActivities, 
  hideHeading = false 
}: { 
  initialActivities: any[]; 
  hideHeading?: boolean; 
}) {
  const [indices, setIndices] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<GalleryItem | null>(null);

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

  const gallery = useMemo(
    () =>
      initialActivities.map((item) => ({
        ...item,
        images: item.images?.length ? item.images : [item.image || item.imgUrl || "/placeholder-activity-student-development.jpg"]
      })),
    [initialActivities]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndices((current) => {
        const next = { ...current };
        gallery.forEach((item) => {
          if (item.images && item.images.length > 1) {
            next[item.title] = ((current[item.title] || 0) + 1) % item.images.length;
          }
        });
        return next;
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [gallery]);

  const moveCard = (item: GalleryItem, direction: number) => {
    setIndices((current) => {
      const images = item.images?.length ? item.images : [item.image || item.imgUrl || ""];
      const currentIndex = current[item.title] || 0;
      return {
        ...current,
        [item.title]: (currentIndex + direction + images.length) % images.length
      };
    });
  };

  return (
    <>
      {!hideHeading && (
        <div className="section-heading text-left flex flex-col items-start mb-6">
          <span className="eyebrow">Activity Gallery</span>
          <h2 className="text-left">คลังภาพกิจกรรมการเรียนรู้</h2>
        </div>
      )}

      <div className="activity-grid gallery-slider-grid">
          {gallery.map((item) => {
            const images = item.images;
            const activeIndex = indices[item.title] || 0;
            const currentImg = images[activeIndex] || item.image || item.imgUrl;

            return (
              <article 
                className="activity-card gallery-slider-card cursor-pointer" 
                key={item.id || item.title} 
                onClick={() => setSelected(item)}
              >
                <div className="gallery-card-media aspect-[4/3]">
                  {isDocument(currentImg) ? (
                    <div className="w-full h-full bg-black/40 flex flex-col items-center justify-center text-white/70 min-h-[200px]">
                      <FileText className="w-12 h-12 mb-2 opacity-50" />
                      <span className="font-medium text-xs">เอกสาร</span>
                    </div>
                  ) : (
                    <img src={currentImg} alt={item.title} />
                  )}

                  {images.length > 1 && (
                    <>
                      <div className="gallery-card-controls">
                        <button
                          aria-label="ภาพก่อนหน้า"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            moveCard(item, -1);
                          }}
                        >
                          <ChevronLeft aria-hidden="true" />
                        </button>
                        <button
                          aria-label="ภาพถัดไป"
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            moveCard(item, 1);
                          }}
                        >
                          <ChevronRight aria-hidden="true" />
                        </button>
                      </div>
                      <span className="gallery-count">{activeIndex + 1}/{images.length}</span>
                    </>
                  )}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  
                  {item.albumUrl ? (
                    <a
                      href={item.albumUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 mt-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md transition-all border border-white/20"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <span>เปิดอัลบั้ม Google Photos</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      className="gallery-open-button"
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelected(item);
                      }}
                    >
                      ดูภาพขยาย
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

      {selected ? (
        <div className="gallery-modal-backdrop" role="dialog" aria-modal="true" aria-label={selected.title}>
          <div className="gallery-modal">
            <div className="gallery-modal-head">
              <div>
                <h3>{selected.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                {selected.albumUrl && (
                  <a
                    href={selected.albumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md transition-all border border-white/20"
                  >
                    <span>Google Photos</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <button aria-label="ปิด" type="button" onClick={() => setSelected(null)}>
                  <X aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="relative w-full h-[75vh] flex items-center justify-center overflow-hidden bg-black/60 rounded-xl">
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
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-50 bg-black/75 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 shadow-2xl">
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
                      {isDocument(selected.image || selected.imgUrl || "") ? (
                        <div className="w-full h-full max-w-5xl bg-white rounded-lg overflow-hidden shadow-2xl border border-white/20">
                          <iframe 
                            src={getIframeUrl(selected.image || selected.imgUrl || "")} 
                            className="w-full h-full border-none"
                            title="Document Viewer"
                            allow="autoplay"
                          />
                        </div>
                      ) : (
                        <img 
                          src={selected.image || selected.imgUrl || "/placeholder-activity-student-development.jpg"} 
                          alt={selected.title} 
                          className="max-h-[72vh] max-w-[88vw] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing select-none"
                        />
                      )}
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
