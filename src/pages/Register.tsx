import { useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

const paperTopics = [
  "Agentic AI",
  "Multi-Agent Systems",
  "Explainable AI",
  "Small Language Models",
  "Neuro-Symbolic AI",
  "Self-Evolving Algorithms",
  "Cognitive Digital Twins",
  "6G-Enabled AI Networks",
  "Self-Healing Infrastructure",
  "Swarm Intelligence",
  "Precision Healthcare",
  "Smart Mobility 2.0",
  "Next-Gen Industrial Robotics",
  "Precision Agriculture",
  "Other",
];

async function uploadToCloudinary(file: File) {
  const url = "https://api.cloudinary.com/v1_1/dcgd3men6/raw/upload";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "conference_upload");

  const response = await fetch(url, {
    method: "POST",
    body: formData
  });

  const data = await response.json();
  return data.secure_url;
}

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    teamName: "",
    email: "",
    phone: "",
    department: "",
    collegeName: "",
    yearOfStudy: "",
    paperTopic: "",
    customTopic: "",
    transactionId: "",
    category: "ugpg", // 'ugpg' or 'academician'
    participationType: "offline",
    hardcopy: false,
  });

  const [members, setMembers] = useState<string[]>([]);
  const [abstractFile, setAbstractFile] = useState<File | null>(null);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addMember = () => {
    if (members.length < 3) setMembers([...members, ""]);
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const updateMember = (index: number, value: string) => {
    const updated = [...members];
    updated[index] = value;
    setMembers(updated);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submit clicked");

    if (!abstractFile || !paymentFile) {
      toast.error("Please upload the abstract and payment screenshot.");
      return;
    }

    const abstractExt = abstractFile.name.split('.').pop()?.toLowerCase();
    if (abstractExt !== 'doc' && abstractExt !== 'docx') {
      toast.error("Only .doc and .docx files are allowed for the abstract.");
      return;
    }

    setIsSubmitting(true);
    toast.loading("Submitting registration...");

    try {
      console.log("Checking for duplicate email...");
      const dbQuery = query(collection(db, "registrations"), where("email", "==", form.email));
      const querySnapshot = await getDocs(dbQuery);
      
      if (!querySnapshot.empty) {
        toast.dismiss();
        toast.error("This email has already been used for registration.");
        setIsSubmitting(false);
        return;
      }

      console.log("Uploading files to Cloudinary...");
      const abstractURL = await uploadToCloudinary(abstractFile);
      const paymentURL = await uploadToCloudinary(paymentFile);
      console.log("Cloudinary URLs:", abstractURL, paymentURL);

      console.log("Saving to Firestore...");
      const docRef = await addDoc(collection(db, "registrations"), {
        name: form.name,
        teamName: form.teamName,
        email: form.email,
        phone: form.phone,
        department: form.department,
        college: form.collegeName,
        year: form.yearOfStudy,
        paperTopic: form.paperTopic,
        customTopic: form.customTopic,
        participationType: form.participationType,
        category: form.category,
        hardcopy: form.hardcopy,
        transactionId: form.transactionId,
        members: members.filter(m => m.trim() !== ""),
        abstractURL,
        paymentScreenshot: paymentURL,
        submittedAt: new Date(),
      });

      console.log("Saved with ID:", docRef.id);

      // Send confirmation email
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            name: form.name,
            teamName: form.teamName,
            email: form.email,
            college: form.collegeName,
            department: form.department,
            topic: form.paperTopic,
            type: form.participationType
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }

      toast.dismiss();
      toast.success("Registration submitted successfully!");
    } catch (err: any) {
      console.error("Firestore error:", err);
      toast.dismiss();
      toast.error("Error submitting registration: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-secondary px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors";

  const labelClass = "block mb-1 sm:mb-1.5 text-xs sm:text-sm font-medium text-foreground";

  const totalAmount = (() => {
    let total = 0;
    if (form.category === "ugpg") total += 500;
    if (form.category === "academician") total += 600;
    if (form.hardcopy) total += 500;
    return total;
  })();

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8 sm:mb-10 text-center">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            <span className="text-primary">Register</span> Now
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">Fill in the details to register for NCSS.AI'26</p>
        </div>

        <form id="registrationForm" onSubmit={handleSubmit} className="gradient-card rounded-2xl p-5 sm:p-6 md:p-8 glow-border space-y-4 sm:space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className={inputClass}
            />
          </div>

          {/* Team Name */}
          <div>
            <label className={labelClass}>Team Name *</label>
            <input
              type="text"
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
              placeholder="Enter your team name"
              required
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className={inputClass}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className={labelClass}>Phone Number *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={inputClass}
            />
          </div>

          {/* Department */}
          <div>
            <label className={labelClass}>Department *</label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
              placeholder="e.g., Computer Science and Engineering"
              className={inputClass}
            />
          </div>

          {/* College Name */}
          <div>
            <label className={labelClass}>College Name *</label>
            <input
              type="text"
              name="collegeName"
              value={form.collegeName}
              onChange={handleChange}
              placeholder="Enter your college name"
              className={inputClass}
            />
          </div>

          {/* Year of Study */}
          <div>
            <label className={labelClass}>Year of Study *</label>
            <select name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange} className={inputClass}>
              <option value="">Select year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
              <option value="pg">PG</option>
              <option value="research">Research Scholar</option>
              <option value="faculty">Faculty / Industry</option>
            </select>
          </div>

          {/* Paper Topic */}
          <div>
            <label className={labelClass}>Paper Topic *</label>
            <Select value={form.paperTopic} onValueChange={(value) => setForm({ ...form, paperTopic: value })}>
              <SelectTrigger className={inputClass}>
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto">
                {paperTopics.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.paperTopic === "Other" && (
              <input
                type="text"
                name="customTopic"
                value={form.customTopic}
                onChange={handleChange}
                placeholder="Please specify your paper topic"
                className={`${inputClass} mt-2`}
              />
            )}
          </div>

          {/* Participation Type */}
          <div>
            <label className={labelClass}>Participation Type *</label>
            <select name="participationType" value={form.participationType} onChange={handleChange} className={inputClass}>
              <option value="offline">Offline</option>
              <option value="online">Online</option>
            </select>
          </div>

          {/* Group Members */}
          <div>
            <label className={labelClass}>Additional Group Members (Max 3, excluding yourself)</label>
            <div className="space-y-2 sm:space-y-3">
              {members.map((member, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => updateMember(index, e.target.value)}
                    placeholder={`Member ${index + 1} name`}
                    className={inputClass}
                  />
                  {members.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMember(index)}
                      className="shrink-0 rounded-xl border border-border bg-secondary px-2.5 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {members.length < 3 && (
                <button
                  type="button"
                  onClick={addMember}
                  className="text-xs sm:text-sm text-primary hover:underline"
                >
                  + Add Member
                </button>
              )}
            </div>
          </div>

          {/* Upload Abstract */}
          <div>
            <label className={labelClass}>Upload Abstract (DOC / DOCX) *</label>
            <input
              type="file"
              accept=".doc,.docx"
              onChange={(e) => setAbstractFile(e.target.files?.[0] || null)}
              className="w-full text-xs sm:text-sm text-muted-foreground file:mr-2 sm:file:mr-4 file:rounded-full file:border-0 file:bg-primary/10 file:px-3 sm:file:px-4 file:py-1.5 sm:file:py-2 file:text-xs sm:file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20 cursor-pointer"
            />
          </div>

          {/* Payment Section */}
          <div className="border-t border-border pt-4 sm:pt-6">
            <h3 className="font-display text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6 text-center">PAYMENT</h3>
            <div className="flex flex-col gap-6 sm:gap-8">
              {/* Participant Category */}
              <div className="w-full flex flex-col gap-3 sm:gap-4 items-center">
                <div className="flex flex-col gap-2 sm:gap-3 text-center">
                  <label className="text-xs sm:text-sm font-semibold text-foreground">Select Category</label>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input type="radio" id="ugpg" name="category" value="ugpg" checked={form.category === "ugpg"} onChange={() => setForm({ ...form, category: "ugpg" })} className="accent-primary h-4 w-4 sm:h-5 sm:w-5" />
                    <label htmlFor="ugpg" className="text-xs sm:text-sm text-foreground cursor-pointer">UG/PG/RESEARCH [Rs. 500/-]</label>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <input type="radio" id="academician" name="category" value="academician" checked={form.category === "academician"} onChange={() => setForm({ ...form, category: "academician" })} className="accent-primary h-4 w-4 sm:h-5 sm:w-5" />
                    <label htmlFor="academician" className="text-xs sm:text-sm text-foreground cursor-pointer">Academicians & Industry [Rs. 600/-]</label>
                  </div>
                </div>
                {/* Hardcopy Proceeding */}
                <div className="flex items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
                  <input type="checkbox" id="hardcopy" checked={form.hardcopy || false} onChange={() => setForm({ ...form, hardcopy: !form.hardcopy })} className="accent-primary h-4 w-4 sm:h-5 sm:w-5" />
                  <label htmlFor="hardcopy" className="text-xs sm:text-sm text-foreground cursor-pointer">Hardcopy proceeding [Rs. 500/-]</label>
                </div>
              </div>

              {/* Total Amount Calculation */}
              <div className="flex justify-center">
                <div className="border rounded-xl p-3 sm:p-4 bg-secondary flex flex-col items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">Total Amount to Pay <span className="text-xs">(auto-calculated)</span></span>
                  <span className="text-xl sm:text-2xl font-bold text-primary mt-1.5 sm:mt-2">
                    Rs. {totalAmount ? totalAmount : "000"} /-
                  </span>
                </div>
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center justify-center gap-4 mt-2">
                <div className="flex items-center justify-center p-4 rounded-2xl border-2 border-border bg-white shadow-sm">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`upi://pay?pa=bhavishyapriyadarshini@okicici&am=${totalAmount}&cu=INR`)}`}
                    alt={`Payment QR Code for Rs. ${totalAmount}`}
                    className="h-40 w-40 sm:h-48 sm:w-48 object-contain"
                  />
                </div>
                <div className="text-center tracking-tight">
                  <p className="text-xs sm:text-sm text-muted-foreground uppercase font-semibold tracking-wider mb-1.5">UPI ID</p>
                  <p className="font-mono text-sm sm:text-base font-medium text-foreground bg-background px-4 py-1.5 rounded-lg border border-border/50 select-all shadow-sm">
                    bhavishyapriyadarshini@okicici
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Screenshot & Transaction ID */}
          <div className="mt-6 sm:mt-8">
            <label className="block mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-foreground">Payment Screenshot (JPG / PNG) *</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
              className="w-full text-xs sm:text-sm text-muted-foreground file:mr-2 sm:file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-3 sm:file:px-4 file:py-1.5 sm:file:py-2 file:text-xs sm:file:text-sm file:font-medium file:text-white hover:file:bg-primary/80 cursor-pointer bg-secondary text-foreground"
            />
            <label className="block mt-4 sm:mt-6 mb-1.5 sm:mb-2 text-xs sm:text-sm font-medium text-foreground">Transaction ID *</label>
            <input type="text" name="transactionId" value={form.transactionId} onChange={handleChange} placeholder="Enter your transaction ID" className={inputClass} />
          </div>

          {/* Submit */}
          <div className="pt-3 sm:pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full gradient-button py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground btn-glow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting Registration..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
