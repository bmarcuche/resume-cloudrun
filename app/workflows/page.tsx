'use client'

import { useState, useEffect } from 'react'
import {
  ArrowPathIcon,
  CalendarIcon,
  CodeBracketIcon,
  ChevronRightIcon,
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  InboxIcon,
} from '@heroicons/react/24/outline'
import { WorkflowStatusIcon, WorkflowStatusBadge } from '../../components/WorkflowStatus'
import SiteNav from '../../components/SiteNav'
import DeployPipeline from '../../components/DeployPipeline'

interface WorkflowRun {
  id: number
  name: string
  status: 'success' | 'failure' | 'in_progress' | 'queued' | 'cancelled'
  conclusion: string | null
  created_at: string
  updated_at: string
  head_branch: string
  head_sha: string
  actor: {
    login: string
    avatar_url: string
  }
  event: string
  workflow_id: number
  run_number: number
  html_url: string
  jobs_url: string
  duration?: number
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}m ${remainingSeconds}s`
}

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return `${diffInSeconds}s ago`
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  return `${Math.floor(diffInSeconds / 86400)}d ago`
}

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<WorkflowRun[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('all')

  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || 'resume-cloudrun'

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch('/api/workflows')
        const data = await response.json()
        const transformedWorkflows = data.workflow_runs.map(
          (run: { conclusion: string; status: string; [key: string]: unknown }) => ({
            ...run,
            status:
              run.conclusion === 'success'
                ? 'success'
                : run.conclusion === 'failure'
                ? 'failure'
                : run.status === 'in_progress'
                ? 'in_progress'
                : run.status === 'queued'
                ? 'queued'
                : 'cancelled',
          })
        )
        setWorkflows(transformedWorkflows)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching workflows:', error)
        setLoading(false)
      }
    }

    fetchWorkflows()
  }, [])

  const filteredWorkflows = workflows.filter(
    (workflow) => selectedWorkflow === 'all' || workflow.status === selectedWorkflow
  )

  const filters = [
    { key: 'all', label: 'All runs', count: workflows.length },
    { key: 'success', label: 'Success', count: workflows.filter((w) => w.status === 'success').length },
    { key: 'failure', label: 'Failure', count: workflows.filter((w) => w.status === 'failure').length },
    {
      key: 'in_progress',
      label: 'In progress',
      count: workflows.filter((w) => w.status === 'in_progress').length,
    },
  ]

  return (
    <main className="min-h-screen page-grid pb-24 md:pb-0">
      <SiteNav />

      <div className="container mx-auto px-4 py-10 pt-16 md:pt-10 max-w-6xl">
        {/* Page header */}
        <div className="mb-8">
          <p className="section-eyebrow">{'// CONTINUOUS DEPLOYMENT'}</p>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-2">
            <div>
              <h1 className="section-heading">Deployment Pipeline</h1>
              <p className="section-lede mt-2 max-w-2xl">
                Every push to <span className="run-mono text-accent-teal">main</span> ships this site to
                Cloud Run automatically. Live GitHub Actions runs below.
              </p>
            </div>
            <a
              href="https://github.com/bmarcuche/resume-cloudrun/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="button-download"
            >
              <CodeBracketIcon className="h-4 w-4" />
              <span>View on GitHub</span>
              <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Animated deploy pipeline */}
        <div className="mb-10">
          <DeployPipeline />
        </div>

        {/* Runs */}
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Filters */}
          <aside>
            <div className="workflow-card">
              <div className="workflow-card-head">
                <h3 className="text-sm font-semibold text-headline">Filter</h3>
              </div>
              <div className="p-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedWorkflow(filter.key)}
                    className={`filter-pill lg:w-full ${
                      selectedWorkflow === filter.key ? 'is-active' : ''
                    }`}
                  >
                    <span>{filter.label}</span>
                    <span className="filter-count">{filter.count}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Runs list */}
          <div className="workflow-card">
            <div className="workflow-card-head flex items-center justify-between">
              <h2 className="text-sm font-semibold text-headline">
                Recent runs <span className="text-body font-normal">({filteredWorkflows.length})</span>
              </h2>
              <span className="run-mono text-xs text-muted">{repoName}</span>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <ArrowPathIcon className="h-7 w-7 text-accent-teal animate-spin mx-auto mb-3" />
                <p className="text-body text-sm">Loading workflow runs...</p>
              </div>
            ) : filteredWorkflows.length === 0 ? (
              <div className="p-12 text-center">
                <InboxIcon className="h-10 w-10 text-muted mx-auto mb-3" />
                <h3 className="text-base font-medium text-headline mb-1">No runs found</h3>
                <p className="text-body text-sm">
                  {selectedWorkflow === 'all'
                    ? 'No workflow runs have been triggered yet.'
                    : `No ${selectedWorkflow.replace('_', ' ')} runs found.`}
                </p>
              </div>
            ) : (
              <div>
                {filteredWorkflows.map((workflow) => (
                  <div key={workflow.id} className="run-row">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <div className="mt-0.5">
                        <WorkflowStatusIcon status={workflow.status} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <h3 className="text-sm font-semibold text-headline truncate max-w-[12rem] sm:max-w-md">
                            {workflow.name}
                          </h3>
                          <WorkflowStatusBadge status={workflow.status} />
                        </div>
                        <div className="run-meta">
                          <span className="flex items-center gap-1">
                            <CodeBracketIcon className="h-3 w-3" />
                            <span className="run-mono">{workflow.head_branch}</span>
                          </span>
                          <span className="text-accent-teal run-mono font-medium">#{workflow.run_number}</span>
                          <span className="run-mono">{workflow.head_sha?.slice(0, 7)}</span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {formatRelativeTime(workflow.created_at)}
                          </span>
                          {workflow.duration ? (
                            <span className="flex items-center gap-1">
                              <ClockIcon className="h-3 w-3" />
                              {formatDuration(workflow.duration)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <a
                      href={workflow.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-download flex-shrink-0 text-xs"
                      aria-label={`View ${workflow.name} on GitHub`}
                    >
                      <span className="hidden sm:inline">Details</span>
                      <ChevronRightIcon className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer bg-accent-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2026 Bruno Marcuche. Built with Next.js and deployed on Google Cloud Platform.
          </p>
          <div className="mt-4 flex justify-center items-center gap-4">
            <a href="mailto:bmarcuche@gmail.com" className="text-gray-300 hover:text-accent-teal transition-colors">
              Contact
            </a>
            <a
              href="/resume/bruno_marcuche_resume.pdf"
              download="Bruno Marcuche SRE Resume.pdf"
              className="text-gray-300 hover:text-accent-teal transition-colors"
            >
              Download Resume
            </a>
            <a
              href="https://github.com/bmarcuche/resume-cloudrun"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-accent-teal transition-colors"
            >
              View Source Code
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
