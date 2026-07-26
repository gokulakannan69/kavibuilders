import React, { useState, useEffect } from "react";
import { AdminPanel } from "../components/admin";
import { supabase } from "../lib/supabase";

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen for auth changes (e.g. login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: username.trim().toLowerCase(),
      password: password,
    });

    if (authError) {
      setError(authError.message);
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </main>
    );
  }

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
            disabled={isSubmitting}
            className={`w-full py-3.5 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 hover:shadow-lg transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  );
}