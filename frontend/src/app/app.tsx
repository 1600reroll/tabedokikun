import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDashboard from '../components/MainDashboard';
import FoodList from '../components/FoodList';
import FoodDetail from '../components/FoodDetail';
import IngredientRegistration from '../components/IngredientRegistration';
import RecipeSuggestion from '../components/RecipeSuggestion';
import RecipeDetail from '../components/RecipeDetail';
import SelectIngredients from '../components/SelectIngredients';
import RegisterConfirm from '../components/RegisterConfirm';
import ManualRegister from '../components/ManualRegister'; // 💡 追加

export default function App() {
  const _react = React;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainDashboard />} />
        <Route path="/list/:category" element={<FoodList />} />
        <Route path="/food/:category/:id" element={<FoodDetail />} />
        <Route path="/register" element={<IngredientRegistration />} />
        <Route path="/recipes" element={<RecipeSuggestion />} />
        <Route path="/recipe/pulgogi" element={<RecipeDetail />} />
        <Route path="/select-ingredients" element={<SelectIngredients />} />
        <Route path="/register-confirm" element={<RegisterConfirm />} />
        {/* 💡 手動登録画面のルートを追加 */}
        <Route path="/manual-register" element={<ManualRegister />} />
      </Routes>
    </BrowserRouter>
  );
}