# QuarantineCare — React frontend

A modular, frontend-only React + CSS prototype for a quarantine and treatment facility.

## Requirements
- Node.js (LTS recommended)
- VS Code (optional)

## Run locally
1. Extract the ZIP.
2. Open the extracted folder in VS Code.
3. Open a terminal in that folder.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure
- `src/App.jsx` — app routes and role-based access guard
- `src/data/demoData.js` — editable sample patient and temperature records
- `src/context/AuthContext.jsx` — demo login state and selected role
- `src/components/` — reusable sidebar, topbar, stat cards, badges, patient table
- `src/pages/` — separate page components for login, each dashboard, patients, temperature logs, rounds, discharge, reports and care plan
- `src/styles/` — global and component CSS

## Demo login
On the login page, choose a role and use any valid email plus a password of at least 4 characters. Or click a quick role button.

## Important
This is a frontend prototype. Login is simulated, role guards are client-side only, and sample data is stored in React state. There is no backend, real authentication, database, or secure patient-data handling. Do not use real patient information or for clinical decisions.
