import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "tabedoki.db")

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ingredients TEXT NOT NULL,
            recipe TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    #食材管理テーブル
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            expiry_date TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            notify_days INTEGER NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def add_history(ingredients: str, recipe: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO history (ingredients, recipe) VALUES (?, ?)",
        (ingredients, recipe)
    )
    conn.commit()
    conn.close()

def get_history(limit: int = 5):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute(
        "SELECT ingredients, recipe, created_at FROM history ORDER BY id DESC LIMIT ?",
        (limit,)
    )
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

#食材データを読み書きするための関数

def add_ingredient(name: str, category: str, expiry_date: str, quantity: int, notify_days: int):
    """新しい食材をデータベースに保存する"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO ingredients (name, category, expiry_date, quantity, notify_days) VALUES (?, ?, ?, ?, ?)",
        (name, category, expiry_date, quantity, notify_days)
    )
    conn.commit()
    conn.close()

def get_ingredients():
    """保存されている食材をすべて取得する（賞味期限が近い順）"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    # expiry_date（賞味期限）が早い順（ASC）に並べて取得します
    cursor.execute("SELECT * FROM ingredients ORDER BY expiry_date ASC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]