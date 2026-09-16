import React, { useEffect, useRef, useState } from 'react';
import { Camera, X, AlertCircle, RefreshCw } from 'lucide-react';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [permissionError, setPermissionError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // Start Real Camera Stream
  const startCamera = async () => {
    setIsInitializing(true);
    setPermissionError(null);

    try {
      // Request rear camera preferably, fallback to default camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } }
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true); // critical for mobile web
        await videoRef.current.play();
        setIsInitializing(false);

        // Initiate continuous scanning loop
        scanBarcodeFrame();
      }
    } catch (err) {
      console.error('Camera access error:', err);
      setIsInitializing(false);

      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setPermissionError('Camera access was denied. Please allow camera permissions in your browser settings.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setPermissionError('No camera device found on this system.');
      } else {
        setPermissionError('Unable to access camera feed. Please check your system settings.');
      }
    }
  };

  // Stop Camera Stream & Clean up
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Scan frame loop using native BarcodeDetector API if supported
  const scanBarcodeFrame = async () => {
    if (!videoRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(scanBarcodeFrame);
      return;
    }

    if ('BarcodeDetector' in window) {
      try {
        const barcodeDetector = new window.BarcodeDetector({
          formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'qr_code', 'code_128']
        });

        const barcodes = await barcodeDetector.detect(videoRef.current);
        if (barcodes.length > 0) {
          const detectedValue = barcodes[0].rawValue;
          stopCamera();
          if (onScanSuccess) {
            onScanSuccess(detectedValue);
          }
          onClose();
          return;
        }
      } catch (e) {
        console.warn('Barcode detection failed on frame:', e);
      }
    }

    animationFrameRef.current = requestAnimationFrame(scanBarcodeFrame);
  };

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

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
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="text-slate-400 hover:text-white transition cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Viewport Body */}
        <div className="p-6 space-y-4">
          {permissionError ? (
            <div className="space-y-4">
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3 text-rose-400 text-xs">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-rose-300">Camera Access Blocked</p>
                  <p className="mt-1 leading-relaxed">{permissionError}</p>
                </div>
              </div>
              <button
                onClick={startCamera}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer border border-slate-700"
              >
                <RefreshCw className="w-4 h-4" /> Retry Access
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-950 aspect-square flex items-center justify-center">
                
                {/* Video Stream Element */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Live Scanning Reticle Overlay */}
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                  <div className="w-48 h-48 border-2 border-emerald-400/80 rounded-2xl relative shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-400/60 animate-pulse"></div>
                  </div>
                </div>

                {isInitializing && (
                  <div className="absolute inset-0 bg-slate-950/80 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" /> Requesting Camera...
                  </div>
                )}
              </div>

              <p className="text-center text-xs text-slate-400">
                Center barcode within the target box to automatically scan.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}