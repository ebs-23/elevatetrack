from fastapi import FastAPI
from app.routers import tasks

from app.database import engine, Base
from app import models

from sqlalchemy import text
from app.database import engine

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="ElevateTrack API",
    description="Backend API for the ElevateTrack application",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(tasks.router)


@app.get("/")
def home():
    return {
        "message": "Welcome to ElevateTrack API"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
    
@app.get("/db-check")
def check_database():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "database": "connected",
            "message": "PostgreSQL connection successful"
        }

    except Exception as error:
        return {
            "database": "disconnected",
            "error": str(error)
        }    

