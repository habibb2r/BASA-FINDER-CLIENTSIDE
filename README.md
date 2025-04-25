# BASA-FINDER – Client Side

A modern rental property management platform that connects landlords and tenants across Bangladesh. This client-side application is built using **Next.js 13+ (App Router)** and offers a smooth, interactive user experience.

---

## ✨ Features

### 🧍‍♂️ Tenants

- Browse verified rental listings with detailed information
- Filter listings by location, price, and bedroom count
- Submit rental requests to landlords
- View request status and landlord contact info after approval
- Secure rent payment via ShurjoPay
- Track application and payment history

### 🏠 Landlords

- Create and manage property listings with multiple images
- Include detailed property info (location, rent, amenities, etc.)
- Review and manage rental requests
- Track property availability and rent status
- Communicate with approved tenants

### 🛠️ Admins

- View and manage all rental listings
- Monitor tenant-landlord interactions
- Oversee requests and payment flows
- Manage platform users and content

---

## 🧰 Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Styling**: Tailwind CSS with custom configurations
- **UI Library**: Shadcn UI
- **State Management**: React Context API
- **Forms & Validation**: React Hook Form + Zod
- **Authentication**: JWT-based (via secure cookies)
- **Image Upload**: Cloudinary
- **Payment Gateway**: ShurjoPay
- **API Communication**: Axios

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js 18.x or later
- npm or yarn
- Git

### 📦 Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/habibb2r/BASA-FINDER-CLIENTSIDE.git
   cd BASA-FINDER-CLIENTSIDE
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file** in the root and add:

   ```env
   NEXT_PUBLIC_BASE_API=https://your-api-domain.com/api/v1
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view in your browser.

---

## 🗂️ Project Structure

```
src/
├── app/              # Next.js App Router pages and layouts
├── components/
│   ├── modules/      # Feature-specific components
│   ├── shared/       # Common UI (navbar, footer, etc.)
│   └── ui/           # Base reusable UI components
├── context/          # React Context providers (e.g., auth)
├── services/         # API requests via Axios
├── types/            # TypeScript types and interfaces
├── hooks/            # Custom React hooks
└── lib/              # Utilities and helpers
```

---

## 🔐 Authentication Flow

- JWT-based login/signup system
- Roles: Tenant, Landlord, Admin
- Auth token stored securely via HTTP-only cookies
- Protected routes based on user role

---

## 🏘️ Key Modules

### 🏠 Property Listings

- Create/edit listings (Landlords only)
- View and filter listings (Tenants)
- Upload images via Cloudinary

### 📩 Rental Requests

- Submit and manage rental requests
- Track request statuses: Pending, Approved, Rejected
- Landlord approval unlocks tenant contact info

### 💳 Rent Payments

- Rent payments powered by ShurjoPay
- Transaction history available to Tenants and Admins
- Admin panel includes revenue statistics

---

## ⚙️ Scripts

```bash
npm run dev         # Run development server
npm run build       # Build for production
npm run lint        # Lint code with ESLint
npm run format      # Format code with Prettier
```

---

## 🌐 Live Deployment

The client app is deployed on **Vercel**:  
🔗 [https://basa-finder-clientside.vercel.app](https://basa-finder-clientside.vercel.app)

---

## 📄 License

Licensed under the **MIT License**.

## 👨‍💻 Developer

**HABIBB2R**

- GitHub: [@habibb2r](https://github.com/habibb2r)
- LinkedIn: [@habibb2r](https://linkedin.com/in/habibb2r)
- Portfolio: [habibb2r.site](https://habibb2r.site)

---
