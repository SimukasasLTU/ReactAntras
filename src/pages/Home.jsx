import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>👋 Sveiki atvykę!</h1>
      <p>Pasirinkite veiksmą:</p>
      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>🔐 Prisijungti</button>
        <button onClick={() => navigate("/register")}>📝 Registruotis</button>
      </div>
    </div>
  );
};

export default Home;
