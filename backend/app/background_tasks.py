from app.celery_app import celery_app


@celery_app.task
def process_task_notification(task_title):
    print(f"Background job executed for task: {task_title}")

    return {
        "status": "completed",
        "task": task_title
    }