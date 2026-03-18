import { Link } from "react-router-dom";
import { ArrowRight, FileText, Calendar, CreditCard } from "lucide-react";

const importantDates = [
  { event: "Full Paper Submission", date: "05 April 2026" },
  { event: "Acceptance Notification", date: "10 April 2026" },
  { event: "Conference Date", date: "16 April 2026" },
];

const fees = [
  {
    category: "UG, PG Students & Research Scholars",
    detail: "Conference and ISBN Proceedings in CD",
    fee: "Rs.500 per paper (Maximum 4 authors)",
  },
  {
    category: "Academicians and Industry Persons",
    detail: "Conference and ISBN Proceedings in CD",
    fee: "Rs.600 per paper (Maximum 4 authors)",
  },
];

const Guidelines = () => {
  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <p className="text-xs sm:text-sm text-primary tracking-widest uppercase mb-2">Er. Perumal Manimekalai College of Engineering</p>
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">
            Abstract and Paper <span className="text-primary">Guidelines</span>
          </h1>
        </div>

        {/* Abstract Guidelines */}
        <div className="gradient-card rounded-2xl p-5 sm:p-6 md:p-8 glow-border mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-foreground">Submission Guidelines</h2>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
            <p>
              Abstract shall be in about <span className="text-foreground font-semibold">250–300 words</span> covering 
              purpose of the study, methods, key findings and recommendations.
            </p>
            <p>
              Full paper need to be in <span className="text-foreground font-semibold">IEEE FORMAT</span>.
            </p>
            <p>
              Abstract, Full paper, and presentation shall be submitted to:{" "}
              <a href="mailto:ncfssai26@gmail.com" className="text-primary hover:underline font-medium">
                ncfssai26@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Important Dates */}
        <div className="gradient-card rounded-2xl p-5 sm:p-6 md:p-8 glow-border mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
              Important <span className="text-primary">Dates</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-foreground">Event</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {importantDates.map((row, i) => (
                  <tr key={row.event} className={i % 2 === 1 ? "bg-secondary/50" : ""}>
                    <td className="px-3 sm:px-6 py-2 sm:py-3 text-muted-foreground">{row.event}</td>
                    <td className="px-3 sm:px-6 py-2 sm:py-3 text-primary font-medium">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Registration Details */}
        <div className="gradient-card rounded-2xl p-5 sm:p-6 md:p-8 glow-border mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-foreground">
              Registration <span className="text-primary">Details</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-foreground">Category</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left font-semibold text-foreground">Fee</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((row, i) => (
                  <tr key={row.category} className={i % 2 === 1 ? "bg-secondary/50" : ""}>
                    <td className="px-3 sm:px-6 py-2 sm:py-3">
                      <span className="text-muted-foreground text-xs sm:text-sm">{row.category}</span>
                      <br />
                      <span className="text-xs text-muted-foreground/70">({row.detail})</span>
                    </td>
                    <td className="px-3 sm:px-6 py-2 sm:py-3 text-primary font-medium text-xs sm:text-sm">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-primary font-semibold uppercase tracking-wide">
            Note: Conference proceeding hardcopy provided with extra charges of Rs.500
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/topics"
            className="inline-flex items-center gap-2 rounded-full gradient-button px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200"
          >
            Explore Topics <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guidelines;
