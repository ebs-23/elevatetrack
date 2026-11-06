# ElevateTrack – Learning & Task Management Platform

ElevateTrack is a sample full-stack learning and task management application developed to practise modern web development and backend technologies.

The application allows users to manage tasks, track learning progress, and explore background job processing using Redis and Celery.

## Features

- Dashboard with task statistics.
- Create, view, update, and delete tasks.
- Filter tasks by pending and completed status.
- Track learning progress.
- REST API development using FastAPI.
- PostgreSQL database integration.
- Redis for message brokering.
- Celery for background task processing.
- Docker Compose for running the application services together.

## Technology Stack

| Component | Technology |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| ORM | SQLAlchemy |
| Background Processing | Celery |
| Message Broker | Redis |
| Containerization | Docker, Docker Compose |
| Version Control | Git, GitHub |

## Architecture

```text
             User / Browser
                    |
                    v
             Next.js Frontend
                Port 3000
                    |
               REST API
                    |
                    v
              FastAPI Backend
                Port 8000
                 /       \
                v         v
          PostgreSQL    Redis
          Database        |
                          v
                     Celery Worker
                  Background Jobs
```

## Project Structure

```text
elevatetrack/
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js
│   │   │   ├── tasks/
│   │   │   └── progress/
│   │   ├── components/
│   │   └── lib/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── celery_app.py
│   │   ├── background_tasks.py
│   │   └── routers/
│   ├── Dockerfile
│   └── requirements.txt
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Running the Project

### Prerequisites

- Docker Desktop
- Docker Compose
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/ebs-23/elevatetrack.git
cd elevatetrack
```

### 2. Start the Application

```bash
docker compose up --build
```

This starts the frontend, backend, PostgreSQL database, Redis, and Celery worker.

### 3. Access the Application

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000 |
| API Documentation | http://localhost:8000/docs |

### 4. Stop the Application

```bash
docker compose down
```

To stop the containers without removing the database volume, use the command above. Your PostgreSQL data is retained in the named Docker volume.

## Learning Outcomes

Through this project, I practised:

- Building a frontend using Next.js and React.
- Developing REST APIs using FastAPI.
- Implementing CRUD operations.
- Connecting a backend application to PostgreSQL using SQLAlchemy.
- Understanding Redis and Celery for asynchronous task processing.
- Containerizing applications using Docker.
- Managing multiple services using Docker Compose.
- Using Git and GitHub for version control.

## Project Scope

ElevateTrack is a learning project developed to understand full-stack application development and the integration of backend services. It is a sample application and is not intended to be a production-ready LMS.