# 🌐 NCFSS AI Conference Hub

A modern web application built for the **National Conference on Free/Libre and Open Source Software (NCFSS)** with a focus on AI themes.

This platform serves as the central hub for:
- Conference details
- Participant registrations
- Paper submissions
- Admin-based event management

---

## 🚀 Features

### 🎯 Interactive Landing Pages
- Dedicated pages for:
  - `/guidelines`
  - `/topics`
  - `/contact`

### 📝 Participant Registration System
- Complete registration workflow
- Supports:
  - Offline participation types
  - Paper topic selection

### 📧 Automated Email Confirmations
- Integrated with **EmailJS**
- Sends confirmation emails upon successful registration

### 🔐 Firebase Integration
- Secure admin authentication via Firebase Auth
- Firestore database to store all registration data

### 📊 Admin Dashboard
- Secure admin-only access
- Features include:
  - View all registrations
  - Sort and manage entries
  - View uploaded abstracts (PDF)
  - Check payment screenshots
  - Export data (Excel)

### 🎨 Modern UI/UX
- Fully responsive and scalable design using:
  - Tailwind CSS
  - Shadcn UI
  - Radix UI

---

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- TypeScript

### Styling
- Tailwind CSS
- tailwindcss-animate
- class-variance-authority
- clsx

### UI Components
- Shadcn UI
- Radix UI
- Lucide React (Icons)

### State Management & Forms
- React Hook Form
- Zod (Schema validation)

### Backend / BaaS
- Firebase (Authentication & Firestore)

### Email Service
- EmailJS (@emailjs/browser)

### Routing
- React Router v6

### Utilities
- date-fns (Date formatting)
- recharts (Dashboard charts)
- xlsx (Data export)

## 📁 Project Structure


src/
├── assets/ # Static assets (images, logos)
├── components/ # Reusable UI components
├── hooks/ # Custom hooks (e.g., toast)
├── lib/ # Utilities & Firebase config
├── pages/ # Core pages
│ ├── Admin.tsx
│ ├── AdminLogin.tsx
│ ├── Contact.tsx
│ ├── Guidelines.tsx
│ ├── Index.tsx
│ ├── Register.tsx
│ ├── RegistrationSuccess.tsx
│ ├── Topics.tsx
│ └── NotFound.tsx
├── App.css
├── index.css
└── main.tsx

## ⚙️ Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

Here is your **section in one clean, properly formatted Markdown copy-paste block** 👇

````md id="run-build-deploy"
## ▶️ Run Development Server

```bash
npm run dev
````

App will run at:

👉 [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Build for Production

```bash
npm run build
```

* Outputs optimized files into `/dist`
* Ready for deployment (Netlify, Vercel, etc.)

---

## 🌍 Deployment

You can deploy using:

* Netlify
* Vercel
* Firebase Hosting

---

## 📌 Future Enhancements

* Online payment integration
* Real-time notifications
* Role-based admin access
* Analytics dashboard improvements

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👩‍💻 Author

**Bhavishya Priyadarshini V**
Aspiring Full-Stack Developer 🚀

---

⭐ If you found this project useful, don't forget to star the repo!

```
```

