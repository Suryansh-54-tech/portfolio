"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useCallback, useRef, useEffect } from "react";

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  title?: string;
  provider?: string;
  issuedBy?: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export function CertificateViewer({
  isOpen,
  onClose,
  pdfUrl,
  title,
  provider,
  issuedBy,
  issueDate,
  credentialId,
  credentialUrl,
}: CertificateViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const zoomIn = useCallback(() => setScale((s) => Math.min(s + 0.25, 3)), []);
  const zoomOut = useCallback(() => setScale((s) => Math.max(s - 0.25, 0.5)), []);
  const resetZoom = useCallback(() => setScale(1), []);
  const rotate = useCallback(() => setRotation((r) => (r + 90) % 360), []);
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((f) => !f);
    if (!isFullscreen && viewerRef.current) {
      viewerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, [isFullscreen]);

  const downloadPdf = useCallback(() => {
    if (pdfUrl) {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = title?.replace(/\s+/g, "-") || "certificate.pdf";
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [pdfUrl, title]);

  const openInNewTab = useCallback(() => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank", "noopener,noreferrer");
    }
  }, [pdfUrl]);

  const openCredential = useCallback(() => {
    if (credentialUrl) {
      window.open(credentialUrl, "_blank", "noopener,noreferrer");
    }
  }, [credentialUrl]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") onClose();
    if (e.key === "+" || e.key === "=") zoomIn();
    if (e.key === "-") zoomOut();
    if (e.key === "0") resetZoom();
    if (e.key === "r") rotate();
    if (e.key === "f") toggleFullscreen();
  }, [isOpen, onClose, zoomIn, zoomOut, resetZoom, rotate, toggleFullscreen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="viewer-title"
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        <motion.div
          ref={viewerRef}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={cn(
            "relative w-full max-w-5xl h-[85vh] max-h-[85vh] glass-strong rounded-2xl overflow-hidden flex flex-col",
            isFullscreen && "fixed inset-0 max-w-none max-h-none rounded-none z-[101]"
          )}
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-4">
              <h2 id="viewer-title" className="font-semibold text-lg truncate max-w-[300px]">
                {title || "Certificate"}
              </h2>
              {credentialId && (
                <span className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary rounded-full border border-primary/30">
                  {credentialId}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {credentialUrl && (
                <button
                  onClick={openCredential}
                  className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary"
                  aria-label="View credential on provider site"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={downloadPdf}
                disabled={!pdfUrl}
                className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Download certificate PDF"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={openInNewTab}
                disabled={!pdfUrl}
                className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Open certificate in new tab"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              {!isFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary"
                  aria-label="Enter fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              )}
              {isFullscreen && (
                <button
                  onClick={toggleFullscreen}
                  className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary"
                  aria-label="Exit fullscreen"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 glass rounded-xl hover:bg-red/10 transition-colors text-muted hover:text-red"
                aria-label="Close viewer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto relative p-4" style={{ transform: `scale(${1 / scale}) rotate(${-rotation}deg)` }}>
            <div
              className="flex items-center justify-center h-full min-h-[500px]"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transformOrigin: "center center",
                transition: "transform 0.15s ease-out",
              }}
            >
              {error ? (
                <div className="text-center p-8 glass rounded-xl max-w-md">
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-semibold mb-2">Unable to Load Certificate</h3>
                  <p className="text-muted mb-6">The PDF could not be displayed in the viewer.</p>
                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={downloadPdf}
                      className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={openInNewTab}
                      className="px-4 py-2 glass rounded-xl font-medium hover:bg-primary/10 transition-colors"
                    >
                      Open in New Tab
                    </button>
                  </div>
                </div>
              ) : pdfUrl ? (
                <iframe
                  ref={iframeRef}
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full border-0 rounded-xl"
                  title={title || "Certificate PDF"}
                  onError={() => setError(true)}
                  style={{ minHeight: "600px" }}
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="text-center p-8 glass rounded-xl max-w-md">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold mb-2">No PDF Available</h3>
                  <p className="text-muted">This certificate does not have a PDF file attached.</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-border/50 bg-background/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {provider && `Provider: ${provider}`}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary-light" />
                {issuedBy && `Issued by: ${issuedBy}`}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary-glow" />
                {issueDate && `Date: ${issueDate}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-sm font-mono glass rounded-lg text-center min-w-[60px]">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= 3}
                className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary"
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={rotate}
                className="p-2 glass rounded-xl hover:bg-primary/10 transition-colors text-muted hover:text-primary"
                aria-label="Rotate"
              >
                <RotateCcw className="w-4 h-4" style={{ transform: "rotate(45deg)" }} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted/60 hidden sm:flex">
          <kbd className="px-2 py-0.5 bg-secondary rounded border border-border mx-1 font-mono">Esc</kbd> Close
          <kbd className="px-2 py-0.5 bg-secondary rounded border border-border mx-1 font-mono">+/-</kbd> Zoom
          <kbd className="px-2 py-0.5 bg-secondary rounded border border-border mx-1 font-mono">R</kbd> Rotate
          <kbd className="px-2 py-0.5 bg-secondary rounded border border-border mx-1 font-mono">F</kbd> Fullscreen
        </div>
      </motion.div>
    </AnimatePresence>
  );
}