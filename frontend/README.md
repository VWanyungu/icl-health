# ICL Health - Frontend

This is the frontend application for the ICL Health system built with React, TypeScript, and Vite.

---

## Features & What Was Accomplished

- **User Interface**: Complete UI design and layout implementation.
- **Business Rules Enforcement**: Client-side validation and enforcement of system business logic and workflows such one form submission per user per day for the vital and assessment forms.
- **Mocked Authentication**: Implemented mock login and signup flows.
- **In-Memory Database & Storage**: Simulated database interactions and state persistence via classes defined in [`frontend/src/lib/database.tsx`]

---

## Known Limitations & Constraints

Due to project time constraints, the following features could not be completed:

- **Backend & API Integration**: Existing external APIs were not integrated and a custom backend was not developed (all data/auth operations are currently handled via local mocks).
- **Responsive Design**: The UI is not fully responsive across mobile and varying screen sizes.
- **Authentication Extensions**: Forgot password recovery and social login options are not yet implemented.

---

## How to Run Locally

Follow these steps to set up and run the frontend development server:

### 1. Clone the repository
```bash
git clone <repository-url>
```

### 2. Navigate to the frontend directory
```bash
cd frontend
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the development server
```bash
npm run dev
```

The application will be accessible at the local Vite URL (typically `http://localhost:5173`).
