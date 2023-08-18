import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import OnePost from "./pages/OnePost";
import HelloPage from "./pages/HelloPage";
import ByUserIdPage from "./pages/ByUserIdPage";
import ErrorPage from "./pages/ErrorPage";
function App() {
  // компонент App.jsx служит только для роутинга по всему сайту. В Routes прописываем все нужные нам страницы и также добавляем страницу с ошибкой
  // если вдруг пользователь перейдет на страницу с несуществующим роутом, то ему отобразится ErrorPage
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HelloPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:id" element={<OnePost />} />
          <Route path="byUserId" element={<ByUserIdPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
