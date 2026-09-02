"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X, FileText, ZoomIn, ZoomOut, RotateCcw, Link2 } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type PaEvidenceKind = "image" | "pdf" | "link";
type PaEvidenceInput =
  | string
  | {
      type?: PaEvidenceKind;
      title?: string;
      url?: string;
    };

type NormalizedEvidence = {
  type: PaEvidenceKind;
  title: string;
  url: string;
};

type PaEvidenceGalleryProps = {
  images: PaEvidenceInput[];
  title: string;
};

export function PaEvidenceGallery({ images, title }: PaEvidenceGalleryProps) {
  const [selected, setSelected] = useState<NormalizedEvidence | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDocument = (url: string) => {
    if (!url) return false;
    const lowerUrl = url.toLowerCase();
    return lowerUrl.endsWith('.pdf') || lowerUrl.includes('drive.google.com/file/d/');
  };

  const isImage = (url: string) => {
    if (!url) return false;
    return /\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/i.test(url);
  };

  const isLinkOnly = (url: string) => Boolean(url) && !isDocument(url) && !isImage(url);

  const inferType = (url: string, type?: PaEvidenceKind): PaEvidenceKind => {
    if (type) return type;
    if (isDocument(url)) return "pdf";
    if (isImage(url)) return "image";
    return "link";
  };

  const getDefaultTitle = (url: string, index: number) => {
    const cleanUrl = url.split("?")[0].replace(/\/$/, "");
    const name = decodeURIComponent(cleanUrl.split("/").pop() || "");
    return name || `หลักฐานที่ ${index + 1}`;
  };

  const evidenceItems = useMemo(
    () =>
      images
        .map((item, index) => {
          const rawUrl = typeof item === "string" ? item : item.url || "";
          const url = rawUrl.trim();
          if (!url) return null;

          const rawTitle = typeof item === "string" ? "" : item.title || "";
          return {
            type: inferType(url, typeof item === "string" ? undefined : item.type),
            title: rawTitle.trim() || getDefaultTitle(url, index),
            url
          };
        })
        .filter((item): item is NormalizedEvidence => Boolean(item)),
    [images]
  );

  const previewItems = evidenceItems.filter((item) => item.type !== "link");
  const linkItems = evidenceItems.filter((item) => item.type === "link");

  const getIframeUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      return url.replace(/\/view.*$/, '/preview');
    }
    return url;
  };

  const modal = selected ? (
    <div className="pa-gallery-modal" onClick={() => setSelected(null)} role="dialog" aria-modal="true">
      <button
        className="pa-gallery-modal__close"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setSelected(null);
        }}
        aria-label="ปิดหน้าต่างดูหลักฐาน"
      >
        <X className="w-6 h-6" />
      </button>

      {selected.type === "pdf" ? (
        <div className="pa-gallery-modal__document" onClick={(event) => event.stopPropagation()}>
          <div className="pa-gallery-modal__bar">
            <FileText aria-hidden="true" />
            <strong>{selected.title}</strong>
          </div>
          <iframe src={getIframeUrl(selected.url)} title={selected.title} allow="autoplay" />
        </div>
      ) : (
        <div className="pa-gallery-modal__stage" onClick={(event) => event.stopPropagation()}>
          <TransformWrapper
            initialScale={1}
            minScale={0.8}
            maxScale={4}
            centerOnInit={true}
            centerZoomedOut={true}
            wheel={{ step: 0.04 }}
            panning={{ velocityDisabled: false }}
            doubleClick={{ step: 0.5 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                <div className="pa-gallery-modal__tools">
                  <button type="button" onClick={() => zoomOut()} title="ซูมออก">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => resetTransform()} title="คืนค่าเดิม">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                  <button type="button" onClick={() => zoomIn()} title="ซูมเข้า">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                </div>
                <TransformComponent
                  wrapperStyle={{ width: "100vw", height: "100vh" }}
                  contentStyle={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <img src={selected.url} alt={selected.title || title} className="pa-gallery-modal__image" />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      )}
    </div>
  ) : null;

  return (
    <>
      {previewItems.length ? (
        <div className="pa-evidence-gallery" aria-label={`ภาพหลักฐาน ${title}`}>
          {previewItems.map((item, index) => (
            <button
              className={`pa-evidence-card pa-evidence-card--${item.type}`}
              key={`${title}-${item.url}-${index}`}
              type="button"
              onClick={() => setSelected(item)}
            >
              {item.type === "pdf" ? (
              <div className="pa-evidence-pdf-preview">
                <iframe
                  src={`${getIframeUrl(item.url)}#toolbar=0&navpanes=0&scrollbar=0`}
                  title={`${title} ${index + 1}`}
                />
                <FileText aria-hidden="true" />
              </div>
              ) : (
                <img src={item.url} alt={item.title || `${title} ภาพที่ ${index + 1}`} />
              )}
              <span>
                <Maximize2 aria-hidden="true" />
                {item.type === "pdf" ? item.title || "เปิดเอกสาร" : "ดูภาพ"}
              </span>
            </button>
          ))}
        </div>
      ) : null}

      {linkItems.length ? (
        <div className="pa-evidence-links" aria-label={`ลิงก์หลักฐาน ${title}`}>
          {linkItems.map((item, index) => (
            <a key={`${title}-link-${item.url}-${index}`} href={item.url} target="_blank" rel="noreferrer">
              <Link2 aria-hidden="true" />
              <span>{item.title || "เปิดลิงก์หลักฐาน"}</span>
            </a>
          ))}
        </div>
      ) : null}

      {isMounted && modal ? createPortal(modal, document.body) : null}
    </>
  );
}
