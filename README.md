# Full-Stack Healthcare Appointment System (MERN)

A production-ready system for patients to book and manage medical appointments, and for doctors to manage their patient schedule.

## Features
- **User Authentication**: Secure JWT-based registration and login for Patients and Doctors.
- **Doctor Discovery**: Search and filter doctors by name or specialization.
- **Appointment Booking**: Real-time scheduling with date/time selection.
- **Role-Based Dashboards**: 
    - Patients: Track appointments and history.
    - Doctors: Manage patient bookings (Confirm/Cancel/Complete).
- **Responsive UI**: Fully mobile-friendly design using Tailwind CSS.
- **Security**: Password hashing with Bcrypt and protected routes.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Lucide Icons, Axios, Context API.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose ODM.
- **DevOps**: Docker & Docker Compose.

## Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- npm or yarn

## Installation & Setup

### 1. Manual Setup (Local)

#### Backend:
    cd backend
    npm install
    cp .env.example .env
    # Edit .env with your MongoDB URI and JWT Secret
    npm run dev

#### Frontend:
    cd frontend
    npm install
    npm run dev

### 2. Docker Setup (Recommended)
Run the entire stack (Database + Backend + Frontend) with one command:
    docker-compose up --build

The application will be available at:
- Frontend: `http://localhost:80`
- API Backend: `http://localhost:5000`

## API Endpoints

### Auth
- `POST /api/auth/register`: Create new user
- `POST /api/auth/login`: Login user
- `GET /api/auth/me`: Get current user (Private)

### Doctors
- `GET /api/doctors`: List all doctors (supports query: `?search=name&specialization=cardiology`)
- `GET /api/doctors/:id`: Get doctor profile

### Appointments
- `POST /api/appointments`: Book new (Private)
- `GET /api/appointments/my`: Get user specific appointments (Private)
- `PATCH /api/appointments/:id/status`: Update status (Private)

## Project Structure
    healthcare-system/
    ├── backend/           # Node/Express API
    │   ├── controllers/   # Logic handlers
    │   ├── models/        # DB Schemas
    │   ├── routes/        # API Routes
    │   └── server.js      # Entry Point
    ├── frontend/          # React App
    │   ├── src/context/   # Auth State
    │   ├── src/pages/     # UI Views
    │   └── src/services/  # API calls
    └── docker-compose.yml # Orchestration

## Troubleshooting
- **MongoDB Connection**: If running locally without Docker, ensure your `MONGO_URI` in `backend/.env` is correct.
- **CORS Issues**: The backend is configured to allow `http://localhost:5173` (Vite default) and `http://localhost:80`.
