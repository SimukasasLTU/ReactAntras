import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

// Nauji komponentai:
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import Favorites from "./pages/Favorites";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Vieši puslapiai */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Apsaugoti puslapiai */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <Recipes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
