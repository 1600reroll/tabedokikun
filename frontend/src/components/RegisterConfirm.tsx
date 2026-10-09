// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function RegisterConfirm() {
//   const _react = React;
//   const navigate = useNavigate();
//   const location = useLocation();

//   // 1つ目の食材（牛乳）の状態管理
//   // const [milkCount, setMilkCount] = useState(1);
//   // const [milkNotice, setMilkNotice] = useState(1);

//   // // 2つ目の食材（ヨーグルト）の状態管理
//   // const [yogurtCount, setYogurtCount] = useState(1);
//   // const [yogurtNotice, setYogurtNotice] = useState(1);
//   // 1. スキャン画面から渡されたデータ（scannedItems）を受け取る
//   // （直接この画面を開いた時のエラーを防ぐため、データが無い場合は空配列をセット）
//   const initialItems = location.state?.scannedItems || [];
  
//   // 2. 受け取ったデータを丸ごと状態（State）として管理する
//   const [items, setItems] = useState<any[]>(initialItems);

//   // 登録完了ポップアップの状態管理
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   return (
//     <div className="min-h-screen bg-[#fefce8] pb-32 font-sans text-gray-800 text-left relative">
      
//       {/* 💛 上部の黄色いヘッダーバー */}
//       <div className="w-full bg-[#facc15] h-16 shadow-sm mb-4 px-6 flex items-center justify-between">
//         <button 
//           onClick={() => window.history.back()} 
//           className="text-3xl font-bold hover:opacity-70 transition-opacity flex items-center justify-start w-12 h-10"
//         >
//           ←
//         </button>
//         <h1 className="text-xl font-bold tracking-wider text-right flex-1 pr-12">登録食材確認</h1>
//       </div>

//       <div className="max-w-md mx-auto px-4 pt-2">
        
//         {/* 🏠 ホーム画面へ戻るボタンエリア（薄緑ボックスの上・右寄せ） */}
//         <div className="w-full flex justify-end mb-3 pr-2">
//           <button 
//             onClick={() => navigate('/')}
//             className="flex flex-col items-center justify-center gap-1 hover:opacity-70 transition-opacity"
//           >
//             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
//               <img 
//                 src="/home-black-icon.png" 
//                 alt="メイン画面へ" 
//                 className="w-5 h-5 object-contain" 
//               />
//             </div>
//             <span className="text-[11px] font-bold text-gray-600 whitespace-nowrap tracking-tight">メイン画面</span>
//           </button>
//         </div>

//         {/* ℹ️ 水色のアラートインフォ */}
//         <div className="bg-[#ccfbf1] border border-[#99f6e4] rounded-2xl p-5 text-center mb-6 shadow-sm">
//           <h4 className="font-bold text-[#0d9488] text-base mb-1">賞味期限と通知設定</h4>
//           <p className="text-xs text-[#0f766e] font-medium">スキャンした商品の期限を確認してください</p>
//         </div>

//         <div className="space-y-6">
          
//           {/* 🥛 1つ目の食材：牛乳 */}
//           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md">
//             <div className="flex justify-between items-center mb-1">
//               <div className="flex items-center gap-2 border-2 border-gray-700 rounded-full px-4 py-1 bg-white">
//                 <span className="font-bold text-xl text-gray-800">牛乳</span>
//                 <span className="text-gray-400 text-sm">📝</span>
//               </div>
//               <span className="bg-[#dcfce7] text-[#15803d] text-xs font-bold px-3 py-1 rounded-full">登録済み</span>
//             </div>
//             <p className="text-sm font-bold text-gray-400 pl-2 mb-4">冷蔵</p>

//             <div className="space-y-4 pl-2">
//               <div>
//                 <label className="text-xs font-bold text-gray-400 block mb-1">賞味期限</label>
//                 <div className="flex gap-2">
//                   <input type="text" placeholder="年 / 月 / 日" className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-2 text-base font-mono focus:outline-none focus:border-gray-500 bg-white" />
//                   {/* 📸 賞味期限の横のアイコンを icon-icons (2).png に変更 */}
//                   <button className="bg-[#0ea5e9] hover:opacity-90 text-white p-2 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
//                     <img src="/icon-icons (2).png" alt="scan" className="w-7 h-7 object-contain brightness-0 invert" />
//                   </button>
//                 </div>
//               </div>
              
//               {/* 個数（実際の画面に合わせた右寄せスタイル） */}
//               <div className="flex justify-between items-center pt-2">
//                 <label className="text-base font-bold text-gray-400">個数</label>
//                 <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
//                   <button onClick={() => setMilkCount(Math.max(1, milkCount - 1))} className="w-12 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
//                   <span className="w-16 text-center font-bold text-lg">{milkCount}</span>
//                   <button onClick={() => setMilkCount(milkCount + 1)} className="w-12 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
//                 </div>
//               </div>

//               {/* 通知期限 */}
//               <div className="flex justify-between items-center pt-2">
//                 <label className="text-base font-bold text-gray-400">通知期限</label>
//                 <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
//                   <button onClick={() => setMilkNotice(Math.max(1, milkNotice - 1))} className="w-12 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
//                   <span className="w-24 text-center font-bold text-base">{milkNotice}日前</span>
//                   <button onClick={() => setMilkNotice(milkNotice + 1)} className="w-12 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* 🍧 2つ目の食材：ヨーグルト（牛乳のコンポーネント構造と完全に統一） */}
//           <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md">
//             <div className="flex justify-between items-center mb-1">
//               <div className="flex items-center gap-2 border-2 border-gray-700 rounded-full px-4 py-1 bg-white">
//                 <span className="font-bold text-xl text-gray-800">ヨーグルト</span>
//                 <span className="text-gray-400 text-sm">📝</span>
//               </div>
//               <span className="bg-[#dcfce7] text-[#15803d] text-xs font-bold px-3 py-1 rounded-full">登録済み</span>
//             </div>
//             <p className="text-sm font-bold text-gray-400 pl-2 mb-4">冷蔵</p>

//             <div className="space-y-4 pl-2">
//               <div>
//                 <label className="text-xs font-bold text-gray-400 block mb-1">賞味期限</label>
//                 <div className="flex gap-2">
//                   <input type="text" placeholder="年 / 月 / 日" className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-2 text-base font-mono focus:outline-none focus:border-gray-500 bg-white" />
//                   {/* 📸 賞味期限の横のアイコンを icon-icons (2).png に変更 */}
//                   <button className="bg-[#0ea5e9] hover:opacity-90 text-white p-2 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
//                     <img src="/icon-icons (2).png" alt="scan" className="w-7 h-7 object-contain brightness-0 invert" />
//                   </button>
//                 </div>
//               </div>

//               {/* 個数 */}
//               <div className="flex justify-between items-center pt-2">
//                 <label className="text-base font-bold text-gray-400">個数</label>
//                 <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
//                   <button onClick={() => setYogurtCount(Math.max(1, yogurtCount - 1))} className="w-12 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
//                   <span className="w-16 text-center font-bold text-lg">{yogurtCount}</span>
//                   <button onClick={() => setYogurtCount(yogurtCount + 1)} className="w-12 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
//                 </div>
//               </div>

//               {/* 通知期限（💡 牛乳と同じ「日前」の表記・ロジックで綺麗に追加されました） */}
//               <div className="flex justify-between items-center pt-2">
//                 <label className="text-base font-bold text-gray-400">通知期限</label>
//                 <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
//                   <button onClick={() => setYogurtNotice(Math.max(1, yogurtNotice - 1))} className="w-12 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50">-</button>
//                   <span className="w-24 text-center font-bold text-base">{yogurtNotice}日前</span>
//                   <button onClick={() => setYogurtNotice(yogurtNotice + 1)} className="w-12 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50">+</button>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* 💛 下部の登録ボタン */}
//       <div className="fixed bottom-0 left-0 w-full bg-[#facc15] py-4 px-6 border-t border-yellow-400 shadow-xl flex justify-center z-40">
//         <button 
//           onClick={() => setShowSuccessModal(true)}
//           className="w-full max-w-md bg-[#ea580c] hover:bg-[#c2410c] text-white text-2xl font-bold py-4 rounded-3xl shadow transition-colors text-center"
//         >
//           登録
//         </button>
//       </div>

//       {/* 🛑 登録完了モーダル */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
//           <div className="bg-white w-full max-w-xs rounded-3xl p-6 shadow-2xl text-center border border-gray-100 flex flex-col items-center">
//             <div className="w-20 h-20 bg-[#16a34a] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md mb-6">✓</div>
//             <h3 className="font-bold text-2xl text-gray-900 mb-3">登録完了！</h3>
//             <p className="text-gray-500 font-medium text-sm mb-8">正常に登録されました</p>
//             <button 
//               onClick={() => {
//                 setShowSuccessModal(false);
//                 navigate('/');
//               }}
//               className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-bold py-4 rounded-2xl text-lg transition-colors shadow-md"
//             >
//               メイン画面に戻る
//             </button>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RegisterConfirm() {
  const navigate = useNavigate();
  const location = useLocation(); // 💡 前の画面から渡されたデータを受け取るためのフック

  // 1. スキャン画面から渡されたデータ（scannedItems）を受け取る
  // （直接この画面を開いた時のエラーを防ぐため、データが無い場合は空配列をセット）
  const initialItems = location.state?.scannedItems || [];
  
  // 2. 受け取ったデータを丸ごと状態（State）として管理する
  const [items, setItems] = useState<any[]>(initialItems);

  // 登録完了ポップアップの状態管理
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 3. 個数や日数を変更するための共通関数
  // どの商品の（index）、どの項目（field）を、どんな値（value）にするかを指定して更新します
  const handleUpdate = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
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
              <img src="/home-black-icon.png" alt="メイン画面へ" className="w-5 h-5 object-contain" />
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
          
          {/* 🥛 受け取ったデータ（items）の数だけ、自動でカードを作成（map）する */}
          {items.map((item, index) => (
            <div key={item.id || index} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 border-2 border-gray-700 rounded-full px-4 py-1 bg-white">
                  <span className="font-bold text-xl text-gray-800">{item.name}</span>
                  <span className="text-gray-400 text-sm">📝</span>
                </div>
                <span className="bg-[#dcfce7] text-[#15803d] text-xs font-bold px-3 py-1 rounded-full">登録済み</span>
              </div>
              <p className="text-sm font-bold text-gray-400 pl-2 mb-4">{item.category}</p>

              <div className="space-y-4 pl-2">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">賞味期限</label>
                  <div className="flex gap-2">
                    {/* 賞味期限も編集できるように連動 */}
                    <input 
                      type="text" 
                      placeholder="年 / 月 / 日" 
                      value={item.expiry_date || ''}
                      onChange={(e) => handleUpdate(index, 'expiry_date', e.target.value)}
                      className="flex-1 border-2 border-gray-300 rounded-xl px-4 py-2 text-base font-mono focus:outline-none focus:border-gray-500 bg-white" 
                    />
                    <button className="bg-[#0ea5e9] hover:opacity-90 text-white p-2 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <img src="/icon-icons (2).png" alt="scan" className="w-7 h-7 object-contain brightness-0 invert" />
                    </button>
                  </div>
                </div>
                
                {/* 個数 */}
                <div className="flex justify-between items-center pt-2">
                  <label className="text-base font-bold text-gray-400">個数</label>
                  <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
                    <button 
                      onClick={() => handleUpdate(index, 'quantity', Math.max(1, item.quantity - 1))} 
                      className="w-12 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50"
                    >-</button>
                    <span className="w-16 text-center font-bold text-lg">{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdate(index, 'quantity', item.quantity + 1)} 
                      className="w-12 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50"
                    >+</button>
                  </div>
                </div>

                {/* 通知期限 */}
                <div className="flex justify-between items-center pt-2">
                  <label className="text-base font-bold text-gray-400">通知期限</label>
                  <div className="flex items-center border-2 border-gray-700 rounded-xl overflow-hidden bg-white">
                    <button 
                      onClick={() => handleUpdate(index, 'notify_days', Math.max(1, item.notify_days - 1))} 
                      className="w-12 py-2 font-bold text-xl border-r border-gray-300 bg-gray-50"
                    >-</button>
                    <span className="w-24 text-center font-bold text-base">{item.notify_days}日前</span>
                    <button 
                      onClick={() => handleUpdate(index, 'notify_days', item.notify_days + 1)} 
                      className="w-12 py-2 font-bold text-xl border-l border-gray-300 bg-gray-50"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* 💛 下部の登録ボタン（ここから丸ごと削除！） */}
      {/* <div className="fixed bottom-0 left-0 w-full bg-[#facc15] py-4 px-6 border-t border-yellow-400 shadow-xl flex justify-center z-40">
        <button 
          onClick={() => setShowSuccessModal(true)}
          className="w-full max-w-md bg-[#ea580c] hover:bg-[#c2410c] text-white text-2xl font-bold py-4 rounded-3xl shadow transition-colors text-center"
        >
          登録
        </button>
      </div>

      {/* 🛑 登録完了モーダル（ここも丸ごと削除！） */}
      {/* {showSuccessModal && (
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
      )} */}

    </div>
  );
}