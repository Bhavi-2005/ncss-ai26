import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Shield, User, Lock } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (localStorage.getItem("adminLoggedIn") === "true") {
      navigate("/admin");
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const envUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Simulate small delay for UX
    setTimeout(() => {
      if (username === envUsername && password === envPassword) {
        localStorage.setItem("adminLoggedIn", "true");
        toast.success("Successfully logged in as admin");
        navigate("/admin");
      } else {
        toast.error("Invalid username or password");
        setIsSubmitting(false);
      }
    }, 500);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors pl-10";

  const labelClass = "block mb-1.5 text-sm font-medium text-foreground";

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
      
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4 border border-primary/20">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            <span className="text-primary">Admin</span> Login
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Secure access for NCSS-AI'26 coordinators
          </p>
        </div>

        <form onSubmit={handleLogin} className="gradient-card rounded-2xl p-8 glow-border space-y-5 bg-background/50 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <div className="relative">
              <label className={labelClass} htmlFor="username">Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <User size={18} />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="relative">
              <label className={labelClass} htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Lock size={18} />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full gradient-button py-3 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {isSubmitting ? "Authenticating..." : "Sign In"}
          </button>
        </form>
        
        <p className="text-center mt-8 text-xs text-muted-foreground">
          &copy; 2026 NCSS-AI Conference Hub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
