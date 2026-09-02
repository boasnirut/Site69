"use client";

import { useState } from "react";
import { Maximize2, X, FileText, ZoomIn, ZoomOut, RotateCcw, Link2 } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type PaEvidenceGalleryProps = {
  images: string[];
  title: string;
};

export function PaEvidenceGallery({ images, title }: PaEvidenceGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const visibleImages = images.slice(0, 3);

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

  const getIframeUrl = (url: string) => {
    if (url.includes('drive.google.com/file/d/')) {
      return url.replace(/\/view.*$/, '/preview');
    }
    return url;
  };

  return (
    <>
      <div className="pa-evidence-gallery" aria-label={`ภาพหลักฐาน ${title}`}>
        {visibleImages.map((image, index) => (
          <button key={`${title}-${image}-${index}`} type="button" onClick={() => setSelected(image)}>
            {isDocument(image) ? (
              <div className="w-full h-full relative overflow-hidden bg-white/5 flex items-center justify-center min-h-[160px] rounded-lg">
                <iframe
                  src={`${getIframeUrl(image)}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full border-none pointer-events-none select-none object-cover"
                  title={`${title} ${index + 1}`}
                />
                <div className="absolute inset-0 bg-transparent" />
              </div>
            ) : isLinkOnly(image) ? (
              <div className="pa-evidence-link-preview">
                <Link2 aria-hidden="true" />
                <strong>ลิงก์อ้างอิง</strong>
                <small>{image}</small>
              </div>
            ) : (
              <img src={image} alt={`${title} ภาพที่ ${index + 1}`} />
            )}
            <span>
              {isLinkOnly(image) ? <Link2 aria-hidden="true" /> : <Maximize2 aria-hidden="true" />}
              {isDocument(image) ? "เปิดเอกสาร" : isLinkOnly(image) ? "เปิดลิงก์" : "ดูภาพ"}
            </span>
          </button>
        ))}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <button 
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/50 rounded-full p-2 z-50"
            onClick={(e) => { e.stopPropagation(); setSelected(null); }}
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="fixed inset-0 w-full h-full" onClick={(e) => e.stopPropagation()}>
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
                  <div className="absolute bottom-6 right-6 flex items-center gap-2 z-[110] bg-black/70 backdrop-blur-md p-2 rounded-full border border-white/10 shadow-2xl">
                    <button 
                      className="text-white hover:text-orange-400 bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all"
                      onClick={() => zoomOut()}
                      title="ซูมออก"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button 
                      className="text-white hover:text-orange-400 bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all"
                      onClick={() => resetTransform()}
                      title="คืนค่าเดิม"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button 
                      className="text-white hover:text-orange-400 bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-all"
                      onClick={() => zoomIn()}
                      title="ซูมเข้า"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                  </div>
                  <TransformComponent
                    wrapperStyle={{ width: "100vw", height: "100vh" }}
                    contentStyle={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {isDocument(selected) ? (
                      <div className="w-[85vw] max-w-5xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl border border-white/20 cursor-grab active:cursor-grabbing">
                        <iframe 
                          src={getIframeUrl(selected)} 
                          className="w-full h-full border-none"
                          title="Document Viewer"
                          allow="autoplay"
                        />
                      </div>
                    ) : isLinkOnly(selected) ? (
                      <div className="pa-evidence-link-modal">
                        <Link2 aria-hidden="true" />
                        <strong>เปิดหลักฐานอ้างอิงจากลิงก์</strong>
                        <p>{selected}</p>
                        <a href={selected} target="_blank" rel="noreferrer">
                          เปิดลิงก์ในแท็บใหม่
                        </a>
                      </div>
                    ) : (
                      <img 
                        src={selected} 
                        alt={title} 
                        className="max-h-[88vh] max-w-[92vw] object-contain rounded-lg shadow-2xl cursor-grab active:cursor-grabbing select-none"
                      />
                    )}
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </div>
      ) : null}
    </>
  );
}
