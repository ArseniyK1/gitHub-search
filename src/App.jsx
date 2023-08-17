import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import OnePost from "./pages/OnePost";
import HelloPage from "./pages/HelloPage";
import ByUserIdPage from "./pages/ByUserIdPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HelloPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/:id" element={<OnePost />} />
          <Route path="byUserId" element={<ByUserIdPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
