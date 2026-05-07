import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setToken }) {
  const [mode, setMode] = useState("login");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const url =
      mode === "login"
        ? `${import.meta.env.VITE_BACKEND_URL}/api/users/login`
        : `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`;

    const body =
      mode === "login"
        ? { email, password }
        : { nom, email, password };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Erreur");
      return;
    }

    localStorage.setItem("token", data.token);
    setToken(data.token);
    navigate("/admin");
  };

  return (
    <div className="page">
      <h1>{mode === "login" ? "Connexion" : "Créer un compte"}</h1>

      <form onSubmit={submitHandler} className="form">
        {mode === "signup" && (
          <>
            <label>Nom</label>
            <input value={nom} onChange={(e) => setNom(e.target.value)} required />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {mode === "login" ? "Se connecter" : "Créer le compte"}
        </button>
      </form>

      <button onClick={() => setMode(mode === "login" ? "signup" : "login")}>
        {mode === "login" ? "Créer un compte" : "Déjà un compte? Se connecter"}
      </button>
    </div>
  );
}

export default Login;