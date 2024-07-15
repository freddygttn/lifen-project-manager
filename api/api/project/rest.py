from fastapi import FastAPI, status
from pydantic import BaseModel

from api.project.service import ProjectService


class CreateProjectDTO(BaseModel):
    name: str


app = FastAPI()
project_service = ProjectService()


@app.get("/")
def get_projects():
    return project_service.get_all()


@app.get("/{project_id}")
def get_project(project_id: int):
    return project_service.get_by_id(project_id)


@app.post("/", status_code=status.HTTP_201_CREATED)
def create_project(project: CreateProjectDTO):
    return project_service.create(project.name)


@app.delete("/{project_id}")
def delete_project(project_id: int):
    return project_service.delete(project_id)
