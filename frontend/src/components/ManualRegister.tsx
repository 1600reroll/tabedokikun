import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ManualRegister() {
  const _react = React;
  const navigate = useNavigate();

  // 1つ目の手動登録食材の状態管理
  const [name1, setName1] = useState('');
  const [category1, setCategory1] = useState('fridge');
  const [expiry1, setExpiry1] = useState('');
  const [count1, setCount1] = useState(1);
  const [notice1, setNotice1] = useState(1);

  // 2つ目の手動登録食材の状態管理（💡 通知期限のステートを1つ目と完全に統一）
  const [name2, setName2] = useState('');
  const [category2, setCategory2] = useState('fridge');
  const [expiry2, setExpiry2] = useState('');
  const [count2, setCount2] = useState(1);
  const [notice2, setNotice2] = useState(1);

  // 登録完了ポップアップの状態管理
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleRegister = async () => {
    try {
      // 1つ目の食材が入力されていれば送信
      if (name1) {
        await fetch('http://localhost:8000/ingredients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name1,
            category: category1,
            expiry_date: expiry1 || '未設定',
            quantity: count1,
            notify_days: notice1
          })
        });
      }

      // 2つ目の食材が入力されていれば送信
      if (name2) {
        await fetch('http://localhost:8000/ingredients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name2,
            category: category2,
            expiry_date: expiry2 || '未設定',
            quantity: count2,
            notify_days: notice2
          })
        });
      }

      // エラーが起きずに送信できたら、成功ポップアップを表示
      setShowSuccessModal(true);
    } catch (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました。バックエンドが起動しているか確認してください。");
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
        <h1 className="text-xl font-bold tracking-wider text-right flex-1 pr-12">登録食材確認</h1>
      </div>

      <div className="max-w-md mx-auto px-4 pt-2">
        
        {/* 🏠 ホーム画面へ戻るボタンエリア */}
        <div className="w-full flex justify-end mb-3 pr-2">
          <button 
            onClick={() => navigate('/')}
            className="flex flex-col items-center justify-center gap-1 hover:opacity-70 transition-opacity"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
              <img 
                src="/home-black-icon.png" 
                alt="メイン画面へ" 
                className="w-5 h-5 object-contain" 
              />
            </div>
            <span className="text-[11px] font-bold text-gray-600 whitespace-nowrap tracking-tight">メイン画面</span>
          </button>
        </div>

        {/* ℹ️ 水色のアラートインフォ */}
        <div className="bg-[#ccfbf1] border border-[#99f6e4] rounded-2xl p-5 text-center mb-6 shadow-sm">
          <h4 className="font-bold text-[#0d9488] text-base mb-1">賞味期限と通知設定</h4>
          <p className="text-xs text-[#0f766e] font-medium">スキャンした商品の期限を確認してください</p>
        </div>

        <div className="space-y-6">
          
          {/* 📝 1つ目の食材入力欄 */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md">
            <div className="flex items-center gap-2 border-2 border-gray-700 rounded-xl px-4 py-1.5 bg-white mb-3 max-w-[200px]">
              <input 
                type="text" 
                placeholder="食材名を入力" 
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="font-bold text-lg text-gray-800 bg-transparent w-full focus:outline-none"
              />
              <span className="text-gray-400 text-sm shrink-0">📝</span>
            </div>

            <div className="mb-4 pl-2">
              <select 
                value={category1} 
                onChange={(e) => setCategory1(e.target.value)}
                className="border-2 border-gray-400 rounded-xl px-3 py-1 text-base font-bold text-gray-700 bg-white focus:outline-none"
              >
                <option value="fridge">冷蔵</option>
                <option value="room-temp">常温</option>
              </select>
            </div>

            <div className="space-y-4 pl-2">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">賞味期限</label>
                <input type="text" placeholder="年 / 月 / 日" value={expiry1} className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 text-base font-mono focus:outline-none focus:border-gray-500 bg-white" onChange={(e) => setExpiry1(e.target.value)} />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400">個数</label>
                <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setCount1(Math.max(1, count1 - 1))} className="px-4 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
                  {/* <span className="w-16 text-center font-bold text-lg">{count1}</span> */}
                  <input type="number" value={count1 === 0 ? "" : count1} onChange={(e) => setCount1(Number(e.target.value))} className="w-16 text-center font-bold text-lg bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
                  <button onClick={() => setCount1(count1 + 1)} className="px-4 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400">通知期限</label>
                <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setNotice1(Math.max(1, notice1 - 1))} className="px-4 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
                  <span className="w-24 text-center font-bold text-base">{notice1}日前</span>
                  <button onClick={() => setNotice1(notice1 + 1)} className="px-4 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
                </div>
              </div>
            </div>
          </div>

          {/* 📝 2つ目の食材入力欄（💡 こちらも個数と通知期限をすべて均等に表示） */}
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-md">
            <div className="flex items-center gap-2 border-2 border-gray-700 rounded-xl px-4 py-1.5 bg-white mb-3 max-w-[200px]">
              <input 
                type="text" 
                placeholder="食材名を入力" 
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="font-bold text-lg text-gray-800 bg-transparent w-full focus:outline-none"
              />
              <span className="text-gray-400 text-sm shrink-0">📝</span>
            </div>

            <div className="mb-4 pl-2">
              <select 
                value={category2} 
                onChange={(e) => setCategory2(e.target.value)}
                className="border-2 border-gray-400 rounded-xl px-3 py-1 text-base font-bold text-gray-700 bg-white focus:outline-none"
              >
                <option value="fridge">冷蔵</option>
                <option value="room-temp">常温</option>
              </select>
            </div>

            <div className="space-y-4 pl-2">
              <div>
                <label className="text-xs font-bold text-gray-400 block mb-1">賞味期限</label>
                <input type="text" placeholder="年 / 月 / 日" value={expiry2} className="w-full border-2 border-gray-300 rounded-xl px-4 py-2 text-base font-mono focus:outline-none focus:border-gray-500 bg-white" onChange={(e) => setExpiry2(e.target.value)} />
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400">個数</label>
                <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setCount2(Math.max(1, count2 - 1))} className="px-4 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
                  <span className="w-16 text-center font-bold text-lg">{count2}</span>
                  <button onClick={() => setCount2(count2 + 1)} className="px-4 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400">通知期限</label>
                <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
                  <button onClick={() => setNotice2(Math.max(1, notice2 - 1))} className="px-4 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
                  <span className="w-24 text-center font-bold text-base">{notice2}日前</span>
                  <button onClick={() => setNotice2(notice2 + 1)} className="px-4 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </div>

      {/* 💛 下部の登録ボタン */}
      <div className="fixed bottom-0 left-0 w-full bg-[#facc15] py-4 px-6 border-t border-yellow-400 shadow-xl flex justify-center z-40">
        <button 
          // onClick={() => setShowSuccessModal(true)}
          onClick={handleRegister}
          className="w-full max-w-md bg-[#ea580c] hover:bg-[#c2410c] text-white text-2xl font-bold py-4 rounded-3xl shadow transition-colors text-center"
        >
          登録
        </button>
      </div>

      {/* 🛑 登録完了モーダル */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl text-center border border-gray-100 flex flex-col items-center">
            <div className="w-20 h-20 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md mb-6">✓</div>
            <h3 className="font-bold text-2xl text-gray-900 mb-3">登録完了！</h3>
            <p className="text-gray-500 font-medium text-sm mb-8">正常に登録されました</p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/');
              }}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 rounded-2xl text-lg transition-colors shadow-md"
            >
              メイン画面に戻る
            </button>
          </div>
        </div>
      )}

    </div>
  );
}