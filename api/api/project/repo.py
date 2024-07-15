from sqlite3 import connect
from typing import Any


class SQLiteRepo:
    def __init__(self):
        self.conn = connect("projects.db", check_same_thread=False)
        self.c = self.conn.cursor()
        self.c.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY,
                name TEXT,
                partners TEXT,
                patients_count INTEGER,
                patients_age_avg REAL
                )
            """)
        self.conn.commit()

    def insert(self, name: str, partners: str, patients_count: int, patients_age_avg: float):
        self.c.execute("""
            INSERT INTO projects (name, partners, patients_count, patients_age_avg)
            VALUES (?, ?, ?, ?)
        """, (name, partners, patients_count, patients_age_avg))
        self.conn.commit()

    def get_all(self) -> list:
        self.c.execute("SELECT * FROM projects")
        projects = self.c.fetchall()
        return projects

    def get(self, id: int) -> Any:
        self.c.execute("SELECT * FROM projects WHERE id=?", (id,))
        project = self.c.fetchone()
        return project


    def delete(self, id: int):
        self.c.execute("DELETE FROM projects WHERE id=?", (id,))
        self.conn.commit()
