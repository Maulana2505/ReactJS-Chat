import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/login";
import RegisPage from "./page/regis";
import HomePage from "./page/home";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/regis" element={<RegisPage />} />
        <Route path="/" element={token ? <HomePage /> : <LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
