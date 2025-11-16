import { BrowserRouter, Routes, Route } from "react-router-dom";
import Instapay from "./pages/Instapay";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="h-dvh w-full flex justify-center">
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/insta" element={<Instapay />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<h1>Error 404 | Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
