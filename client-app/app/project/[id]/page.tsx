"use client"

import { Project, getProject } from "@/app/api/projects"
import { useEffect, useState } from "react"



export default function ProjectDetails({ params }: { params: { id: number } }) {
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProject(params.id)
      setProject(projectsData)
    }
    fetchData()
  }, [params.id])
  return (
    <section>
      {
        project ?
        (
          <div>
            <h1>{project.name}</h1>
            <h2>Partners: {project.partners.join(", ")}</h2>
            <h2>Patients count: {project.patientsCount}</h2>
            <h2>Age average: {project.patientsAgeAverage}</h2>
          </div>
        )
        :
        (
          <h1>No project...</h1>
        )
      }
    </section>
  );
}
