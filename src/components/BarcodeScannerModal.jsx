import React, { useEffect, useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { X, Camera, AlertCircle, Loader2 } from 'lucide-react';
import { fetchNutritionByBarcode } from '../utils/barcodeService';

export default function BarcodeScannerModal({ onClose, onLogMeal }) {
  const [scannedProduct, setScannedProduct] = useState(null);
  const [servings, setServings] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scannerRef = useRef(null);

  useEffect(() => {
    // Initialize html5-qrcode camera viewer
    const scanner = new Html5QrcodeScanner(
      'barcode-reader-view',
      { fps: 10, qrbox: { width: 250, height: 150 } },
      false
    );

    scanner.render(
      async (decodedText) => {
        setIsLoading(true);
        setErrorMessage('');
        
        // Stop scanning upon successful capture
        scanner.clear().catch(() => {});

        const result = await fetchNutritionByBarcode(decodedText);
        setIsLoading(false);

        if (result.success) {
          setScannedProduct(result.product);
        } else {
          setErrorMessage(result.error);
        }
      },
      () => {
        // Ignore camera frame parsing errors
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  const handleConfirmLog = () => {
    if (!scannedProduct) return;

    const qty = parseFloat(servings) || 1;

    const finalMealEntry = {
      id: Date.now(),
      foodName: `${scannedProduct.name} (${qty} serving${qty > 1 ? 's' : ''})`,
      grams: 0,
      calories: Math.round(scannedProduct.servingCalories * qty),
      protein: Math.round(scannedProduct.servingProtein * qty),
      carbs: Math.round(scannedProduct.servingCarbs * qty),
      fat: Math.round(scannedProduct.servingFat * qty)
    };

    onLogMeal(finalMealEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-4 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Camera className="w-5 h-5 text-emerald-400" /> Barcode Scanner
        </h3>

        {!scannedProduct && !isLoading && (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">Point your camera at the food product barcode:</p>
            <div id="barcode-reader-view" className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900" />
            {errorMessage && (
              <div className="flex items-center gap-2 text-rose-400 text-xs bg-rose-950/50 p-2.5 rounded-lg border border-rose-800">
                <AlertCircle className="w-4 h-4 shrink-0" /> {errorMessage}
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center space-y-3 text-emerald-400">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs text-slate-300">Fetching nutrition details...</span>
          </div>
        )}

        {scannedProduct && (
          <div className="space-y-4 pt-2">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700">
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                {scannedProduct.brand || 'Scanned Item'}
              </span>
              <h4 className="text-base font-bold text-white">{scannedProduct.name}</h4>
              <p className="text-xs text-slate-400 mt-1">Base Serving: {scannedProduct.servingSizeText}</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium block">How many servings did you eat?</label>
              <input
                type="number"
                step="0.25"
                min="0.1"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Dynamic Calculated Breakdown */}
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60 text-xs space-y-2">
              <span className="text-slate-400 font-semibold block uppercase text-[10px]">Calculated Breakdown</span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">Calories</span>
                  <span className="text-amber-400 font-bold">{Math.round(scannedProduct.servingCalories * (parseFloat(servings) || 1))} kcal</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Protein</span>
                  <span className="text-indigo-400 font-bold">{Math.round(scannedProduct.servingProtein * (parseFloat(servings) || 1))}g</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Carbs</span>
                  <span className="text-emerald-400 font-bold">{Math.round(scannedProduct.servingCarbs * (parseFloat(servings) || 1))}g</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Fat</span>
                  <span className="text-yellow-400 font-bold">{Math.round(scannedProduct.servingFat * (parseFloat(servings) || 1))}g</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLog}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs cursor-pointer"
              >
                Log Meal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
