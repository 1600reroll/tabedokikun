import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
from backend import db

load_dotenv()

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://localhost:5174",  
    "capacitor://localhost",  
    "http://localhost"        
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db.init_db()

try:
    client = genai.Client()
except Exception as e:
    print(f"⚠️ Gemini APIの初期化に失敗: {e}")
    client = None

class RecipeRequest(BaseModel):
    ingredients: str

@app.post("/recipe")
async def create_recipe(request: RecipeRequest):
    if not client:
        raise HTTPException(status_code=500, detail="APIキーが設定されていません。")

    prompt = f"""
    以下の食材を使ってレシピを考えてください: {request.ingredients}
    必ず以下のJSONスキーマに従ってデータを出力してください。
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema={
                    "type": "OBJECT",
                    "properties": {
                        "name": {"type": "STRING", "description": "料理名"},
                        "time": {"type": "STRING", "description": "調理時間（例: 15分）"},
                        "servings": {"type": "STRING", "description": "何人前か"},
                        "difficulty": {"type": "STRING", "description": "難易度（簡単、普通、難しい）"},
                        "description": {"type": "STRING", "description": "料理の簡単な説明"},
                        "ingredients": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "材料リスト"},
                        "steps": {"type": "ARRAY", "items": {"type": "STRING"}, "description": "調理手順のリスト"}
                    },
                    "required": ["name", "time", "servings", "difficulty", "description", "ingredients", "steps"]
                },
            ),
        )
        recipe_json = response.text

        # 構造化されたJSON文字列をそのままDBに保存
        db.add_history(request.ingredients, recipe_json)

        # フロント側で JSON.parse() できる形式で返す
        return {"recipe": recipe_json}
    
    except Exception as e:
        print(f"Gemini API エラー: {e}")
        raise HTTPException(status_code=500, detail="レシピの生成に失敗しました。")

@app.get("/history")
async def get_history(limit: int = 5):
    try:
        return db.get_history(limit)
    except Exception as e:
        print(f"DB エラー: {e}")
        raise HTTPException(status_code=500, detail="履歴の取得に失敗しました。")

# --- 食材登録のためのデータ構造 ---
class IngredientRequest(BaseModel):
    name: str
    category: str       # 冷蔵 or 常温
    expiry_date: str    # 賞味期限 (例: "2026-10-10")
    quantity: int       # 個数
    notify_days: int    # 通知期限 (例: 1)

# --- 食材を登録するAPI ---
@app.post("/ingredients")
async def register_ingredient(req: IngredientRequest):
    try:
        # ここでデータベース(db.py)へ保存する処理を呼び出します
        db.add_ingredient(req.name, req.category, req.expiry_date, req.quantity, req.notify_days)
        return {"message": "食材が登録されました！", "data": req}
    except Exception as e:
        print(f"DB エラー: {e}")
        raise HTTPException(status_code=500, detail="食材の登録に失敗しました。")

# --- ついでに：登録した食材一覧を取得するAPI ---
@app.get("/ingredients")
async def get_ingredients():
    try:
        # データベース(db.py)から食材一覧を取得する処理
        return db.get_ingredients()
        
        return {"ingredients": []} # とりあえず空のリストを返しておく
    except Exception as e:
        raise HTTPException(status_code=500, detail="食材の取得に失敗しました。")