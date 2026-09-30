import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SelectIngredients() {
  const _react = React;
  const navigate = useNavigate();

  {/* 💡 お手本の状態（デフォルトで牛肉のID:5にチェックが入っている状態）を再現するステート */}
  const [selectedIds, setSelectedIds] = useState<number[]>([5]);

  {/* 📋 お手本のスクショに並んでいた全6種類の食材データ（期限やバッジの色も再現） */}
  const ingredients = [
    { id: 1, name: "牛乳", expiry: "2026-05-20", daysLeft: 4, badgeBg: "bg-[#fecaca] text-[#ef4444]" },
    { id: 2, name: "卵", expiry: "2026-05-23", daysLeft: 5, badgeBg: "bg-[#fef3c7] text-[#d97706]" },
    { id: 3, name: "ヨーグルト", expiry: "2027-03-10", daysLeft: 12, badgeBg: "bg-[#bbf7d0] text-[#16a34a]" },
    { id: 4, name: "チーズ", expiry: "2026-12-30", daysLeft: 18, badgeBg: "bg-[#bbf7d0] text-[#16a34a]" },
    { id: 5, name: "牛肉", expiry: "2026-05-21", daysLeft: 3, badgeBg: "bg-[#fecaca] text-[#ef4444]" },
    { id: 6, name: "パン", expiry: "2026-05-22", daysLeft: 4, badgeBg: "bg-[#bbf7d0] text-[#16a34a]" },
  ];

  {/* 💡 チェックボックスをタップしたときに、チェックのON/OFF（と背景色）を切り替える処理 */}
  const handleToggle = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefce8] pb-32 font-sans text-gray-800 text-left relative">
      
      {/* 💛 上部の黄色いヘッダーバー */}
      <div className="w-full bg-[#facc15] h-16 shadow-sm mb-4 px-6 flex items-center justify-between">
        <button 
          onClick={() => window.history.back()} 
          className="text-3xl font-bold hover:opacity-70 transition-opacity flex items-center justify-start w-12 h-10"
        >
          ←
        </button>
        <h1 className="text-xl font-bold tracking-wider text-right flex-1 pr-2">使用食材選択</h1>
      </div>

      <div className="max-w-md mx-auto px-6">
        
        {/* 📊 件数と並び替え見出し */}
        <div className="flex justify-between items-center mb-4 text-gray-600 font-medium">
          <span className="text-lg">全{ingredients.length}件</span>
          <button className="text-blue-600 hover:underline">並び替え</button>
        </div>

        {/* 📋 食材チェックリスト一覧 */}
        <div className="space-y-4">
          {ingredients.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            {/* 💡 チェックされているカードは背景を薄緑（bg-[#bbf7d0]）に、通常は白（bg-white）に変化 */}
            const cardBg = isChecked ? "bg-[#bbf7d0] border-gray-800" : "bg-white border-gray-800";

            return (
              <div 
                key={item.id}
                onClick={() => handleToggle(item.id)}
                className="flex items-center gap-4 cursor-pointer"
              >
                {/* 自作チェックボックス（お手本通りの少し大きな正方形） */}
                <div className={`w-8 h-8 border-2 border-gray-400 rounded-md bg-white flex items-center justify-center text-xl font-bold text-gray-700 transition-colors shrink-0 ${isChecked ? 'border-gray-800' : ''}`}>
                  {isChecked && "✓"}
                </div>

                {/* 食材カードの見た目部分 */}
                <div className={`flex-1 rounded-2xl border-2 p-4 shadow-sm transition-colors relative ${cardBg}`}>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{item.name}</h3>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-gray-400 font-bold block text-xs mb-0.5">賞味期限</span>
                      <span className="text-base font-mono tracking-wide text-gray-600">{item.expiry}</span>
                    </div>
                    <span className={`${item.badgeBg} text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm`}>
                      あと{item.daysLeft}日
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 💛 下部の固定フッターアクションバー */}
      <div className="fixed bottom-0 left-0 w-full bg-[#facc15] py-4 px-6 border-t border-yellow-400 shadow-xl flex justify-center z-50">
        <button 
          onClick={() => window.history.back()} // レシピ提案画面へスッと戻る
          className="w-full max-w-md bg-[#16a34a] hover:bg-[#15803d] text-white text-xl font-bold py-4 rounded-2xl shadow transition-colors text-center"
        >
          選択した食材を使用する
        </button>
      </div>

    </div>
  );
}