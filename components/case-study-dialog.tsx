'use client'

import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogContainer,
  MorphingDialogClose,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogImage,
} from '@/components/ui/morphing-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

type CaseStudyDialogProps = {
  trigger: React.ReactNode
  project: {
    id: string
    name: string
    description: string
    video: string
    dates?: string
    caseStudy?: {
      background: string
      solution: string
      impact: {
        stat: string
        label: string
        description?: string
      }[]
      credits?: {
        text: string
        people: {
          name: string
          role: string
          image: string
        }[]
      }
      images?: {
        src: string
        alt: string
        caption?: string
      }[]
    }
  }
}

export function CaseStudyDialog({ trigger, project }: CaseStudyDialogProps) {
  return (
    <MorphingDialog
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 24,
      }}
    >
      <MorphingDialogTrigger className="w-full">
        {trigger}
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          className="relative h-[100vh] w-[90vw] max-w-[1120px] border border-zinc-200 bg-white dark:bg-zinc-950 dark:border-zinc-800 p-0 font-[family-name:var(--font-berkeley-mono)]"
          style={{ borderRadius: '0px' }}
        >
          <ScrollArea className="h-full" type="scroll">
            <div className="relative flex flex-col gap-8 px-12 pt-24 pb-4 w-full mx-auto">
              {/* Header */}
              <div className="max-w-4xl mx-auto flex flex-col w-full">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {project.dates || 'March – June 2024'}
                </div>
                <div className="text-2xl font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                  {project.name}
                </div>
              </div>

              {/* Card with image/video */}
              <div className="flex justify-center">
                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-0 overflow-hidden w-full border border-zinc-200 dark:border-zinc-800">
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    className="w-full h-auto object-cover"
                    style={{ display: 'block' }}
                  />
                </div>
              </div>

              {/* Case Study Content */}
              {project.caseStudy && (
                <div className="space-y-12">
                  {/* Background */}
                  <section className="max-w-4xl mx-auto flex flex-col w-full">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">Background</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {project.caseStudy.background}
                    </p>
                  </section>

                  {/* Solution */}
                  <section className="max-w-4xl mx-auto flex flex-col w-full">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-1">Solution</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {project.caseStudy.solution}
                    </p>
                  </section>

                  {/* Additional Images */}
                  {project.caseStudy.images && project.caseStudy.images.length > 0 && (
                    <section>
                      <div className="grid grid-cols-1 gap-8">
                        {project.caseStudy.images.map((image, index) => (
                          <div key={index} className="space-y-2">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-auto rounded-lg"
                            />
                            {image.caption && (
                              <p className="text-zinc-500 dark:text-zinc-40 text-center">
                                {image.caption}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Impact (as columns) */}
                  {project.caseStudy.impact && Array.isArray(project.caseStudy.impact) && (
                    <section className="max-w-4xl mx-auto flex flex-col w-full">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {project.caseStudy.impact.map((item, idx) => (
                          <div key={idx}>
                            <div className="text-xl font-bold">{item.stat}</div>
                            <div className="text-sm text-zinc-500">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Credits */}
                  {project.caseStudy.credits && (
                    <section className="max-w-4xl mx-auto flex flex-col w-full">
                      <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">Credits</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">{project.caseStudy.credits.text}</p>
                      <div className="flex flex-wrap gap-8">
                        {project.caseStudy.credits.people && project.caseStudy.credits.people.map((person, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <img src={person.image} alt={person.name} className="w-4 h-4 rounded-full mb-2" />
                            <div className="font-medium">{person.name}</div>
                            <div className="text-xs text-zinc-500">{person.role}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
          <MorphingDialogClose className="text-zinc-500 dark:text-zinc-400" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
} 