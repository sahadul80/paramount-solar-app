import { projects } from '@/app/data/projectData'
import ProjectVisualization from '../../../components/ProjectVisualization'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects[params.slug]

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div>
      <ProjectVisualization projectData={project} />
    </div>
  )
}
