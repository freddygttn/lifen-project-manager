const API_HOST = "http://127.0.0.1:8000"

export interface Project {
  id: number;
  name: string;
  partners: string[];
  patientsCount: number;
  patientsAgeAverage: number;
}

export async function listProjects(): Promise<Project[]> {
  const res = await fetch(`${API_HOST}/projects/`)

  if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return data.map((d: { id: number, name: string; partners: string[]; patients_count: number; patients_age_average: number; }) => {
    return {
      id: d.id,
      name: d.name,
      partners: d.partners,
      patientsCount: d.patients_count,
      patientsAgeAverage: d.patients_age_average,
    }
  })
}

export async function getProject(id: number): Promise<Project> {
  const res = await fetch(`${API_HOST}/projects/${id}/`)

  if (!res.ok) {
      throw new Error('Failed to fetch data')
  }

  const data = await res.json()

  return {
    id: data.id,
    name: data.name,
    partners: data.partners,
    patientsCount: data.patients_count,
    patientsAgeAverage: data.patients_age_average,
  }
}

export async function createProject(name: string) {
  const res = await fetch(`${API_HOST}/projects/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name
      })
  })

  if (!res.ok) {
      throw new Error('Failed to fetch data')
  }

  return res.json()
}

export async function deleteProject(id: number) {
  const res = await fetch(`${API_HOST}/projects/${id}/`, { method: "DELETE" })

  if (!res.ok) {
      throw new Error('Failed to fetch data')
  }

  return res.json()
}