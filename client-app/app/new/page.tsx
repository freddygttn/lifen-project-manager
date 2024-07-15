"use client"

import { useState } from "react";
import { useRouter } from 'next/navigation'
import { createProject } from "../api/projects";

export default function NewProject() {
  const router = useRouter()
  const [name, setName] = useState("")

  const createProjectHandler = async () => {
     await createProject(name)
     router.replace("/")
  }

  return (
    <section>
      <h1>New project</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={createProjectHandler} disabled={name.trim() === ""}>Create project</button>
    </section>
  );
}
