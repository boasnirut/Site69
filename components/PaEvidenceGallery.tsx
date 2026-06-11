"use client";

import { useState } from "react";
import { Maximize2, X } from "lucide-react";

type PaEvidenceGalleryProps = {
  images: string[];
  title: string;
};

export function PaEvidenceGallery({ images, title }: PaEvidenceGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const visibleImages = images.slice(0, 3);

  return (
    <>
      <div className="pa-evidence-gallery" aria-label={`ภาพหลักฐาน ${title}`}>
        {visibleImages.map((image, index) => (
          <button key={`${title}-${image}-${index}`} type="button" onClick={() => setSelected(image)}>
            <img src={image} alt={`${title} ภาพที่ ${index + 1}`} />
            <span>
              <Maximize2 aria-hidden="true" />
              ดูภาพ
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="gallery-modal-backdrop" role="dialog" aria-modal="true" aria-label={title}>
          <div className="gallery-modal pa-image-modal">
            <div className="gallery-modal-head">
              <div>
                <span>PA Evidence</span>
                <h3>{title}</h3>
              </div>
              <button aria-label="ปิด" type="button" onClick={() => setSelected(null)}>
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="gallery-modal-image">
              <img src={selected} alt={title} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
