# Schedula

A meeting scheduling service built with **Django REST Framework** (backend) and **Next.js** (frontend — WIP). Users can create meetings, manage participants, detect scheduling conflicts, receive email notifications, and export meetings as `.ics` calendar files.

## Design Decisions

- **Backend**: Django REST Framework — chosen for rapid API development.
- **Frontend**: Next.js — planned, implementation in progress.
- **Email**: Uses Django's console email backend for development (emails print to terminal).
- **Database**: SQLite for local development.
- **Auth**: Token-based authentication via [Djoser](https://djoser.readthedocs.io/).

## Features

- **Meeting CRUD** — Create, read, update, and delete meetings (title, description, date, start/end time, location).
- **Participant management** — Add/remove participants (Django users) to meetings via a many-to-many relationship.
- **Conflict detection** — Automatically prevents scheduling a meeting when any participant already has an overlapping meeting on the same date/time.
- **ICS export** — Export any meeting as a standard `.ics` calendar file, compatible with Google Calendar, Outlook, Apple Calendar, etc.
- **Email notifications** — Participants receive an email when they are added to a meeting (console backend in dev).
- **API documentation** — Interactive Swagger UI and ReDoc via [drf-spectacular](https://drf-spectacular.readthedocs.io/).
- **Token authentication** — Register, login, and authenticate API requests with tokens (Djoser + DRF TokenAuthentication).

## Architecture (C4 Model)

### Level 1 — System Context

```
[User] ---Uses---> [Schedula - Meeting Scheduling System]
```

### Level 2 — Container

```
[User]
  |
  v
[Frontend - Next.js] <----> [Backend API - Django REST Framework]
                                      |
                                      v
                              [SMTP Server (console backend in dev)]
```

## Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Backend    | Django 6.0, Django REST Framework    |
| Auth       | Djoser, DRF TokenAuthentication      |
| Calendar   | icalendar (Python)                   |
| API Docs   | drf-spectacular (Swagger / ReDoc)    |
| Debug      | django-debug-toolbar                 |
| Frontend   | Next.js (WIP)                        |
| Database   | SQLite (dev)                         |

## API Endpoints

| Method | Endpoint                                  | Description                    |
| ------ | ----------------------------------------- | ------------------------------ |
| GET    | `/schedula-core/meetings/`                | List all meetings              |
| POST   | `/schedula-core/meetings/`                | Create a meeting               |
| GET    | `/schedula-core/meetings/{id}/`           | Retrieve a meeting             |
| PUT    | `/schedula-core/meetings/{id}/`           | Update a meeting               |
| PATCH  | `/schedula-core/meetings/{id}/`           | Partial update a meeting       |
| DELETE | `/schedula-core/meetings/{id}/`           | Delete a meeting               |
| GET    | `/schedula-core/meetings/{id}/export/`    | Export meeting as `.ics` file  |
| POST   | `/auth/users/`                            | Register a new user            |
| POST   | `/auth/token/login/`                      | Obtain auth token              |
| POST   | `/auth/token/logout/`                     | Destroy auth token             |
| GET    | `/api/schema/swagger-ui/`                 | Swagger UI                     |
| GET    | `/api/schema/redoc/`                      | ReDoc                          |

## Getting Started

### Prerequisites

- **Python 3.12+**
- **pipenv**

### 1. Clone the repository

```bash
git clone <repository-url>
cd schedula
```

### 2. Install dependencies

```bash
pipenv install
```

### 3. Run migrations

```bash
pipenv run python manage.py migrate
```

### 4. Create a superuser

```bash
pipenv run python manage.py createsuperuser
```

### 5. Start the development server

```bash
pipenv run python manage.py runserver
```

The API will be available at **http://127.0.0.1:8000/**.

### 6. Explore the API

- Swagger UI: http://127.0.0.1:8000/api/schema/swagger-ui/
- ReDoc: http://127.0.0.1:8000/api/schema/redoc/
- Admin panel: http://127.0.0.1:8000/admin/

### Quick usage example

```bash
# Register a user
curl -X POST http://127.0.0.1:8000/auth/users/ \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "strongpass123"}'

# Get a token
curl -X POST http://127.0.0.1:8000/auth/token/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "alice", "password": "strongpass123"}'

# Create a meeting (replace <token> with the token from above)
curl -X POST http://127.0.0.1:8000/schedula-core/meetings/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token <token>" \
  -d '{
    "name": "Sprint Planning",
    "description": "Plan the next sprint",
    "date": "2026-03-01",
    "start_time": "10:00:00",
    "end_time": "11:00:00",
    "location": "Room 42",
    "participants": []
  }'

# Export a meeting as ICS
curl -H "Authorization: Token <token>" \
  http://127.0.0.1:8000/schedula-core/meetings/1/export/ -o event.ics
```

## Project Structure

```
schedula/
├── config/                     # Django project configuration
│   ├── settings/
│   │   ├── base.py             # Shared settings
│   │   ├── local.py            # Development settings (default)
│   │   └── production.py       # Production settings
│   ├── urls.py                 # Root URL configuration
│   └── wsgi.py / asgi.py
├── schedula_core/              # Main Django app
│   ├── api/
│   │   ├── models/
│   │   │   └── meeting.py      # Meeting model
│   │   ├── serializers/
│   │   │   └── meeting_serializers.py
│   │   ├── views/
│   │   │   └── meeting_views.py  # ViewSet + ICS export
│   │   ├── services/
│   │   │   └── conflict.py     # Conflict detection logic
│   │   ├── signals/
│   │   │   └── send_email.py   # Email notification on participant add
│   │   └── urls.py             # App-level URL routing
│   ├── apps.py
│   └── migrations/
├── frontend/                   # Next.js frontend (WIP)
├── manage.py
├── Pipfile                     # Python dependencies
└── db.sqlite3                  # SQLite database (dev)
```
