import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<h1>Bienvenida a DulceFran 🍩</h1>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;