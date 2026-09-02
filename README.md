# NextGen MahaTech — Advanced Association Management & IT Services

NextGen MahaTech is a modern, full-stack web application designed for association management and IT service delivery. It features a high-performance frontend with interactive 3D elements and a robust, secure Admin Panel for real-time content management.

## 🚀 Key Features

### Public Website
- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations.
- **Dynamic Content**: Hero sections, About text, and Services are all fetched from a PostgreSQL database.
- **Interactive Elements**: Includes a 3D hologram hero visual and tilt-animated cards.
- **Lead Generation**: Integrated contact form that stores enquiries directly in the database.

### Admin Panel (`/admin`)
- **Secure Authentication**: JWT-based session management with HTTP-only cookies.
- **Dashboard**: Real-time stats for enquiries, services, and testimonials.
- **Service Management**: Full CRUD (Create, Read, Update, Delete) for company offerings.
- **Testimonial Management**: Manage client feedback with star ratings and photos.
- **Page Content Manager**: Edit website text (titles, descriptions) without touching the code.
- **Local Image Uploads**: Upload images directly from your computer to the server.

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS
- **Animations**: Framer Motion, Three.js (WebGL)
- **Backend**: Next.js Route Handlers (API)
- **Database**: PostgreSQL
- **ORM**: Prisma Client
- **Auth**: Jose (JWT), Bcryptjs

## 💻 Local Setup Instructions

### 1. Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** (Running locally or hosted)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/okardile140/nextgen-mahatech.git
cd nextgen-mahatech

# Install dependencies
npm install
```

### 3. Database Configuration
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/your_database_name"
JWT_SECRET="your_random_secret_string"
```

### 4. Database Initialization
```bash
# Push the schema to your PostgreSQL database
npx prisma db push

# Seed initial data (Admin user, services, etc.)
npx tsx src/db/seed.ts

# Optional: Force reset admin credentials if login fails
npx tsx src/db/reset-admin.ts
```

### 5. Running the App
```bash
# Development mode
npm run dev

# Production build
npm run build
npm run start
```

## 🔐 Admin Credentials (Default)
- **URL**: `http://localhost:3000/admin/login`
- **Username**: `admin`
- **Password**: `admin123`

## 📂 Project Structure
- `src/app`: Next.js pages and API routes.
- `src/components`: Reusable UI components (Public & Admin).
- `src/lib`: Shared utilities (Auth, Prisma client, Types).
- `prisma/`: Database schema definition.
- `public/uploads`: Directory where admin-uploaded images are stored.

## 📄 License
This project is private and intended for NextGen MahaTech operations.
