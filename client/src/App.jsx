import { Routes, Route, BrowserRouter } from "react-router-dom";
import Gameplay from "../src/Gameplay.jsx";
import Fpage from "../Pages1/Fpage.jsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Fpage />} />
      <Route path="/gameplay" element={<Gameplay />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;