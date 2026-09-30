import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function IngredientRegistration() {
  const _react = React;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fefce8] pb-12 font-sans text-gray-800 text-left">
      
      {/* 💛 上部の黄色いヘッダーバー */}
      <div className="w-full bg-[#facc15] h-16 shadow-sm mb-8 px-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')} 
          className="text-3xl font-bold hover:opacity-70 transition-opacity flex items-center justify-start w-12 h-10"
        >
          ←
        </button>
        <h1 className="text-xl font-bold tracking-wider text-right flex-1 pr-2">食材登録</h1>
      </div>

      <div className="max-w-md mx-auto px-6">
        
        {/* 📸 レシートスキャンエリア（お手本通りのきれいな水色の点線枠） */}
        <div className="bg-white rounded-3xl border-4 border-dashed border-[#38bdf8] p-10 shadow-sm text-center mb-8">
          {/* 💡 差し替えたカメラアイコン画像 */}
          <img 
            src="/camera-icon.png" 
            alt="カメラ" 
            className="w-24 h-24 mx-auto mb-6 object-contain"
          />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">レシートをスキャン</h2>
          <p className="text-sm text-gray-400">カメラでレシートを撮影してください。</p>
        </div>

        {/* 🟠 レシートをスキャンボタン（クリックしたらスキャン確認画面 /register-confirm へジャンプ） */}
        <button
          onClick={() => navigate('/register-confirm')}
          className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white text-xl font-bold py-4 rounded-2xl shadow-md transition-colors flex items-center justify-center gap-3 mb-6"
        >
          {/* 💡 差し替えたスキャンボタン内のアイコン画像 */}
          <img 
            src="/scan-button-icon.png" 
            alt="スキャンマーク" 
            className="w-8 h-8 object-contain brightness-0 invert" 
          />
          <span className="tracking-wider text-2xl">レシートをスキャン</span>
        </button>

        {/* 🔗 手動入力リンク（クリックしたら手動登録画面 /manual-register へジャンプ） */}
        <div className="text-center mb-10">
          <span className="text-gray-400 text-sm">または</span><br />
          <button 
            onClick={() => navigate('/manual-register')}
            className="text-[#3b82f6] font-bold text-xl hover:underline mt-2"
          >
            手動で入力する
          </button>
        </div>

        <hr className="border-gray-300 mb-8" />

        {/* 📋 使い方ガイド（白背景のきれいなカード型） */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-xl text-gray-800 mb-4">使い方</h3>
          <ul className="space-y-3 text-gray-600 font-medium text-lg">
            <li className="flex items-start gap-1">
              <span>・</span>
              レシートを明るい場所で撮影
            </li>
            <li className="flex items-start gap-1">
              <span>・</span>
              商品名がはっきり見えるように
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}