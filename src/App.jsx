import {
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import SettingPage from "./pages/SettingPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header";
import ReportPage from "./pages/ReportPage";
// import "./index.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/report" element={<ReportPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

    </div>
  );
}


export default App;

