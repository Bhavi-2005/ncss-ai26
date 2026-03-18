import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const Contact = () => {
  const studentCoordinators = [
    { name: "M. Dharaneesh", phone: "9842072615" },
    { name: "J. Anto", phone: "9345155298" },
    { name: "S. Suvil", phone: "7603867162" },
    { name: "S. Navya", phone: "8072251585" },
    { name: "S. Niranjan", phone: "7871264267" },
    { name: "S. Charan Tej", phone: "9345155298" },
  ];

  const staffCoordinators = [
    { name: "Dr. N. Shunmuga Karpagam", phone: "8940674909" },
    { name: "Mr. M. Prakash", phone: "9080522541" },
    { name: "Dr. J. Gul Shaira Banu", phone: "9940922785" },
    { name: "Mrs. S. Suganya", phone: "8220401352" },
  ];

  const mapsLink = "https://maps.app.goo.gl/mJs9fdHQNdRGYC3r7";

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-4xl">
        {/* Page Title */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2">
            <span className="text-primary">CONTACT</span> US
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Get in touch with us for any queries regarding NCSS.AI'26</p>
        </div>

        {/* Student Coordinators Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">STUDENTS COORDINATORS</h2>
          <div className="overflow-x-auto rounded-2xl border border-border/50">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground border-b border-border/50">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground border-b border-border/50">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentCoordinators.map((coordinator, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-secondary/20" : "bg-secondary/5"}>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground border-b border-border/30">
                      {coordinator.name}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground border-b border-border/30">
                      {coordinator.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Staff Coordinators Section */}
        <div className="mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">STAFF COORDINATORS</h2>
          <div className="overflow-x-auto rounded-2xl border border-border/50">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground border-b border-border/50">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-foreground border-b border-border/50">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {staffCoordinators.map((coordinator, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-secondary/20" : "bg-secondary/5"}>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground border-b border-border/30">
                      {coordinator.name}
                    </td>
                    <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground border-b border-border/30">
                      {coordinator.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* College Location Section */}
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">COLLEGE LOCATION</h2>

          {/* Address & Google Maps Link */}
          <div className="mb-6 space-y-4">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed flex items-start gap-3">
              <MapPin className="shrink-0 mt-1 text-primary" size={20} />
              <span className="font-medium text-foreground">
                Hosur to Krishnagiri Highways, Near Koneripalli (PO), Hosur, Nallaganakothapalli, Tamil Nadu 635117
              </span>
            </p>
            <a
              href="https://maps.app.goo.gl/mJs9fdHQNdRGYC3r7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary px-5 py-2.5 font-semibold text-sm transition-colors"
            >
              <MapPin size={16} />
              View Location
            </a>
          </div>

          
        </div>

        {/* Back to Home */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/"
            className="inline-block rounded-full gradient-button px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;
