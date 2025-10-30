"use client"
import { projects } from '../../../data/projectData'
import ProjectVisualization from '../../../components/ProjectVisualization'
import { use } from 'react'
import { NotFound } from '../../../components/NotFound'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params)
  const project = projects[resolvedParams.slug]

  if (!project) {
    return <div><NotFound/></div>
  }

  return (
    <div>
      <ProjectVisualization projectData={project} />
    </div>
  )
}