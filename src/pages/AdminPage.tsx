import React, { useState } from "react";
import { AdminPanel } from "../components/admin";

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedPassword = password.trim();
    
    if ((normalizedUsername === "kavilbuilders77@gmail.com" || normalizedUsername === "kavibuilders77@gmail.com") && normalizedPassword === "Kaviyarasu96@") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (isAuthenticated) {
    return (
      <main>
        <AdminPanel />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 py-20 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-gray-900 mb-2">Admin Portal</h2>
          <p className="text-gray-500 text-sm">Please sign in to access the dashboard</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center mb-6 border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 hover:shadow-lg transition-all duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}