"use client"
import { projects } from '../../../data/projectData'
import ProjectVisualization from '../../../components/ProjectVisualization'
import { use } from 'react'
import { NotFound } from '../../../components/NotFound'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'

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
      <Header/>
      <div className="p-2 sm:p-4 mx-auto sm:m-4">
      <ProjectVisualization projectData={project} />
      </div>
      <Footer/>
    </div>
  )
}