# BASA-FINDER

A modern rental property management platform connecting landlords and tenants in Bangladesh.

## Features

### For Tenants

- Browse verified rental listings with detailed property information
- Advanced property search with filters (location, price range, bedrooms)
- Submit rental requests to landlords
- Secure online rent payment system
- Track rental applications and payment history
- View landlord contact information after request approval

### For Landlords

- Create and manage property listings with multiple images
- Detailed property information management (location, rent, amenities, etc.)
- Review and manage tenant rental requests
- Track property availability and rental status
- Manage tenant communications

### For Admins

- Review and monitor all rental listings
- Oversee tenant-landlord interactions
- Platform management and oversight
- Review rental requests and payments

## Tech Stack

- **Frontend**: Next.js 13+ with App Router
- **UI Components**: Tailwind CSS, Shadcn UI
- **State Management**: React Context
- **Form Handling**: React Hook Form, Zod validation
- **Authentication**: JWT-based auth
- **Payment Integration**: SurjoPay
- **Image Hosting**: Cloudinary
- **Styling**: TailwindCSS with custom configurations

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm/yarn package manager
- Git

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/habibb2r/BASA-FINDER-CLIENTSIDE.git
   cd BASA-FINDER-CLIENTSIDE
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install

# or

yarn install
\`\`\`

3. Create a \`.env\` file in the root directory and add necessary environment variables:
   \`\`\`env
   NEXT_PUBLIC_BASE_API=your_api_url
   \`\`\`

4. Run the development server:
   \`\`\`bash
   npm run dev

# or

yarn dev
\`\`\`

The application will be available at `https://basa-finder-clientside.vercel.app/`

## Project Structure

- `/src/app` - Next.js 13+ app router pages and layouts
- `/src/components` - Reusable UI components
  - `/modules` - Feature-specific components
  - `/shared` - Shared components (navbar, footer, etc.)
  - `/ui` - Base UI components
- `/src/services` - API services and data fetching
- `/src/context` - React Context providers
- `/src/types` - TypeScript type definitions
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and helpers

## Key Features Implementation

### Property Listings

- Image upload with Cloudinary integration
- Rich property details including amenities
- Location-based search functionality
- Filter by price range and number of bedrooms

### Rental Requests

- Secure request submission system
- Status tracking (pending/approved/rejected)
- Automated notifications
- Payment integration for approved requests

### User Management

- Role-based access control (Admin/Landlord/Tenant)
- Profile management
- Contact information verification

## License

This project is licensed under the MIT License.
