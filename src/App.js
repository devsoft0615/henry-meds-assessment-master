import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AppLayout } from "./layout/AppLayout";
import { Provider } from "./pages/Provider/Provider";
import { Client } from "./pages/Client/Client";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="/provider" element={<Provider />} />
          <Route path="/client" element={<Client />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
