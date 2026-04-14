# Pixelrift — Build Your Business Website Instantly

Pixelrift is a premium SaaS-style platform for selling and booking high-quality, ready-made web development projects. Designed for speed, aesthetics, and high conversion.

## 🚀 Features

- **Premium SaaS UI**: Built with Next.js 15, Tailwind CSS, and Framer Motion for a sleek, dark-themed experience.
- **Project Catalog**: Filterable grid of curated web solutions, including "Live Project" showcases.
- **Conversion-Focused Pricing**: Simplifed pricing plans (Basic & Premium) clearly displayed on the home page.
- **Interactive Booking Flow**: A unified, mobile-optimized booking system with plan selection and auto-fill capabilities.
- **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop devices with a modern slide-in navigation menu.
- **Backend Integration**: Automated booking storage in MongoDB and admin email notifications via Nodemailer.

## 🛠️ Technology Stack

- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Next.js API Routes, MongoDB (Mongoose).
- **Email**: Nodemailer with Gmail/Custom SMTP support.
- **Styling**: Modern glassmorphism and custom animation utilities.

## 📦 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/lUCIFER94008/Pixelrift.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ADMIN_EMAIL=admin@example.com
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📄 Pages
- ` / ` - Home page with Hero, Why Us, and Pricing.
- ` /projects ` - Full project catalog with category filtering.
- ` /projects/[id] ` - Detailed project view and booking flow.

## 🛡️ License
Designed and Developed by **R7** for Pixelrift.
