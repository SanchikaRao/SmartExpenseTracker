import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { useExpenses } from '../context/ExpenseContext';

export default function ReceiptScanner() {
  const { addExpense } = useExpenses();
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState('');

  // 1. Fast Client-Side Image Resizer
  const preprocessImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1000; // Optimal size for OCR accuracy + speed
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert canvas to compressed base64 JPEG
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // 2. Optimized OCR Handler
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setStatusText('Compressing receipt...');

    try {
      // Step A: Downscale image to speed up processing
      const optimizedImage = await preprocessImage(file);

      setStatusText('Scanning receipt...');

      // Step B: Initialize Tesseract worker with English language
      const worker = await createWorker('eng');
      const { data } = await worker.recognize(optimizedImage);
      await worker.terminate();

      const text = data.text;
      setStatusText('Extracting total amount...');

      // Step C: Regex to extract highest monetary amount found
      const amounts = text.match(/[\d,]+\.\d{2}/g);
      let detectedAmount = 0;

      if (amounts) {
        const numericAmounts = amounts
          .map((a) => parseFloat(a.replace(/,/g, '')))
          .filter((a) => !isNaN(a));
        if (numericAmounts.length > 0) {
          detectedAmount = Math.max(...numericAmounts);
        }
      }

      // Step D: Add expense automatically
      if (detectedAmount > 0) {
        addExpense({
          title: 'Scanned Receipt',
          amount: detectedAmount,
          category: 'Shopping',
          date: new Date().toISOString().split('T')[0]
        });
        alert(`Successfully extracted ₹${detectedAmount}! Saved to expenses.`);
      } else {
        alert('Could not auto-detect total amount. Please enter manually.');
      }
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Scanning failed. Try taking a clearer picture.');
    } finally {
      setLoading(false);
      setStatusText('');
    }
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
      <h3 className="text-sm font-bold text-slate-800 mb-2">Scan Receipt with OCR</h3>
      <p className="text-xs text-slate-400 mb-4">Upload or take a photo of a receipt to auto-extract the bill amount.</p>

      <label className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-5 rounded-xl cursor-pointer transition-all shadow-md">
        {loading ? statusText : '📸 Take Photo / Upload'}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          disabled={loading}
          className="hidden"
        />
      </label>
    </div>
  );
}