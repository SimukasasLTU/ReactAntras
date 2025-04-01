import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Sveiki, {user?.username}!</h1>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/recipes")}>Peržiūrėti receptus</button>
        <button onClick={() => navigate("/favorites")}>Mėgstami receptai</button>
        <button onClick={() => navigate("/")}>Grįžti į pradžią</button>
        <button onClick={() => { logout(); navigate("/login"); }}>🚪 Atsijungti</button>
      </div>
    </div>
  );
};

export default Dashboard;
