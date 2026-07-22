import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { Camera, UploadCloud, CheckCircle2, Loader2 } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';

export default function ReceiptScanner() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState(false);
  const { addExpense } = useExpenses();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setSuccess(false);

    Tesseract.recognize(file, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text') {
          setProgress(Math.round(m.progress * 100));
        }
      },
    }).then(({ data: { text } }) => {
      parseAndAddExpense(text);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  const parseAndAddExpense = (rawText) => {
    const amountMatches = rawText.match(/\d+[\.,]\d{2}/g);
    const extractedAmount = amountMatches ? parseFloat(amountMatches[amountMatches.length - 1].replace(',', '.')) : 180;

    const lowerText = rawText.toLowerCase();
    let category = 'Others';

    if (lowerText.includes('supermarket') || lowerText.includes('grocery') || lowerText.includes('mart')) {
      category = 'Food';
    } else if (lowerText.includes('fuel') || lowerText.includes('petrol') || lowerText.includes('uber')) {
      category = 'Utilities';
    } else if (lowerText.includes('book') || lowerText.includes('stationery') || lowerText.includes('tuition')) {
      category = 'Academics';
    }

    addExpense({
      title: 'OCR Receipt',
      amount: extractedAmount,
      category: category,
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 text-white p-5 rounded-3xl shadow-xl relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/10 rounded-xl backdrop-blur-md">
            <Camera className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-wide">Smart Scan</h3>
            <p className="text-[11px] text-indigo-200">Instant OCR Extractor[cite: 1]</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="ocr-upload"
          disabled={loading}
        />
        <label
          htmlFor="ocr-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-300/40 hover:border-white/80 rounded-2xl p-4 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
        >
          {loading ? (
            <div className="w-full space-y-2 text-center py-1">
              <div className="flex items-center justify-center gap-2 text-xs font-medium text-indigo-100">
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                Scanning Receipt... {progress}%
              </div>
              <div className="w-full bg-black/20 rounded-full h-1.5 overflow-hidden">
                <div className="bg-white h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          ) : success ? (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 py-1">
              <CheckCircle2 className="w-5 h-5" />
              Receipt Processed & Saved!
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <UploadCloud className="w-5 h-5 text-indigo-200 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-indigo-100">Upload Receipt Photo[cite: 1]</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}