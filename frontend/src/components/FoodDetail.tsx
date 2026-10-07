import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FoodDetail() {
  const _react = React;
  const navigate = useNavigate();
  const { category, id } = useParams<{ category: string; id: string }>();
  const [foodItem, setFoodItem] = useState<any>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeletedModal, setShowDeletedModal] = useState(false);

  // useEffect(() => {
  //   const localFoods = localStorage.getItem('my_food_list');
  //   if (localFoods) {
  //     const allFoods = JSON.parse(localFoods);
  //     const foundItem = allFoods.find((item: any) => item.id.toString() === id);
  //     setFoodItem(foundItem);
  //   }
  // }, [id]);
  useEffect(() => {
    // 💡 バックエンドから全ての食材を取得し、URLのidと一致するものを探します
    fetch('http://localhost:8000/ingredients')
      .then(res => res.json())
      .then((data: any[]) => {
        const foundItem = data.find((item: any) => item.id.toString() === id);
        setFoodItem(foundItem);
      })
      .catch(err => console.error("データ取得失敗", err));
  }, [id]);

  if (!foodItem) {
    return <div className="min-h-screen bg-[#fefce8] flex justify-center items-center">読み込み中...</div>;
  }

  const getRemainingDays = (expiryDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDateStr);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getRemainingDays(foodItem.expiry_date);

  // const handleDelete = () => {
  //   const localFoods = localStorage.getItem('my_food_list');
  //   if (localFoods) {
  //     const allFoods = JSON.parse(localFoods);
  //     const newFoods = allFoods.filter((item: any) => item.id.toString() !== id);
  //     localStorage.setItem('my_food_list', JSON.stringify(newFoods));
  //   }
  //   setShowConfirmModal(false);
  //   setShowDeletedModal(true);
  // };

  const handleDelete = async () => {
  try {
    // 1. バックエンドに削除リクエストを送る（データベースから消す）
    const response = await fetch(`http://127.0.0.1:8000/ingredients/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // 2. 成功したら確認画面を閉じて、完了画面を開く
      setShowConfirmModal(false);
      setShowDeletedModal(true);
    } else {
      console.error("削除に失敗しました");
      alert("削除に失敗しました。");
    }
  } catch (error) {
    console.error("通信エラー:", error);
    alert("通信エラーが発生しました。サーバーが起動しているか確認してください。");
  }
};

  const isFridge = category === 'fridge' || foodItem.category === 'fridge';
  const categoryBadgeColor = isFridge ? "bg-[#bae6fd] text-[#0284c7]" : "bg-[#fed7aa] text-[#c2410c]";
  const categoryLabel = isFridge ? "冷蔵" : "常温";

  return (
    <div className="min-h-screen bg-[#fefce8] flex flex-col font-sans text-gray-800 text-left relative">
      {/* 💛 ヘッダー */}
      <div className="w-full bg-[#facc15] h-16 shadow-sm mb-4 px-6 flex items-center justify-between shrink-0">
        <button onClick={() => window.history.back()} className="text-3xl font-bold hover:opacity-70 transition-opacity flex items-center justify-start w-12 h-10">←</button>
        <h1 className="text-xl font-bold tracking-wider text-right flex-1 pr-2">食材の確認</h1>
      </div>

      <div className="max-w-md mx-auto px-4 space-y-6 flex-1 w-full pb-6">
        
        {/* 📋 食材詳細カード */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative">
          <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">{foodItem.name}</h2>
          <span className={`${categoryBadgeColor} text-xs font-bold px-3 py-1 rounded-full mb-6 inline-block`}>
            {categoryLabel}
          </span>

          <div className="space-y-3">
            <div className="bg-[#f8fafc] rounded-2xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-xl">📅</span>
                <div>
                  <div className="text-xs font-bold text-gray-500 mb-0.5">賞味期限</div>
                  <div className="text-sm font-bold font-mono tracking-wide">{foodItem.expiry}</div>
                </div>
              </div>
              <span className="text-[#ea580c] font-bold text-sm">
                {daysLeft <= 0 ? "期限切れ" : `あと${daysLeft}日`}
              </span>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-4 flex items-center gap-3">
              <span className="text-gray-400 text-xl">🔔</span>
              <div>
                <div className="text-xs font-bold text-gray-500 mb-0.5">通知設定</div>
                <div className="text-sm font-bold tracking-wide">{foodItem.notify_days}日前に通知</div>
              </div>
            </div>

            <div className="bg-[#f8fafc] rounded-2xl p-4 flex items-center gap-3">
              <span className="text-gray-400 text-xl">📦</span>
              <div>
                <div className="text-xs font-bold text-gray-500 mb-0.5">数量</div>
                <div className="text-sm font-bold tracking-wide">{foodItem.quantity}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-4">
            <div className="text-xs font-bold text-gray-500 mb-0.5">登録日</div>
            <div className="text-sm font-bold font-mono tracking-wide">
              {/* {new Date().toISOString().split('T')[0]} */}
              {foodItem.created_at.split(' ')[0]}
            </div>
          </div>
        </div>

        {/* 🍳 おすすめレシピエリア */}
        <div className="bg-[#fef9c3] rounded-3xl p-6 shadow-sm border border-[#fef08a]">
          <h3 className="text-lg font-bold text-[#78350f] mb-1">おすすめレシピ</h3>
          <p className="text-xs text-[#92400e] mb-4 font-medium">この食材を使ったレシピがあります</p>
          
          {/* 👇 ここに onClick={() => navigate('/recipes')} を追加してレシピ提案画面へ飛ばします */}
          <button 
            onClick={() => navigate('/recipes')}
            className="w-full bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold py-3 rounded-xl transition-colors"
          >
            レシピを見る
          </button>
        </div>
      </div>

      {/* 🔘 アクションボタン群 */}
      <div className="bg-white rounded-t-3xl p-6 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] max-w-md mx-auto w-full">
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 rounded-2xl shadow-sm transition-colors text-lg mb-3"
        >
          メイン画面に戻る
        </button>
        
        <button 
          onClick={() => setShowConfirmModal(true)}
          className="w-full bg-white hover:bg-red-50 text-[#ef4444] border-2 border-[#fecaca] font-bold py-4 rounded-2xl transition-colors text-lg flex justify-center items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          削除する
        </button>
      </div>

      {/* 🛑 削除確認モーダル */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center border border-gray-100">
            <h3 className="font-bold text-3xl text-gray-900 mb-8 leading-relaxed">
              "{foodItem.name}" を<br />削除しますか？
            </h3>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-4 rounded-2xl text-xl transition-colors shadow-sm"
              >
                いいえ
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 bg-[#e60000] hover:bg-red-700 text-white font-bold py-4 rounded-2xl text-xl transition-colors shadow-md"
              >
                はい
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ 削除完了モーダル */}
      {showDeletedModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center border border-gray-100 flex flex-col items-center">
            <h3 className="font-bold text-3xl text-gray-900 mb-10 mt-4">削除しました！</h3>
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 rounded-2xl text-2xl transition-colors shadow-md"
            >
              メイン画面に戻る
            </button>
          </div>
        </div>
      )}

    </div>
  );
}