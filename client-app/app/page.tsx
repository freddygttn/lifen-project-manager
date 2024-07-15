"use client"

import Link from "next/link";
import { Project, listProjects } from "./api/projects";
import { useEffect, useState } from "react";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await listProjects()
      setProjects(projectsData)
    }
    fetchData()
  }, [])

  return (
    <section>
      <Link href="/new">Create project</Link>
      <h1>All projects: </h1>
      <ul>
        {projects.map(p => (
          <li key={p.id}><Link href={`/project/${p.id}`}>{p.name}</Link></li>
        ))}
      </ul>
    </section>
  );
}
