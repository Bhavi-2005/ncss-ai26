import { Link } from "react-router-dom";
import { CheckCircle2, Home, Mail } from "lucide-react";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <CheckCircle2 className="h-24 w-24 text-primary relative z-10" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Registration <span className="text-primary">Successful!</span>
          </h1>
          <div className="space-y-2 text-muted-foreground">
            <p className="text-lg">Thank you for registering for NCSS.AI'26.</p>
            <p className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4" />
              A confirmation email has been sent to your inbox.
            </p>
          </div>
        </div>

        <div className="gradient-card p-6 rounded-2xl glow-border">
          <p className="text-sm text-muted-foreground mb-6">
            We're excited to have you join us. Please keep the confirmation email for your records.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full gradient-button px-8 py-3 font-semibold text-primary-foreground btn-glow transition-all"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
