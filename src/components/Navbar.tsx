import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Guidelines", path: "/guidelines" },
  { label: "Topics", path: "/topics" },
  { label: "Register", path: "/register" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [adminClickCount, setAdminClickCount] = useState(0);

  // Reset click count after 3 seconds of inactivity
  useEffect(() => {
    if (adminClickCount > 0) {
      const timer = setTimeout(() => {
        setAdminClickCount(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [adminClickCount]);

  const handleLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    const newCount = adminClickCount + 1;
    if (newCount === 5) {
      e.preventDefault();
      setAdminClickCount(0);
      navigate("/admin-login");
    } else {
      setAdminClickCount(newCount);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-2" onClick={handleLogoClick}>
          <span className="font-display text-xs sm:text-sm font-bold text-primary">NCSS.AI'26</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/register"
            className="ml-2 rounded-full gradient-button px-5 py-2 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200"
          >
            Register Now
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground p-1">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 sm:px-6 pb-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="block w-full rounded-full gradient-button px-4 py-3 text-sm font-semibold text-primary-foreground btn-glow text-center mt-2 transition-all duration-200"
          >
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
