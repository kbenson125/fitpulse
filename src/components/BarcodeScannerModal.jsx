
import React, { useEffect, useRef, useState } from "react";
import { Camera, X, AlertCircle } from "lucide-react";
import {
  Html5QrcodeScanner,
  Html5QrcodeSupportedFormats,
  Html5QrcodeScanType,
} from "html5-qrcode";

export default function BarcodeScannerModal({
  isOpen,
  onClose,
  onScanSuccess,
}) {
  const [cameraError, setCameraError] = useState(null);
  const scannerRef = useRef(null);
  const isScanningRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    setCameraError(null);
    isScanningRef.current = false;

    let timer;

    const initializeScanner = () => {
      try {
        const readerElement = document.getElementById(
          "html5-qrcode-reader"
        );

        if (!readerElement) {
          setCameraError(
            "The barcode scanner could not be initialized. Please close and reopen the scanner."
          );
          return;
        }

        const formatsToSupport = [
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
        ];

        const scanner = new Html5QrcodeScanner(
          "html5-qrcode-reader",
          {
            fps: 10,
            qrbox: {
              width: 280,
              height: 160,
            },
            aspectRatio: 1.777778,
            formatsToSupport,
            supportedScanTypes: [
              Html5QrcodeScanType.SCAN_TYPE_CAMERA,
            ],
            rememberLastUsedCamera: true,
            showTorchButtonIfSupported: true,
          },
          false
        );

        scannerRef.current = scanner;

        scanner.render(
          async (decodedText) => {
            if (isScanningRef.current) return;

            isScanningRef.current = true;

            console.log("Barcode detected:", decodedText);

            try {
              await scanner.clear();
            } catch (error) {
              console.error(
                "Error stopping barcode scanner:",
                error
              );
            }

            scannerRef.current = null;

            if (onScanSuccess) {
              onScanSuccess(decodedText);
            }

            if (onClose) {
              onClose();
            }
          },
          (errorMessage) => {
            // Normal scanning errors are ignored.
          }
        );
      } catch (error) {
        console.error(
          "Barcode scanner initialization error:",
          error
        );

        setCameraError(
          "Unable to initialize the camera. Please make sure your browser has permission to use the camera."
        );
      }
    };

    timer = setTimeout(initializeScanner, 150);

    return () => {
      clearTimeout(timer);

      isScanningRef.current = true;

      if (scannerRef.current) {
        scannerRef.current
          .clear()
          .catch((error) => {
            console.error(
              "Barcode scanner cleanup error:",
              error
            );
          });

        scannerRef.current = null;
      }
    };
  }, [isOpen, onScanSuccess, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">

        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-400" />

            <h3 className="font-bold text-sm text-white">
              Scan Food Barcode
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition cursor-pointer p-1"
            aria-label="Close barcode scanner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {cameraError ? (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-4 flex items-start gap-3 text-rose-400 text-xs">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />

              <div className="space-y-2">
                <p className="font-medium">
                  {cameraError}
                </p>

                <p className="text-rose-400/80">
                  Make sure your browser has camera permission
                  and that you're using HTTPS or localhost.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div
                id="html5-qrcode-reader"
                className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 text-white min-h-[260px]"
              />

              <div className="text-center space-y-1">
                <p className="text-xs text-slate-300">
                  Point your camera at the barcode
                </p>

                <p className="text-[11px] text-slate-500">
                  UPC-A, UPC-E, EAN-13 and EAN-8 supported
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium transition"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

