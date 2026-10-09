import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FoodList() {
  const _react = React;
  const navigate = useNavigate();
  const { category } = useParams<{ category: string }>();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const currentCategory = category || 'fridge';
    // let allFoods: any[] = [];
    // const localFoods = localStorage.getItem('my_food_list');
    
    // // 💾 1. セーブデータがあれば読み込む
    // if (localFoods) {
    //   try {
    //     allFoods = JSON.parse(localFoods);
    //   } catch (e) {
    //     allFoods = [];
    //   }
    // }

    // // 今のカテゴリ（fridgeなど）のデータだけを抽出
    // let filtered = allFoods.filter((item: any) => item.category === currentCategory);

    // // 🚨 2. 自己修復ロジック：抽出した結果が0件だった場合（古いデータが残っている場合）
    // // 強制的に設計図通りの新しいダミーデータを生成して上書き保存します！
    // if (filtered.length === 0) {
    //   const defaultFridge = [
    //     { id: 101, name: "牛乳", expiry: getFutureDateStr(4), category: "fridge", quantity: "1本" },
    //     { id: 102, name: "卵", expiry: getFutureDateStr(5), category: "fridge", quantity: "1パック" },
    //     { id: 103, name: "ヨーグルト", expiry: getFutureDateStr(12), category: "fridge", quantity: "1個" },
    //     { id: 104, name: "チーズ", expiry: getFutureDateStr(18), category: "fridge", quantity: "1袋" },
    //     { id: 105, name: "豆腐", expiry: getFutureDateStr(3), category: "fridge", quantity: "1丁" },
    //   ];
    //   const defaultRoomTemp = [
    //     { id: 1, name: "パン", expiry: getFutureDateStr(4), category: "room-temp", quantity: "1袋" },
    //     { id: 2, name: "お米", expiry: getFutureDateStr(60), category: "room-temp", quantity: "5kg" },
    //   ];
      
    //   // まとめてセーブデータを上書き
    //   allFoods = [...defaultFridge, ...defaultRoomTemp];
    //   localStorage.setItem('my_food_list', JSON.stringify(allFoods));

    //   // 画面に表示するリストをセット
    //   filtered = currentCategory === 'room-temp' ? defaultRoomTemp : defaultFridge;
    // }

    // setItems(filtered);

    // バックエンドからデータを取得
    fetch('http://localhost:8000/ingredients')
      .then(res => res.json())
      .then((data: any[]) => {
        // 現在のカテゴリー（fridge または room-temp）に一致するデータだけを抽出
        const filtered = data.filter(item => item.category === currentCategory);
        const sortedData = filtered.sort((a, b) => {
          return new Date(a.expiry_date).getTime() - new Date(b.expiry_date).getTime();
        });
        // setItems(filtered);
        setItems(sortedData);
      })
      .catch(err => console.error("データ取得失敗", err));
  }, [category]);

  // 今日の日付から「設計図通りの残り日数」を足した日付文字列(YYYY-MM-DD)を作る関数
  const getFutureDateStr = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  };

  const title = category === 'room-temp' ? '常温リスト' : '冷蔵リスト';

  // 残り日数を計算する関数
  const getRemainingDays = (expiryDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDateStr);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-[#fefce8] pb-12 font-sans text-gray-800 text-left">
      {/* ヘッダー */}
      <div className="w-full bg-[#facc15] h-16 shadow-sm mb-4 px-6 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="text-3xl font-bold hover:opacity-70 transition-opacity flex items-center justify-start w-12 h-10">←</button>
        <h1 className="text-xl font-bold tracking-wider text-right flex-1 pr-2">{title}</h1>
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* 件数・並び替え */}
        <div className="flex justify-between items-center mb-4 text-gray-600 font-medium px-2">
          <span className="text-lg">全{items.length}件</span>
          <button className="text-blue-600 hover:underline">並び替え</button>
        </div>

        {/* リスト部分 */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const daysLeft = getRemainingDays(item.expiry_date);
            
            // 🎨 設計図のデザイン（カラーシステム）を完全に再現
            let cardBgColor = "bg-white border-gray-400";
            let badgeColor = "bg-[#bbf7d0] text-[#16a34a] border-[#16a34a]";
            
            if (daysLeft <= 0) {
              // 期限切れ
              cardBgColor = "bg-gray-100 border-gray-400 opacity-60";
              badgeColor = "bg-gray-300 text-gray-600 border-gray-500";
            } else if (daysLeft <= 4) {
              // あと4日以下（牛乳・豆腐など赤系）
              cardBgColor = "bg-[#fee2e2] border-[#fca5a5]"; 
              badgeColor = "bg-[#fecaca] text-[#ef4444] border-[#ef4444]";
            } else if (daysLeft === 5) {
              // あと5日（卵など黄色系）
              cardBgColor = "bg-[#fef9c3] border-[#fde047]"; 
              badgeColor = "bg-[#fef08a] text-[#ca8a04] border-[#ca8a04]";
            } else {
              // あと12日以上（ヨーグルト・チーズなど緑系）
              cardBgColor = "bg-white border-gray-300"; 
              badgeColor = "bg-[#dcfce7] text-[#15803d] border-[#15803d]";
            }
            
            return (
              <div
                key={index}
                onClick={() => navigate(`/food/${category || 'fridge'}/${item.id}`)}
                className={`w-full ${cardBgColor} rounded-2xl border-2 p-4 shadow-sm hover:opacity-90 transition-opacity cursor-pointer block relative`}
              >
                {/* カード上部：名前と期限バッジ */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-2xl text-gray-900 tracking-wide">{item.name}</h3>
                  <span className={`${badgeColor} text-xs font-bold px-2.5 py-0.5 rounded-full border shadow-sm`}>
                    {daysLeft <= 0 ? "期限切れ" : `あと${daysLeft}日`}
                  </span>
                </div>

                {/* カード下部：賞味期限日付 */}
                <div className="flex justify-between items-end mt-4">
                  <span className="text-gray-500 font-bold text-sm">賞味期限</span>
                  <span className="text-lg font-bold font-mono tracking-wide text-gray-600">{item.expiry_date}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}