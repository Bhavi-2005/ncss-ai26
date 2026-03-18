import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Guidelines from "./pages/Guidelines";
import Topics from "./pages/Topics";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";
  return isAdmin ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
