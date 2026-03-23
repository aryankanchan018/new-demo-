# 💰 FinanceTracker — Production-Grade Personal Finance App

A scalable, production-ready personal finance tracker built with **React**, **Redux Toolkit**, **Firebase/Firestore**, **Tailwind CSS**, and **Chart.js**. Features full CRUD operations, real-time data sync, analytics dashboards, and a modern glassmorphism UI.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.0-764ABC?logo=redux)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?logo=firebase)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38BDF8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Firebase Setup](#-firebase-setup)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [How It Works](#-how-it-works)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### Core Functionality
- ✅ **Full CRUD** — Create, Read, Update, Delete transactions
- ✅ **Real-time Firestore** — Data synced instantly with Firebase
- ✅ **Schema Validation** — Zod-based form validation with react-hook-form
- ✅ **Persistent Storage** — All data stored in Firestore (cloud)
- ✅ **Error Handling** — Toast notifications for all async operations

### Analytics & Visualization
- 📊 **Doughnut Chart** — Expense breakdown by category (Chart.js)
- 📈 **Bar Chart** — Monthly cash flow trends (last 6 months)
- 💡 **Live Summary Cards** — Balance, income, and expense totals

### UI/UX
- 🎨 **Glassmorphism Design** — Modern frosted glass aesthetic
- 🌙 **Dark Theme** — Eye-friendly dark mode by default
- 📱 **Fully Responsive** — Mobile, tablet, and desktop layouts
- ✨ **Smooth Animations** — Fade-in, slide-up transitions
- 🔍 **Search & Filter** — Filter by type, search by description
- ⌨️ **Keyboard Accessible** — ESC to close modals, full tab support

### Performance
- ⚡ **Lazy Loading** — Charts loaded on demand with Suspense
- 🔀 **Code Splitting** — Vite-based automatic chunk splitting
- 🧠 **Memoized Selectors** — useMemo for derived state (summary, charts)
- 🚫 **Optimized Renders** — Minimal re-renders via Redux slices

---

## 🛠️ Tech Stack

| Layer         | Technology                          |
|---------------|-------------------------------------|
| Frontend      | React 18, Vite                      |
| Styling       | Tailwind CSS 3                      |
| State Mgmt    | Redux Toolkit + React-Redux         |
| Backend/DB    | Firebase Firestore (NoSQL)          |
| Validation    | Zod + React Hook Form               |
| Charts        | Chart.js + react-chartjs-2          |
| Routing       | React Router DOM v6                 |
| Notifications | React Hot Toast                     |
| Icons         | Lucide React                        |

---

## 🏗️ Architecture

```
User Action
    │
    ▼
React Component
    │
    ▼
Custom Hook (useTransactions)
    │
    ▼
Redux Thunk (createAsyncThunk)
    │
    ▼
Service Layer (transactionService.js)
    │
    ▼
Firebase Firestore (Cloud DB)
    │
    ▼
Redux State Update → UI Re-render
```

### State Management Flow
1. Components call hooks (`useTransactions`)
2. Hooks dispatch Redux thunks
3. Thunks call the service layer
4. Service layer talks to Firestore
5. Redux state updates trigger re-renders
6. Memoized selectors compute derived data (summary, charts)

---

## 📁 Project Structure

```
finance-tracker/
├── public/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── CategoryPieChart.jsx   # Doughnut chart by category
│   │   │   └── CashFlowChart.jsx      # Monthly bar chart
│   │   ├── layout/
│   │   │   └── Navbar.jsx             # Top navigation bar
│   │   ├── transactions/
│   │   │   ├── TransactionForm.jsx    # Add/Edit form with validation
│   │   │   ├── TransactionItem.jsx    # Single transaction row
│   │   │   └── TransactionList.jsx    # List with search & filter
│   │   └── ui/
│   │       ├── EmptyState.jsx         # Empty placeholder component
│   │       ├── Modal.jsx              # Reusable modal dialog
│   │       └── StatCard.jsx           # Summary stat card
│   ├── hooks/
│   │   └── useTransactions.js         # Custom hook (selector + dispatch)
│   ├── pages/
│   │   └── Dashboard.jsx              # Main dashboard page
│   ├── schemas/
│   │   └── transactionSchema.js       # Zod schema + category config
│   ├── services/
│   │   ├── firebase.js                # Firebase app init
│   │   └── transactionService.js      # Firestore CRUD operations
│   ├── store/
│   │   ├── slices/
│   │   │   └── transactionsSlice.js   # Redux slice with async thunks
│   │   └── index.js                   # Store configuration
│   ├── utils/
│   │   └── helpers.js                 # formatCurrency, formatDate, etc.
│   ├── App.jsx                        # Root component with providers
│   ├── main.jsx                       # Entry point
│   └── index.css                      # Tailwind + global styles
├── .env.example                       # Environment variable template
├── .gitignore
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- A Firebase project (free tier works)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/aryankanchan018/new-demo-.git
cd new-demo-/finance-tracker

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Firebase credentials in .env

# 4. Start the development server
npm run dev
```

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database** (start in test mode)
4. Go to **Project Settings → General → Your Apps**
5. Click **Add App → Web**
6. Copy the config values into your `.env` file

### Firestore Security Rules (recommended)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /transactions/{docId} {
      allow read, write: if true; // Update with auth rules in production
    }
  }
}
```

---

## 🔐 Environment Variables

Create a `.env` file in the `finance-tracker/` directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Never commit your `.env` file. It's already in `.gitignore`.

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## ⚙️ How It Works

### Transaction Data Model
```js
{
  id: "firestore_auto_id",
  description: "Monthly Salary",
  amount: 5000.00,
  category: "salary",        // enum: salary | freelance | investment | food | ...
  type: "income",            // enum: income | expense
  date: "2024-01-15",
  notes: "January paycheck", // optional
  createdAt: Timestamp,
  updatedAt: Timestamp       // set on edit
}
```

### Validation Rules (Zod)
| Field       | Rule                                      |
|-------------|-------------------------------------------|
| description | min 2 chars, max 100 chars                |
| amount      | positive number, max 1,000,000            |
| category    | must be one of 9 predefined values        |
| type        | must be `income` or `expense`             |
| date        | required string                           |
| notes       | optional, max 200 chars                   |

### Chart Data Logic
- **Doughnut Chart** — Groups expense transactions by category, calculates percentage share
- **Bar Chart** — Groups all transactions by `YYYY-MM`, shows last 6 months of income vs expense

---

## 🔮 Future Enhancements

- [ ] **Authentication** — Firebase Auth (Google/Email login)
- [ ] **Budget Goals** — Set monthly limits per category
- [ ] **CSV Export** — Download transactions as spreadsheet
- [ ] **Recurring Transactions** — Auto-add monthly bills
- [ ] **Multi-currency** — Support for different currencies
- [ ] **Dark/Light Toggle** — User theme preference
- [ ] **Date Range Filter** — Filter by week/month/custom range
- [ ] **PWA Support** — Installable offline-capable app
- [ ] **Unit Tests** — Vitest + React Testing Library

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License © 2024 Aryan Kanchan

---

<div align="center">
Made with ❤️ by <a href="https://github.com/aryankanchan018">Aryan Kanchan</a>
</div>
