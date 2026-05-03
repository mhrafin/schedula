# Schedula

## Description

Schedula is a full-stack meeting management app that prevents double-bookings, notifies participants automatically, and exports events to any calendar. It pairs a Next.js frontend with a Django REST API so teams can schedule confidently without context switching.

**Demo placeholder:** Add a screenshot, GIF, or short video link here to show the scheduling flow in action.

---

## Motivation

Ever tried to schedule a meeting only to realize half your team is already booked? Calendars are supposed to make life easier, but coordinating schedules across multiple people is still a headache.

**Schedula was built to solve this.** When you create a meeting and add participants, it automatically checks for conflicts—no more back-and-forth emails asking "does 2pm work?" If there's a clash, you'll know before you hit save.

Personal motivation placeholder: Add a short story about the real scheduling pain that inspired this project and what you wanted to make better.

I wanted a scheduling tool that:
- **Catches conflicts instantly** — not after you've already sent invites
- **Works with existing calendars** — export to Google Calendar, Outlook, or Apple Calendar with one click
- **Keeps everyone in the loop** — automatic email notifications when participants are added

---

## Quick Start

### Option 1: Run the Full Stack

**Prerequisites:** Python 3.12+, Node.js 18+, pipenv

```bash
# Clone and enter the project
git clone <repository-url>
cd schedula

# Start the backend (terminal 1)
pipenv install
pipenv run python manage.py migrate
pipenv run python manage.py runserver

# Start the frontend (terminal 2)
cd frontend
npm install
npm run dev
```

- **Frontend:** http://localhost:3000
- **Backend API:** http://127.0.0.1:8000
- **API Docs:** http://127.0.0.1:8000/api/schema/swagger-ui/

### Option 2: API-Only Quick Test

```bash
# Register a user
curl -X POST http://127.0.0.1:8000/auth/users/ \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "strongpass123"}'

# Get an auth token
curl -X POST http://127.0.0.1:8000/auth/token/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "strongpass123"}'

# Create a meeting (replace <token>)
curl -X POST http://127.0.0.1:8000/schedula-core/meetings/ \
  -H "Authorization: Token <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sprint Planning",
    "description": "Plan the next sprint",
    "date": "2026-03-25",
    "start_time": "10:00:00",
    "end_time": "11:00:00",
    "location": "Room 42",
    "participants": []
  }'
```

---

## Features

| Feature | Description |
|---------|-------------|
| **Conflict Detection** | Automatically prevents double-booking when any participant has an overlapping meeting |
| **ICS Export** | Download any meeting as a `.ics` file compatible with all major calendars |
| **Email Notifications** | Participants are notified automatically when added to a meeting |
| **Token Authentication** | Secure API access via Djoser + DRF TokenAuthentication |
| **Interactive API Docs** | Swagger UI and ReDoc for easy API exploration |
| **Organizer Tracking** | Meetings are automatically linked to their creator |

---

## Usage

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **Meetings** |
| `GET` | `/schedula-core/meetings/` | List all meetings |
| `POST` | `/schedula-core/meetings/` | Create a meeting |
| `GET` | `/schedula-core/meetings/{id}/` | Retrieve a meeting |
| `PUT` | `/schedula-core/meetings/{id}/` | Full update |
| `PATCH` | `/schedula-core/meetings/{id}/` | Partial update |
| `DELETE` | `/schedula-core/meetings/{id}/` | Delete a meeting |
| `GET` | `/schedula-core/meetings/{id}/export/` | Export as `.ics` file |
| **Authentication** |
| `POST` | `/auth/users/` | Register a new user |
| `POST` | `/auth/token/login/` | Obtain auth token |
| `POST` | `/auth/token/logout/` | Revoke auth token |
| **Documentation** |
| `GET` | `/api/schema/swagger-ui/` | Swagger UI |
| `GET` | `/api/schema/redoc/` | ReDoc |

### Frontend Routes

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/login` | User login |
| `/meeting/create` | Create a new meeting |

### Export a Meeting to Your Calendar

```bash
curl -H "Authorization: Token <token>" \
  http://127.0.0.1:8000/schedula-core/meetings/1/export/ \
  -o sprint-planning.ics
```

Then import `sprint-planning.ics` into Google Calendar, Outlook, or Apple Calendar.

---

## Tech Stack

### Backend

| Component | Technology |
|-----------|------------|
| Framework | Django 6.0 + Django REST Framework |
| Authentication | Djoser + DRF TokenAuthentication |
| Calendar Export | icalendar |
| API Documentation | drf-spectacular (Swagger / ReDoc) |
| Database | SQLite (development) |
| Python | 3.12+ |

### Frontend

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui + Radix UI |
| Icons | Lucide React |
| Optimization | React Compiler enabled |

---

## Project Structure

```
schedula/
├── config/                     # Django project settings
│   ├── settings/
│   │   ├── base.py             # Shared settings
│   │   ├── local.py            # Development settings
│   │   └── production.py       # Production settings
│   └── urls.py                 # Root URL configuration
├── schedula_core/              # Main Django app
│   ├── api/
│   │   ├── models/             # Meeting model
│   │   ├── serializers/        # DRF serializers
│   │   ├── views/              # ViewSets + ICS export
│   │   ├── services/           # Conflict detection logic
│   │   └── signals/            # Email notifications
│   └── migrations/
├── frontend/                   # Next.js frontend
│   └── src/
│       ├── app/                # App Router routes
│       ├── components/
│       │   ├── ui/             # shadcn/ui primitives
│       │   └── meeting/        # Feature components
│       └── lib/                # Utilities
├── manage.py
├── Pipfile                     # Python dependencies
└── db.sqlite3                  # SQLite database (dev)
```

---

## Contributing

### Clone and Setup

```bash
git clone <repository-url>
cd schedula

# Backend
pipenv install
pipenv run python manage.py migrate

# Frontend
cd frontend
npm install
```

### Run Tests

```bash
# Backend tests
pipenv run python manage.py test

# Frontend type-check
cd frontend && npx tsc --noEmit

# Frontend lint
cd frontend && npm run lint
```

### Development Servers

```bash
# Backend (from root)
pipenv run python manage.py runserver

# Frontend (from frontend/)
npm run dev
```

### Submit a Pull Request

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request to `main`

---

## Architecture

```
┌─────────────────┐     HTTP      ┌──────────────────────────────┐
│                 │◄────────────►│                              │
│  Next.js 16     │               │  Django REST Framework       │
│  (Frontend)     │               │  (Backend API)               │
│                 │               │                              │
│  localhost:3000 │               │  localhost:8000              │
└─────────────────┘               └──────────────┬───────────────┘
                                                 │
                                                 ▼
                                  ┌──────────────────────────────┐
                                  │  SQLite (dev) / PostgreSQL   │
                                  └──────────────────────────────┘
```

---

## License

This project is available under the MIT License.
