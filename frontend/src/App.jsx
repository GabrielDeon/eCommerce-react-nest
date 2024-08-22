import ShopPage from "./pages/ShopPage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
