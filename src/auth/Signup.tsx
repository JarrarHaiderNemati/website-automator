import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    const resp = await fetch(import.meta.env.VITE_JWT_LAMBDA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, action: "signup" }),
    });
    const data = await resp.json();
    if (!data.success) {
      alert("Signup failed. Please try again.");
      setStatus("Signup failed. Please try again.");
      return;
    }
    if (!data.token) {
      alert("Token issue. Please try again.");
      setStatus("Token issue. Please try again.");
      return;
    }
    localStorage.clear();
    localStorage.setItem("token", data.token);
    navigate("/default");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full text-black mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full text-black mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Create Account
        </button>

        <p onClick={()=>navigate('/')} className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 cursor-pointer">Login</span>
        </p>
      </form>
    </div>
  );
}