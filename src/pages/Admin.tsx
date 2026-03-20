import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../lib/firebase";
import { LogOut, FileSpreadsheet, Download, Eye, FileText } from "lucide-react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin-login");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== "adminncssai26@gmail.com") {
        localStorage.removeItem("admin");
        navigate("/admin-login");
      }
    });

    const fetchRegistrations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "registrations"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort descending by submittedAt
        data.sort((a: any, b: any) => {
          const dateA = a.submittedAt?.toDate ? a.submittedAt.toDate() : new Date(a.submittedAt);
          const dateB = b.submittedAt?.toDate ? b.submittedAt.toDate() : new Date(b.submittedAt);
          return dateB.getTime() - dateA.getTime();
        });

        setRegistrations(data);
      } catch (err: any) {
        console.error(err);
        setError("Unable to load registrations.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRegistrations();

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("admin");
      toast.success("Successfully logged out");
      navigate("/admin-login");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const exportToExcel = () => {
    try {
      const exportData = registrations.map((reg) => {
        const date = reg.submittedAt?.toDate ? reg.submittedAt.toDate() : new Date(reg.submittedAt);
        return {
          "Name": reg.name,
          "Team Name": reg.teamName || "Individual",
          "Email": reg.email,
          "Phone": reg.phone,
          "College": reg.college,
          "Department": reg.department,
          "Year": reg.year,
          "Category": reg.category,
          "Paper Topic": reg.paperTopic === "Other" ? reg.customTopic : reg.paperTopic,
          "Participation Type": reg.participationType,
          "Hardcopy": reg.hardcopy ? "Yes" : "No",
          "Team Members": reg.members?.join(", ") || "None",
          "Abstract": reg.abstractURL || "N/A",
          "Payment Screenshot": reg.paymentScreenshot || "N/A",
          "Transaction ID": reg.transactionId,
          "Submitted Time": date.toLocaleString("en-GB")
        };
      });

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
      XLSX.writeFile(workbook, `NCSS_AI_26_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success("Data exported to Excel successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export data to Excel");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center text-lg text-muted-foreground font-medium animate-pulse">
          Loading registrations...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center text-lg text-destructive font-medium">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
              <span className="text-primary">Admin</span> Dashboard
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Review all participant registrations.</p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportToExcel}
              className="flex items-center gap-2 rounded-xl gradient-button px-5 py-2.5 text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200"
            >
              <FileSpreadsheet size={18} />
              Export Excel
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-5 py-2.5 text-sm font-semibold text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
        
        <div className="bg-secondary/50 rounded-2xl overflow-hidden shadow-xl border border-border/50 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-foreground whitespace-nowrap">
              <thead className="bg-primary/5 text-primary uppercase font-bold text-[10px] tracking-wider border-b border-border">
                <tr>
                  <th className="px-4 py-4 md:px-6">Name</th>
                  <th className="px-4 py-4 md:px-6">Team Name</th>
                  <th className="px-4 py-4 md:px-6">Email</th>
                  <th className="px-4 py-4 md:px-6">Details</th>
                  <th className="px-4 py-4 md:px-6">Topic</th>
                  <th className="px-4 py-4 md:px-6">Team Members</th>
                  <th className="px-4 py-4 md:px-6 text-center">Hardcopy</th>
                  <th className="px-4 py-4 md:px-6">Transaction ID</th>
                  <th className="px-4 py-4 md:px-6 text-center">Abstract</th>
                  <th className="px-4 py-4 md:px-6 text-center">Payment</th>
                  <th className="px-4 py-4 md:px-6">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {registrations.map((reg) => {
                  const date = reg.submittedAt?.toDate ? reg.submittedAt.toDate() : new Date(reg.submittedAt);
                  const dateString = date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  });

                  // Handle varying path structures based on Cloudinary auto-detection
                  const downloadUrl = reg.abstractURL?.replace(
                    "/image/upload/",
                    "/image/upload/fl_attachment/"
                  ).replace(
                    "/raw/upload/",
                    "/raw/upload/fl_attachment/"
                  );

                  // Create a preview link using Office Online viewer for doc/docx files
                  const previewUrl = reg.abstractURL?.toLowerCase().match(/\.(doc|docx)$/) 
                    ? `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(reg.abstractURL)}`
                    : reg.abstractURL;

                  return (
                    <tr key={reg.id} className="hover:bg-primary/5 transition-colors duration-150">
                      <td className="px-4 py-3 md:px-6 font-medium">
                        <div className="flex flex-col">
                          <span>{reg.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase opacity-70">{reg.category}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 md:px-6">
                        <div className="max-w-[120px] truncate" title={reg.teamName || "Individual"}>
                          {reg.teamName || "Individual"}
                        </div>
                      </td>
                      <td className="px-4 py-3 md:px-6">
                        <a href={`mailto:${reg.email}`} className="text-primary hover:underline">{reg.email}</a>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{reg.phone}</div>
                      </td>
                      <td className="px-4 py-3 md:px-6">
                        <div className="flex flex-col text-[11px]">
                          <span>{reg.college}</span>
                          <span className="text-muted-foreground">{reg.department} (Yr {reg.year})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 md:px-6">
                        <div className="max-w-[180px] truncate flex flex-col" title={reg.paperTopic === "Other" ? reg.customTopic : reg.paperTopic}>
                          <span className="truncate">{reg.paperTopic === "Other" ? reg.customTopic : reg.paperTopic}</span>
                          <span className="text-[10px] text-muted-foreground capitalize">{reg.participationType}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 md:px-6">
                        <div className="max-w-[150px] overflow-hidden">
                          {reg.members && reg.members.length > 0 ? (
                            <div className="flex flex-col gap-0.5">
                              {reg.members.map((m: string, i: number) => (
                                <span key={i} className="text-[11px] truncate">• {m}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-[11px]">Individual</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 md:px-6 text-center">
                        {reg.hardcopy ? (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 text-[10px] font-bold">YES</span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold">NO</span>
                        )}
                      </td>
                      <td className="px-4 py-3 md:px-6 font-mono text-[11px] opacity-80">{reg.transactionId}</td>
                      <td className="px-4 py-3 md:px-6 text-center">
                        {reg.abstractURL ? (
                          <div className="flex items-center justify-center gap-3">
                            <a 
                              href={previewUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-500 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50 transition-colors flex items-center gap-1 text-[11px]"
                              title="Preview Abstract"
                            >
                              <Eye size={14} /> Preview
                            </a>
                            <a 
                              href={downloadUrl} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-primary hover:text-primary/80 p-1 rounded-md hover:bg-primary/5 transition-colors flex items-center gap-1 text-[11px]"
                              title="Download Abstract"
                            >
                              <Download size={14} /> Download
                            </a>
                          </div>
                        ) : (
                          <span className="text-muted-foreground opacity-50">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 md:px-6 text-center">
                        {reg.paymentScreenshot ? (
                          <a 
                            href={reg.paymentScreenshot} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-1 text-[11px] p-1 rounded-md hover:bg-green-50"
                          >
                            <Eye size={14} /> View
                          </a>
                        ) : (
                          <span className="text-muted-foreground opacity-50">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 md:px-6 text-muted-foreground text-[11px]">{dateString}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {registrations.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <FileText size={48} className="mx-auto mb-4 opacity-20" />
                No registrations found yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
