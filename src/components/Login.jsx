import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Nepavyko prisijungti prie serverio.");
      }
      const users = await response.json();
      
      console.log("Visi vartotojai:", users); 

      const foundUser = users.find(
        (user) =>
          user.username.trim() === username.trim() && user.password === password
      );

      if (foundUser) {
        setIsAuthenticated(true);
        setUser(foundUser);
        localStorage.setItem("user", JSON.stringify(foundUser));

        navigate("/dashboard");
      } else {
       
        const userExists = users.some(user => user.username.trim() === username.trim());
        if (!userExists) {
          setError("Vartotojas su tokiu vardu neegzistuoja.");
        } else {
          setError("Neteisingas slaptažodis.");
        }
      }
    } catch (err) {
      console.error("Klaida prisijungiant:", err);
      setError("Įvyko klaida, bandykite dar kartą.");
    }
  };

  return (
    <div className="container">
      <h2>Prisijungimas</h2>
      {/* Rodyti klaidos pranešimą, jei jis yra */}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Vartotojo vardas"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Prisijungti</button>
      </form>
      {/* Grįžti į pagrindinį puslapį */}
      <button onClick={() => navigate("/")}>Grįžti į pagrindinį</button>
    </div>
  );
};

export default Login;
