// 💡 画面上にエラーを直接表示するための関数
import React from 'react'; 
import { createRoot } from "react-dom/client";

// 💡 画面上のエラー表示システム（そのまま残しておきます）
window.addEventListener('error', (event) => {
  const errorDiv = document.getElementById('root');
  if (errorDiv) {
    errorDiv.innerHTML = `
      <div style="padding: 20px; color: red; background: #fee2e2; border: 1px solid red; font-family: monospace; white-space: pre-wrap;">
        <h2>🚨 フロントエンドでエラーが発生しました</h2>
        <p><strong>メッセージ:</strong> ${event.message}</p>
        <p><strong>ファイル:</strong> ${event.filename}</p>
        <p><strong>行/列:</strong> ${event.lineno}:${event.colno}</p>
        <p><strong>スタックトレース:</strong><br>${event.error?.stack || 'なし'}</p>
      </div>
    `;
  }
});

import App from "./app/app.tsx";
import "./styles/index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(<App />);