import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainDashboard() {
  const _react = React; // 迷子対策
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ fridge: 0, 'room-temp': 0 });

  useEffect(() => {
    fetch('http://localhost:8000/api/ingredients')
      .then(res => res.json())
      .then((data: any[]) => {
        const fridgeCount = data.filter(item => item.category === 'fridge').length;
        const roomCount = data.filter(item => item.category === 'room-temp').length;
        setCounts({ fridge: fridgeCount, 'room-temp': roomCount });
      })
      .catch(err => console.error("データ取得失敗", err));
  }, []);

  return (
    <div className="min-h-screen bg-[#fefce8] pb-12 font-sans text-gray-800">
      {/* 💡 コメントはここなら安全です！全体の背景をお手本の薄いクリーム色に指定しています */}
      
      {/* 💛 上部の鮮やかな黄色いヘッダーバー */}
      <div className="w-full bg-[#facc15] h-16 shadow-sm mb-6 flex items-center justify-center">
        {/* スマホ画面風のアクセントとして白のポッチを再現したい場合はここに配置できます */}
      </div>

      <div className="max-w-md mx-auto px-6">
        
        {/* 📂 カテゴリーセクション */}
        <p className="text-xl font-bold text-gray-500 mb-4">カテゴリー</p>
        
        <div className="grid grid-cols-2 gap-5 mb-8">
          
          {/* 🟦 冷蔵ボタン（鮮やかな水色） */}
          <button
            onClick={() => navigate('/list/fridge')}
            className="bg-[#7dd3fc] hover:bg-[#38bdf8] rounded-3xl p-6 transition-colors shadow-sm text-center"
          >
            <img 
              src="/fridge-icon.png" 
              alt="冷蔵庫" 
              className="w-16 h-16 mx-auto mb-3 object-contain brightness-90" 
            />
            <p className="font-bold text-2xl text-[#0369a1] mb-1">冷蔵</p>
            <p className="text-lg text-[#0369a1] font-medium">{counts.fridge}品目</p>
          </button>

          {/* 🟨 常温ボタン（鮮やかなオレンジ色） */}
          <button
            onClick={() => navigate('/list/room-temp')}
            className="bg-[#fbbf24] hover:bg-[#f59e0b] rounded-3xl p-6 transition-colors shadow-sm text-center"
          >
            <img 
              src="/ramen-icon.png" 
              alt="常温" 
              className="w-16 h-16 mx-auto mb-3 object-contain brightness-90" 
            />
            <p className="font-bold text-2xl text-[#b45309] mb-1">常温</p>
            <p className="text-lg text-[#b45309] font-medium">{counts['room-temp']}品目</p>
          </button>

        </div>

        {/* 🍳 おすすめレシピ＆期限切れ間近タイトル */}
        <div className="flex justify-between items-center mb-4">
          <div 
            onClick={() => navigate('/recipes')}
            className="flex items-center gap-1 text-xl font-bold text-gray-700 cursor-pointer hover:opacity-80"
          >
            <span>おすすめレシピ</span>
            <span className="text-2xl">➔</span>
          </div>
          <span className="text-red-500 font-bold text-lg">期限切れ間近</span>
        </div>

        {/* 📋 レシピリストカード（白背景・角丸・枠線・影） */}
        <div className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden mb-8">
          
          {/* 1品目：トマトパスタ */}
          <div 
            onClick={() => navigate('/recipes')}
            className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="w-14 h-14 bg-[#4b5563] rounded-full flex items-center justify-center text-white text-3xl">
              🍳
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-xl text-gray-800 mb-0.5">トマトパスタ</h3>
              <p className="text-sm text-gray-500 mb-1.5">使用食材: トマト、パスタ、にんにく</p>
              <span className="bg-[#fecaca] text-[#ef4444] text-xs font-bold px-3 py-1 rounded-full">
                トマト: 2日
              </span>
            </div>
          </div>

          {/* 2品目：野菜炒め */}
          <div 
            onClick={() => navigate('/recipes')}
            className="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="w-14 h-14 bg-[#4b5563] rounded-full flex items-center justify-center text-white text-3xl">
              🍳
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-xl text-gray-800 mb-0.5">野菜炒め</h3>
              <p className="text-sm text-gray-500 mb-1.5">使用食材: キャベツ、人参、豚肉</p>
              <span className="bg-[#fecaca] text-[#ef4444] text-xs font-bold px-3 py-1 rounded-full">
                キャベツ: 3日
              </span>
            </div>
          </div>

          {/* 3品目：カレーライス */}
          <div 
            onClick={() => navigate('/recipes')}
            className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="w-14 h-14 bg-[#4b5563] rounded-full flex items-center justify-center text-white text-3xl">
              🍳
            </div>
            <div className="text-left flex-1">
              <h3 className="font-bold text-xl text-gray-800 mb-0.5">カレーライス</h3>
              <p className="text-sm text-gray-500 mb-1.5">使用食材: カレールー、じゃがいも、玉ねぎ、人参、牛肉</p>
              <span className="bg-[#fecaca] text-[#ef4444] text-xs font-bold px-3 py-1 rounded-full">
                じゃがいも: 2日
              </span>
            </div>
          </div>

        </div>

        {/* 🟢 食材登録に進むボタン */}
        <button
          onClick={() => navigate('/register')}
          className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xl font-bold py-5 rounded-full shadow-lg transition-colors text-center"
        >
          食材登録に進む
        </button>

      </div>
    </div>
  );
}