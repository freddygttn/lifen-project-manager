from pydantic import BaseModel


class Project(BaseModel):
    id: int
    name: str
    partners: list[str]
    patients_count: int
    patients_age_average: float
