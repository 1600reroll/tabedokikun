import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeSuggestion() {
  const _react = React;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fefce8] pb-12 font-sans text-gray-800 text-left">
      
      {/* 💛 上部ヘッダーバー */}
      <div className="w-full bg-[#facc15] h-16 shadow-sm mb-0 px-6 flex items-center justify-between">
        <button 
          onClick={() => navigate('/')} 
          className="text-3xl font-bold hover:opacity-70 flex items-center justify-start w-12 h-10"
        >
          ←
        </button>
        <h1 className="text-xl font-bold tracking-wider text-right flex-1 pr-2">レシピ提案</h1>
      </div>

      {/* 💚 使用する食材エリア */}
      <div className="bg-[#bbf7d0] px-6 py-5 shadow-inner mb-6">
        <div className="flex items-center gap-2 mb-3">
          {/* 💡 差し替えた緑色のコックアイコン（chef-icon.png） */}
          <img 
            src="/chef-icon.png" 
            alt="コック" 
            className="w-8 h-8 object-contain"
          />
          <span className="font-bold text-lg text-green-800">使用する食材</span>
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="bg-white text-gray-800 font-bold px-5 py-2 rounded-xl shadow-sm border border-green-200 text-base">
            牛肉
          </span>
          {/* 💡 「＋」ボタンを押した時に使用食材選択画面（/select-ingredients）へジャンプします */}
          <button 
            onClick={() => navigate('/select-ingredients')}
            className="w-12 h-12 bg-white/60 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-2xl font-bold text-gray-500 hover:bg-white/80 transition-colors"
          >
            ＋
          </button>
        </div>
        <p className="text-sm text-green-700 font-bold mt-4">この食材を使ったレシピを 2 件見つけました</p>
      </div>

      {/* 📋 レシピリストエリア */}
      <div className="max-w-md mx-auto px-6 space-y-6">
        
        {/* 🍱 1品目：プルコギ風 レシピカード */}
        <div 
          onClick={() => navigate('/recipe/pulgogi')}
          className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        >
          {/* 上半分：イラスト／写真イメージ用の黄緑エリア */}
          <div className="w-full h-44 bg-[#a3e635] flex items-center justify-center text-2xl font-bold text-gray-700">
            プルコギ風
          </div>
          {/* 下半分：テキスト情報 */}
          <div className="p-5 text-left">
            <h3 className="font-bold text-xl text-gray-900 mb-2">牛肉と玉ねぎのプルコギ風</h3>
            <p className="text-sm text-gray-500 mb-3 leading-relaxed">下味を揉み込んで焼くだけの、時短スタミナ料理です。</p>
            <div className="flex gap-4 text-xs font-medium text-gray-400 mb-4">
              <span>🕒 25分</span>
              <span>🍳 2人分</span>
            </div>
            {/* 食材バッジ */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              {["牛肉", "玉ねぎ", "ニラ", "ニンニク"].map((t, i) => (
                <span key={i} className="bg-gray-100 text-gray-600 font-bold px-2.5 py-1 rounded-full">{t}</span>
              ))}
              <span className="bg-gray-100 text-gray-400 px-2.5 py-1 rounded-full">+5</span>
            </div>
            <button className="w-full bg-[#a3e635] text-gray-800 font-bold py-3 rounded-2xl shadow-sm mt-5 hover:opacity-90 transition-opacity text-center">
              レシピを見る
            </button>
          </div>
        </div>

        {/* 🍲 2品目：牛丼 レシピカード (プレースホルダー) */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md overflow-hidden opacity-70">
          <div className="w-full h-32 bg-[#ccd5ae] flex items-center justify-center font-bold text-gray-600">
            牛丼
          </div>
          <div className="p-4 text-center font-bold text-gray-500">牛丼のレシピ</div>
        </div>

      </div>
    </div>
  );
}