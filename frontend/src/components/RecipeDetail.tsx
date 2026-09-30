import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipeDetail() {
  const _react = React;
  const navigate = useNavigate();

  // モーダルの表示状態を管理するステート（0: 閉じている, 1: 確認画面, 2: 結果画面）
  const [modalStage, setModalStage] = useState<number>(0);

  return (
    <div className="min-h-screen bg-[#fefce8] pb-28 font-sans text-gray-800 text-left relative">
      
      {/* 📸 上部の料理イメージエリア */}
      <div 
        className="w-full h-56 bg-orange-100 relative bg-cover bg-center"
        style={{ backgroundImage: 'url("/pulgogi-dish.png")' }}
      >
        {/* 左上戻るボタン */}
        <button 
          onClick={() => window.history.back()} 
          className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow font-bold text-2xl hover:bg-gray-50 transition-colors"
        >
          ←
        </button>
        {/* 右上ホームボタン */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50 transition-colors"
        >
          {/* 💡 ホームの絵文字を、差し替えた「home-black-icon.png」に修正しました */}
          <img 
            src="/home-black-icon.png" 
            alt="ホーム" 
            className="w-6 h-6 object-contain" 
          />
        </button>
      </div>

      <div className="max-w-md mx-auto px-6 pt-6">
        
        {/* タイトルと時間・人数 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">牛肉と玉ねぎのプルコギ風</h2>
        <div className="flex gap-4 text-sm text-gray-500 font-medium items-center mb-6">
          <span className="flex items-center gap-1">🕒 25分</span>
          <span className="flex items-center gap-1.5">
            <img 
              src="/chef-gray-icon.png" 
              alt="人数" 
              className="w-4 h-4 object-contain" 
            />
            2人分
          </span>
        </div>

        {/* 📋 材料セクション */}
        <div className="mb-8">
          <h3 className="font-bold text-xl text-gray-900 mb-4">材料</h3>
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 space-y-3.5 font-medium">
            {[
              { name: "牛肉", amount: "200g" },
              { name: "玉ねぎ", amount: "1/2個" },
              { name: "ニラ", amount: "1/2束" },
              { name: "醤油", amount: "大さじ1" },
              { name: "ごま油", amount: "大さじ1" },
              { name: "すりごま", amount: "大さじ1" },
              { name: "砂糖", amount: "小さじ1" },
              { name: "コチュジャン", amount: "小さじ1" },
              { name: "ニンニク", amount: "小さじ1" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-gray-700 text-base">{item.name}</span>
                <span className="text-gray-500 font-mono text-base">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 🍳 作り方セクション */}
        <div className="mb-6 text-left">
          <h3 className="font-bold text-xl text-gray-900 mb-4">作り方</h3>
          <div className="space-y-3 font-medium text-gray-700 text-base leading-relaxed">
            <p>1. ポリ袋に牛肉、玉ねぎ、調味料を入れる。</p>
            <p>2. よく揉み込んで10分ほど味をなじませる。</p>
            <p>3. フライパンで汁ごと炒め、最後にニラを加える。</p>
          </div>
        </div>

      </div>

      {/* 💛 下部の固定アクションバー */}
      <div className="fixed bottom-0 left-0 w-full bg-[#facc15] py-4 px-6 border-t border-yellow-400 shadow-xl flex justify-center z-45">
        <button 
          onClick={() => setModalStage(1)}
          className="w-full max-w-md bg-[#ea580c] hover:bg-[#c2410c] text-white text-xl font-bold py-4 rounded-2xl shadow transition-colors text-center"
        >
          食材を使用する
        </button>
      </div>

      {/* モーダルエリア */}
      {modalStage > 0 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl text-left border border-gray-100">
            
            {/* ステージ1: 確認モーダル */}
            {modalStage === 1 && (
              <>
                <h4 className="font-bold text-base text-gray-800 mb-5">以下の食材を使用します。</h4>
                <div className="space-y-4 font-bold text-2xl text-gray-900 mb-8">
                  <div className="flex justify-between"><span>牛肉</span><span>200g</span></div>
                  <div className="flex justify-between"><span>玉ねぎ</span><span>1/2個</span></div>
                  <div className="flex justify-between"><span>ニラ</span><span>1/2束</span></div>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setModalStage(0)} className="flex-1 bg-[#e5e7eb] hover:bg-gray-300 text-gray-800 font-bold py-4 rounded-xl text-xl transition-colors text-center">いいえ</button>
                  <button onClick={() => setModalStage(2)} className="flex-1 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-4 rounded-xl text-xl transition-colors text-center">はい</button>
                </div>
              </>
            )}

            {/* ステージ2: 結果モーダル */}
            {modalStage === 2 && (
              <>
                <h4 className="font-bold text-sm text-gray-800 mb-5 leading-snug">以下の選択された食材を使用しました！</h4>
                <div className="space-y-4 font-bold text-2xl text-gray-900 mb-4">
                  <div className="flex justify-between"><span>牛肉</span><span>200g</span></div>
                  <div className="flex justify-between"><span>玉ねぎ</span><span>1/2個</span></div>
                  <div className="flex justify-between"><span>ニラ</span><span>1/2束</span></div>
                </div>
                <p className="text-center text-xs font-bold text-gray-400 mb-4 tracking-wide">— 残り在庫量 —</p>
                <div className="space-y-4 font-bold text-xl text-gray-800 mb-8">
                  <div className="flex justify-between"><span>牛肉</span><span className="text-2xl">0g</span></div>
                  <div className="flex justify-between"><span>玉ねぎ</span><span className="text-gray-600">2と1/2個</span></div>
                  <div className="flex justify-between"><span>ニラ</span><span className="text-gray-600">2と1/2個</span></div>
                </div>
                <button onClick={() => { setModalStage(0); navigate('/'); }} className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 rounded-xl text-xl transition-colors text-center shadow-md">戻る</button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}