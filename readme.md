# How to start server

## 1. Start Production server

install docker on your machine

- docker compose -f docker-compose.yml up -d --build

## 2. Start Development server

- docker compose -f docker-compose.dev.yml up -d --build

# How to use

Frontend is running on port 3000
Backend is running on port 5000

# Backend ENV variables

PORT = 4000
DATABASE_URL=
MAILGUN_API_KEY =
MAILGUN_DOMAIN =
MAILGUN_MAIL_LIST_DOMAIN =
REFRESH_TOKEN_SECRET=
ACCESS_TOKEN_SECRET =
RESET_TOKEN_SECRET =
FRONTEND_URL= http://localhost:3000

# Frontend ENV variables

VITE_BACKEND_SERVER=http://localhost:4000
