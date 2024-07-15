from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.project.rest import app as project_app

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.mount("/projects", project_app)
