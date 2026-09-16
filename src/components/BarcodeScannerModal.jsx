import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, AlertCircle } from 'lucide-react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [cameraError, setCameraError] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Reset error state
    setCameraError(null);

    // Small timeout ensures the DOM node #html5-qrcode-reader exists before binding
    const timer = setTimeout(() => {
      try {
        const scanner = new Html5QrcodeScanner(
          "html5-qrcode-reader",
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.0,
            showTorchButtonIfSupported: true,
          },
          /* verbose= */ false
        );

        scannerRef.current = scanner;

        scanner.render(
          (decodedText) => {
            // Successful barcode scan
            if (scannerRef.current) {
              scannerRef.current.clear().then(() => {
                if (onScanSuccess) onScanSuccess(decodedText);
                onClose();
              }).catch(err => console.error(err));
            }
          },
          (errorMessage) => {
            // Frame scanning in progress (silent)
          }
        );
      } catch (err) {
        console.error("Scanner setup error:", err);
        setCameraError("Unable to initialize camera. Please grant camera permissions in your browser.");
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => console.error("Scanner cleanup error:", err));
        scannerRef.current = null;
      }
    };
  }, [isOpen, onScanSuccess, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">Barcode & Food Scanner</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewport */}
        <div className="p-6 space-y-4">
          {cameraError ? (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-center gap-3 text-rose-400 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{cameraError}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Container HTML5-QRCode mounts into */}
              <div 
                id="html5-qrcode-reader" 
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-white min-h-[260px]"
              ></div>
              <p className="text-center text-xs text-slate-400">
                Point camera at barcode. Grant permissions when prompted.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}