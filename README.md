# Atom Institute

An educational platform for students in classes 10, 11, and 12 across ICSE, CBSE, and Madhyamik boards.

## Project Overview

Atom Institute is a comprehensive educational platform designed to provide quality education and resources for high school students. The application consists of:

- A **Next.js frontend** with a modern UI built using Tailwind CSS
- A **Flask backend API** for handling data operations

## Directory Structure

```
atom-institute/       # Frontend Next.js application
  ├── app/            # Next.js app directory with pages and routing
  ├── components/     # React components
  │    ├── ui/        # UI component library
  │    └── ...
  ├── hooks/          # Custom React hooks
  ├── lib/            # Utility functions and API clients
  ├── public/         # Static assets
  │    └── images/    # Image assets
  └── styles/         # Global styles
  
backend/              # Flask backend application
  ├── app.py          # Main Flask application
  └── requirements.txt # Python dependencies
```

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) (pnpm recommended)
- [Python](https://www.python.org/) (v3.8 or higher)
- [pip](https://pip.pypa.io/en/stable/)

## Installation & Setup

### Frontend (Next.js)

1. Navigate to the frontend directory:

```bash
cd atom-institute
```

2. Install dependencies:

```bash
# Using npm
npm install

# OR using pnpm (recommended)
pnpm install
```

3. Create a `.env.local` file in the root directory with necessary environment variables:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (Flask)

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create and activate a virtual environment:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Activate virtual environment (macOS/Linux)
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Running the Application

### Start the Backend Server

1. Make sure your virtual environment is activated
2. From the backend directory:

```bash
flask run
# or 
python app.py
```

The Flask API will start running on http://localhost:5000

### Start the Frontend Development Server

From the atom-institute directory:

```bash
# Using npm
npm run dev

# OR using pnpm
pnpm dev
```

The Next.js frontend will start running on http://localhost:3000

## Building for Production

### Frontend

```bash
# Using npm
npm run build

# OR using pnpm
pnpm build
```

To start the production build:

```bash
# Using npm
npm start

# OR using pnpm
pnpm start
```

### Backend

For production deployment of the Flask backend, consider using a production WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn app:app
```

## Features

- Interactive educational content for high school students (classes 10-12)
- Support for multiple educational boards (ICSE, CBSE, Madhyamik)
- Subject-specific study materials and resources
- Responsive design for desktop and mobile viewing
- Dark/light theme support

## Technologies Used

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI Components

### Backend
- Flask
- Flask-CORS

## License

[MIT License](LICENSE)

## Contact

For any inquiries, please reach out to contact@atominstitute.edu