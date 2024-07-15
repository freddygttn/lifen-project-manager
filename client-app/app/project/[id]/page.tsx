"use client"

import { Project, deleteProject, getProject } from "@/app/api/projects"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"



export default function ProjectDetails({ params }: { params: { id: number } }) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProject(params.id)
      setProject(projectsData)
    }
    fetchData()
  }, [params.id])

  const deleteProjectHandler = async () => {
    setDeleting(true)
    await deleteProject(params.id)
    setDeleting(false)
    router.replace("/")
  }
  return (
    <section>
      {
        project ?
        (
          <div>
            <h1>{project.name}</h1>
            <button onClick={deleteProjectHandler} disabled={deleting}>Delete</button>
            <hr/>
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
