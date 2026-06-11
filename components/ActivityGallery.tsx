"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from "lucide-react";
import { activityGallery } from "@/lib/site-data";

type GalleryItem = (typeof activityGallery)[number] & {
  images?: string[];
};

export function ActivityGallery() {
  const [indices, setIndices] = useState<Record<string, number>>({});
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const gallery = useMemo(
    () =>
      activityGallery.map((item) => ({
        ...item,
        images: (item as GalleryItem).images?.length ? (item as GalleryItem).images : [item.image]
      })),
    []
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndices((current) => {
        const next = { ...current };
        gallery.forEach((item) => {
          next[item.title] = ((current[item.title] || 0) + 1) % item.images.length;
        });
        return next;
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [gallery]);

  const moveCard = (item: GalleryItem, direction: number) => {
    setIndices((current) => {
      const images = item.images?.length ? item.images : [item.image];
      const currentIndex = current[item.title] || 0;
      return {
        ...current,
        [item.title]: (currentIndex + direction + images.length) % images.length
      };
    });
  };

  const openModal = (item: GalleryItem, imageIndex = 0) => {
    setSelected(item);
    setSelectedIndex(imageIndex);
    setZoomed(false);
  };

  const modalImages = selected?.images?.length ? selected.images : selected ? [selected.image] : [];

  const moveModal = (direction: number) => {
    setSelectedIndex((current) => (current + direction + modalImages.length) % modalImages.length);
    setZoomed(false);
  };

  return (
    <>
      <section className="section-block">
        <div className="section-heading">
          <span className="eyebrow">Activity Gallery</span>
          <h2>คลังภาพกิจกรรมการเรียนรู้</h2>
          <p>แต่ละกิจกรรมรองรับหลายภาพ สไลด์อัตโนมัติทุก 5 วินาที และคลิกเพื่อดูภาพทั้งหมดแบบขยายได้</p>
        </div>

        <div className="activity-grid gallery-slider-grid">
          {gallery.map((item) => {
            const images = item.images;
            const activeIndex = indices[item.title] || 0;

            return (
              <article className="activity-card gallery-slider-card" key={item.title} onClick={() => openModal(item, activeIndex)}>
                <div className="gallery-card-media">
                  <img src={images[activeIndex]} alt={item.title} />
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
                </div>
                <div>
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <button
                    className="gallery-open-button"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openModal(item, activeIndex);
                    }}
                  >
                    ดูภาพทั้งหมด
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {selected ? (
        <div className="gallery-modal-backdrop" role="dialog" aria-modal="true" aria-label={selected.title}>
          <div className="gallery-modal">
            <div className="gallery-modal-head">
              <div>
                <span>{selected.category}</span>
                <h3>{selected.title}</h3>
              </div>
              <button aria-label="ปิด" type="button" onClick={() => setSelected(null)}>
                <X aria-hidden="true" />
              </button>
            </div>

            <div className={zoomed ? "gallery-modal-image zoomed" : "gallery-modal-image"}>
              <button aria-label="ภาพก่อนหน้า" type="button" onClick={() => moveModal(-1)}>
                <ChevronLeft aria-hidden="true" />
              </button>
              <img src={modalImages[selectedIndex]} alt={`${selected.title} ${selectedIndex + 1}`} />
              <button aria-label="ภาพถัดไป" type="button" onClick={() => moveModal(1)}>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>

            <div className="gallery-modal-tools">
              <button type="button" onClick={() => setZoomed((value) => !value)}>
                {zoomed ? <Minimize2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
                {zoomed ? "ย่อภาพ" : "ซูมภาพ"}
              </button>
              <strong>{selectedIndex + 1}/{modalImages.length}</strong>
            </div>

            <div className="gallery-thumbs">
              {modalImages.map((image, index) => (
                <button
                  className={index === selectedIndex ? "active" : ""}
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setSelectedIndex(index);
                    setZoomed(false);
                  }}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
