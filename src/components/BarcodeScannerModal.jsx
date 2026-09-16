import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera, Scale, Tag } from 'lucide-react';

export default function BarcodeScannerModal({ isOpen, onClose, onScanSuccess }) {
  const scannerRef = useRef(null);
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [customName, setCustomName] = useState('');
  const [servings, setServings] = useState(1);
  const [servingUnit, setServingUnit] = useState('serving');

  useEffect(() => {
    if (!isOpen || scannedBarcode) return;

    const timeoutId = setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        'html5-qrcode-reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 150 },
          aspectRatio: 1.0,
        },
        false
      );

      scannerRef.current = scanner;

      scanner.render(
        (decodedText) => {
          scanner.clear().catch((err) => console.error('Failed to clear scanner:', err));
          scannerRef.current = null;
          setScannedBarcode(decodedText);
          // Set a default name fallback using the barcode value
          setCustomName(`Item (${decodedText})`);
        },
        () => {}
      );
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (scannerRef.current) {
        scannerRef.current.clear().catch((err) => console.error('Failed to clear scanner on unmount:', err));
        scannerRef.current = null;
      }
    };
  }, [isOpen, scannedBarcode]);

  const handleConfirmQuantity = (e) => {
    e.preventDefault();
    if (!scannedBarcode) return;

    onScanSuccess({
      barcode: scannedBarcode,
      name: customName || `Item (${scannedBarcode})`,
      servings: Number(servings) || 1,
      unit: servingUnit
    });

    handleClose();
  };

  const handleClose = () => {
    setScannedBarcode(null);
    setCustomName('');
    setServings(1);
    setServingUnit('serving');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            {scannedBarcode ? <Scale className="text-emerald-400 w-4 h-4" /> : <Camera className="text-emerald-400 w-4 h-4" />}
            {scannedBarcode ? 'Confirm Item Details' : 'Scan Food Barcode'}
          </h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-white transition cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!scannedBarcode ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Position the product barcode within the camera frame below.</p>
            <div id="html5-qrcode-reader" className="overflow-hidden rounded-xl border border-slate-700 bg-slate-950 text-white"></div>
          </div>
        ) : (
          <form onSubmit={handleConfirmQuantity} className="space-y-4">
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Barcode Detected</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">{scannedBarcode}</span>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-emerald-400" />
                  Item Name / Label
                </label>
                <input
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="e.g., Greek Yogurt, Oats, Protein Bar"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Quantity / Servings</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  required
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Serving Unit</label>
                <select
                  value={servingUnit}
                  onChange={(e) => setServingUnit(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="serving">Serving(s)</option>
                  <option value="grams">Grams (g)</option>
                  <option value="oz">Ounces (oz)</option>
                  <option value="cups">Cup(s)</option>
                  <option value="pieces">Piece(s)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setScannedBarcode(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs transition cursor-pointer"
              >
                Rescan
              </button>
              <button
                type="submit"
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition cursor-pointer shadow-md"
              >
                Log Nutrients
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}