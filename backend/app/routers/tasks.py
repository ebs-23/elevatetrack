from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import TaskCreate, TaskUpdate, TaskResponse

from app.background_tasks import process_task_notification

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)


# CREATE - Add a task and trigger a background job
@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):

    new_task = models.Task(
        title=task.title.strip(),
        completed=False
    )

    if not new_task.title:
        raise HTTPException(
            status_code=422,
            detail="Title cannot be empty"
        )

    # Save task in PostgreSQL
    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    # Trigger background job using Celery
    process_task_notification.delay(new_task.title)

    return new_task


# READ
@router.get("/", response_model=list[TaskResponse])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()


# UPDATE
@router.patch("/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db)
):
    existing_task = db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()

    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")

    update_data = task.model_dump(exclude_unset=True)

    if "title" in update_data:
        update_data["title"] = update_data["title"].strip()
        if not update_data["title"]:
            raise HTTPException(status_code=422, detail="Title cannot be empty")

    for key, value in update_data.items():
        setattr(existing_task, key, value)

    db.commit()
    db.refresh(existing_task)

    return existing_task


# DELETE
@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    existing_task = db.query(models.Task).filter(
        models.Task.id == task_id
    ).first()

    if not existing_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(existing_task)
    db.commit()

    return {"message": "Task deleted successfully"}