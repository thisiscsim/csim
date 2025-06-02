import { PROJECT_GROUPS } from '@/app/data'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { id } = params
  
  // Find the project across all groups
  let project = null
  for (const group of PROJECT_GROUPS) {
    const found = group.projects.find(p => p.id === id)
    if (found) {
      project = found
      break
    }
  }

  if (!project) {
    notFound()
  }

  return (
    <main className="h-full w-full">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <p className="text-lg mb-8">{project.description}</p>
      {/* Add more project content here */}
    </main>
  )
} 