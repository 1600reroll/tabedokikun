import React, { useRef } from 'react';

export default function ScanReceipt() {
  // 1. 隠しinput要素を操作するための「リモコン(ref)」を用意
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. オレンジのボタンや点線枠が押されたときに動く関数
  const handleCameraOpen = () => {
    if (fileInputRef.current) {
      // 隠してあるinput要素を強制的にクリックする
      fileInputRef.current.click();
    }
  };

  // 3. カメラで撮影が完了した（画像がセットされた）ときに動く関数
  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("撮影されたファイル:", file.name);
      // ここに画像をプレビュー表示したり、AI（Gemini等）に送る処理を追加します
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* 
        ▼ ここがカメラを起動する魔法のタグ（画面上からは見えません）
        capture="environment" でiPhoneの外側（背面）カメラを指定
      */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileInputRef}
        onChange={handleImageCapture}
        className="hidden" // Tailwindで完全に非表示にする
      />

      {/* 点線枠のエリア（ここを押してもカメラが開くようにする） */}
      <div 
        onClick={handleCameraOpen}
        className="w-full border-4 border-dashed border-blue-400 rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors bg-white mb-6"
      >
        <div className="text-6xl mb-4">📷</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">レシートをスキャン</h2>
        <p className="text-gray-400 text-sm">カメラでレシートを撮影してください。</p>
      </div>

      {/* オレンジのボタン（ここを押してもカメラが開くようにする） */}
      <button 
        onClick={handleCameraOpen}
        className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-4 rounded-2xl text-xl flex items-center justify-center gap-2 shadow-md transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8V6a2 2 0 012-2h3m10 0h3a2 2 0 012 2v2M3 16v2a2 2 0 002 2h3m10 0h3a2 2 0 002-2v-2M8 12h8" />
        </svg>
        レシートをスキャン
      </button>
    </div>
  );
}