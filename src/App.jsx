import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/login";
import RegisPage from "./page/regis";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/regis" element={<RegisPage />} />
      </Routes>
    </>
  );
}

export default App;
