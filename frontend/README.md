# BrainBuff Frontend Application

BrainBuff is a high-performance, SaaS-grade cognitive training and neuroplasticity platform built with React 19, Redux Toolkit, React Router, and modern CSS architecture.

---

## 🚀 Key Features

- **Authentication & Authorization**: JWT token lifecycle, automatic Bearer injection via Axios interceptors, session persistence across reloads, and role-based UI permissions (`TRAINEE`, `NEURO_COACH`, `SYSTEM_ARCHITECT`).
- **Cognitive Dashboard**: High-level neuro-performance telemetry with real-time indicators for `Memory Index`, `Processing Speed`, `Attention`, and `Logic`, alongside recent activity logs and recommendations.
- **Memory Hub**: Spaced repetition flashcard deck management with real-time CRUD operations, interactive review modal, and retention statistics.
- **Cognitive Exercises**: Multi-tiered catalog of exercises across `MEMORY`, `ATTENTION`, and `LOGIC` domains with responsive search and category filters.
- **Interactive Training Sessions**: Real-time training interface with countdown timer HUD, dynamic spatial/sound stimulus patterns, interactive input capture, and automated backend result submission.
- **Training Programs**: Multi-week structured regimens curated by coaches with multi-select cognitive exercise mapping and trainee enrollment tracking.
- **Global Error & Notification Stack**: Top viewport alert banner for API failures and toast stack with auto-dismiss animations.
- **Responsive & Accessible**: Pixel-perfect layout from 320px mobile to 1920px desktop with no horizontal overflow.

---

## 🛠 Tech Stack

- **Framework**: React 19 / JSX
- **State Management**: Redux Toolkit & React Redux
- **Routing**: React Router v6
- **HTTP Client**: Axios (centralized instance with interceptors)
- **Styling**: Vanilla CSS (Variables, Flexbox, CSS Grid, Media Queries)
- **Testing**: Jest & React Testing Library

---

## 📂 Project Architecture

```
frontend/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   ├── illustrations/
│   │   └── images/
│   ├── components/
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   ├── common/
│   │   │   ├── ConfirmDialog.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorHandler.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── NotificationStack.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── SearchFilterBar.jsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   └── StatCards.jsx
│   │   ├── decks/
│   │   │   ├── MemoryDeckForm.jsx
│   │   │   ├── MemoryDeckList.jsx
│   │   │   └── ReviewModal.jsx
│   │   ├── exercises/
│   │   │   ├── ExerciseForm.jsx
│   │   │   ├── ExerciseList.jsx
│   │   │   └── TrainingSession.jsx
│   │   ├── layout/
│   │   │   ├── AppLayout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   └── Sidebar.jsx
│   │   └── programs/
│   │       ├── ProgramForm.jsx
│   │       └── ProgramList.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useDebounce.js
│   │   └── useNotification.js
│   ├── pages/
│   │   ├── DashboardPage.jsx
│   │   ├── ExercisesPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── MemoryHubPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ProgramsPage.jsx
│   │   └── TrainingSessionPage.jsx
│   ├── routes/
│   │   └── AppRoutes.jsx
│   ├── services/
│   │   ├── analyticsService.js
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── deckService.js
│   │   ├── exerciseService.js
│   │   ├── programService.js
│   │   └── sessionService.js
│   ├── store/
│   │   ├── index.js
│   │   └── slices/
│   │       ├── authSlice.js
│   │       ├── deckSlice.js
│   │       ├── exerciseSlice.js
│   │       ├── metricSlice.js
│   │       ├── programSlice.js
│   │       └── sessionSlice.js
│   ├── styles/
│   │   ├── components.css
│   │   ├── globals.css
│   │   ├── responsive.css
│   │   └── variables.css
│   ├── utils/
│   │   ├── constants.js
│   │   ├── formatters.js
│   │   ├── storage.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── App.js
│   ├── index.js
│   └── main.jsx
├── tests/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── store/
├── .env
├── .env.example
└── package.json
```

---

## 🏃 Getting Started

### 1. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configuration variables:
```env
VITE_API_BASE_URL=http://localhost:8080/api
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm start
```

### 4. Run Automated Test Suites

```bash
npm test -- --watchAll=false
```

---

## 🔒 Security & Roles

- **TRAINEE**: Access to training sessions, memory decks, program catalog, and personal dashboard.
- **NEURO_COACH**: Access to create and curate training programs, manage cognitive modules, and review trainee metrics.
- **SYSTEM_ARCHITECT**: Full administrative control over exercises, programs, decks, and platform configuration.
