"use client"
import { projects } from '@/app/data/projectData'
import ProjectVisualization from '../../../components/ProjectVisualization'
import { use } from 'react'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = use(params)
  const project = projects[resolvedParams.slug]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div>
      <ProjectVisualization projectData={project} />
    </div>
  )
}