import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        setError("Vartotojo vardas jau užimtas.");
        return;
      }

      const newUser = { username, password };
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      navigate("/login");
    } catch (err) {
      console.error("Klaida registruojantis:", err);
      setError("Įvyko klaida, bandykite dar kartą.");
    }
  };

  return (
    <div className="container">
      <h2>Registracija</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
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
        <button type="submit">Registruotis</button>
      </form>
      <button onClick={() => navigate("/")}>Grįžti į pagrindinį</button>
    </div>
  );
};

export default Register;
