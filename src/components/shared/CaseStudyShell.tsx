import type { ReactNode } from 'react'

interface CaseStudyShellProps {
  kind: 'work' | 'research'
  layout?: 'standard' | 'editorial'
  children: ReactNode
}

export function CaseStudyShell({ kind, layout = 'standard', children }: CaseStudyShellProps) {
  return (
    <div className={`case-study-shell case-study-shell--${kind} case-study-shell--${layout}`}>
      {children}
    </div>
  )
}
