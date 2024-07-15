from api.project.model import Project
from api.project.repo import SQLiteRepo
import random


PARTNERS = ["Hôpital Saint-Louis", "Clinique Pasteur", "Centre Médical des Alpes", "Institut National de la Santé et de la Recherche Médicale (INSERM)", "Centre National de la Recherche Scientifique (CNRS)", "Clinique du Parc", "Hôpital Cochin", "Centre Hospitalier Universitaire de Bordeaux", "Hôpital Necker-Enfants Malades", "Centre Hospitalier Régional d'Orléans", "Centre Hospitalier Universitaire de Lille", "Hôpital de la Timone", "Centre Hospitalier Universitaire de Grenoble", "Hôpital Robert-Debré", "Clinique Saint-Jean", "Centre Hospitalier de Versailles", "Hôpital Tenon", "Clinique Mutualiste", "Hôpital Lariboisière", "Centre Hospitalier de Mulhouse", "Hôpital Saint-Joseph", "Centre Hospitalier Annecy Genevois", "Hôpital Foch", "Clinique Bouchard", "Centre Hospitalier Universitaire de Rouen"]


class ProjectService:
    def __init__(self):
        self.repo = SQLiteRepo()

    def create(self, name: str):
        partners = ", ".join(random.sample(PARTNERS, 3))
        patients_count = random.randint(10, 100)
        patients_age_avg = round(random.gauss(45.0, 10.0), 1)
        self.repo.insert(name, partners, patients_count, patients_age_avg)

    def get_all(self) -> list:
        items = self.repo.get_all()
        return [Project(
            id=item[0],
            name=item[1],
            partners=item[2].split(", "),
            patients_count=item[3],
            patients_age_average=item[4]
        ) for item in items]

    def get_by_id(self, id: int):
        item = self.repo.get(id)
        return Project(
            id=item[0],
            name=item[1],
            partners=item[2].split(", "),
            patients_count=item[3],
            patients_age_average=item[4]
        )

    def delete(self, id: int):
        self.repo.delete(id)
