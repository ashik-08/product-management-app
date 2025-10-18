# Product Management App

A modern, responsive product management application built with Next.js, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

### ✅ Completed

- **Authentication System** with JWT tokens
- **Modern UI Components** with custom design system
- **Redux Store** with state persistence
- **Responsive Design** with Tailwind CSS
- **Form Validation** with React Hook Form and Zod
- **Protected Routes** with authentication guards

### 🚧 In Progress

- Product CRUD operations
- Search and pagination
- Advanced filtering

## 🎨 Design System

The app uses a carefully crafted color palette:

- **Rich Black** (#0D1821) - Primary text and accents
- **Anti Flash White** (#EFF1F3) - Backgrounds and subtle elements
- **Hooker's Green** (#4E6E5D) - Secondary actions and success states
- **Lion** (#AD8A64) - Accent colors and highlights
- **Chestnut** (#A44A3F) - Warning and danger states

## 🔐 Authentication

The app uses JWT-based authentication with the BitechX API:

### API Endpoint

```
POST https://api.bitechx.com/auth
```

### Request Format

```json
{
  "email": "your-email@example.com"
}
```

### Response Format

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usage

1. Navigate to `/login` or click "Get Started" from the home page
2. Enter the email you used for your job application
3. The app will authenticate with the API and redirect you to the products dashboard
4. The JWT token is automatically stored and included in all subsequent API requests

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **State Management:** Redux Toolkit with RTK Query
- **Styling:** Tailwind CSS with custom design system
- **Forms:** React Hook Form with Zod validation
- **Icons:** Lucide React
- **Authentication:** JWT with Redux Persist

## 📁 Project Structure

```
├── app/
│   ├── (auth)/           # Authentication routes
│   ├── (dashboard)/      # Protected dashboard routes
│   ├── globals.css       # Global styles
│   ├── layout.js         # Root layout
│   └── page.js           # Home page
├── components/
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   └── providers.js      # Redux provider
├── lib/
│   ├── store/            # Redux store configuration
│   ├── api/              # API configuration
│   ├── utils/            # Utility functions
│   └── validations/      # Form validation schemas
└── hooks/                # Custom React hooks
```

## 🚀 Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.local.example .env.local
```

3. **Run the development server:**

```bash
npm run dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3001](http://localhost:3001)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Usage

### Authentication Flow

1. **Home Page** (`/`) - Landing page with authentication options
2. **Login Page** (`/login`) - Email-based authentication
3. **Products Dashboard** (`/products`) - Protected main application

### Navigation

- **Authenticated users** are automatically redirected to `/products`
- **Unauthenticated users** accessing protected routes are redirected to `/login`
- **Logout** clears the session and redirects to home

## 🎯 Next Development Steps

1. **Product Management:**

   - Product listing with search and filters
   - Create/Edit product forms
   - Product details view
   - Delete functionality with confirmation

2. **Enhanced UX:**

   - Loading states and skeletons
   - Error boundaries
   - Toast notifications
   - Pagination controls

3. **Advanced Features:**
   - Category management
   - Bulk operations
   - Export functionality
   - Analytics dashboard

## 🤝 Contributing

This is a private project for demonstration purposes. The codebase follows modern React/Next.js best practices and is structured for scalability.

## 📄 License

Private project - All rights reserved.
