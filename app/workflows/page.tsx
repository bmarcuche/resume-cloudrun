'use client'

import { useState, useEffect } from 'react'
import { 
  PlayIcon,
  ArrowPathIcon,
  CalendarIcon,
  UserIcon,
  CodeBracketIcon,
  ChevronRightIcon,
  ClockIcon,
  ArrowLeftIcon,
  ArrowLongRightIcon,
  RocketLaunchIcon,
  ArrowUpTrayIcon,
  CloudIcon,
  GlobeAltIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'
import { WorkflowStatusIcon, WorkflowStatusBadge } from '../../components/WorkflowStatus'
import ThemeToggle from '../../components/ThemeToggle'

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

  const repoName = process.env.NEXT_PUBLIC_REPO_NAME || 'this repository'

  // Fetch actual workflow runs from GitHub API
  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        const response = await fetch('/api/workflows')
        const data = await response.json()
        
        // Transform status to match our component expectations
        const transformedWorkflows = data.workflow_runs.map((run: any) => ({
          ...run,
          status: run.conclusion === 'success' ? 'success' : 
                  run.conclusion === 'failure' ? 'failure' :
                  run.status === 'in_progress' ? 'in_progress' :
                  run.status === 'queued' ? 'queued' : 'cancelled'
        }))
        
        setWorkflows(transformedWorkflows)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching workflows:', error)
        setLoading(false)
      }
    }

    fetchWorkflows()
  }, [])

  const filteredWorkflows = workflows.filter(workflow => 
    selectedWorkflow === 'all' || workflow.status === selectedWorkflow
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-8 w-8 text-accent-teal animate-spin mx-auto mb-4" />
          <p className="text-body">Loading workflow runs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary">
      <ThemeToggle />
      
      {/* Header */}
      <div className="workflow-header gradient-bg text-white border-b border-secondary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  className="nav-link contact-info inline-flex items-center text-sm hover:text-accent-teal transition-colors text-white"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Back to Resume
                </a>
                <div className="border-l border-secondary-bg pl-4">
                  <h1 className="text-2xl font-bold text-white">GitHub Action Workflows</h1>
                  <p className="text-white mt-1">Recent GitHub Actions workflow runs showcase</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/bmarcuche/resume-cloudrun/actions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="workflow-details-btn button-teal inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium transition-colors"
                >
                  View on GitHub
                  <ChevronRightIcon className="h-4 w-4 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Deployment Flow Section - appears first on mobile, before sidebar */}
        <div className="mb-8 lg:hidden">
          <div className="card-white rounded-lg shadow">
            <div className="p-4 border-b border-secondary-bg">
              <h2 className="text-lg font-medium text-headline">How this site is deployed</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="deployment-step flex flex-col items-center">
                  <CodeBracketIcon className="h-6 w-6 text-accent-teal" />
                  <span className="mt-1 text-sm">Git Commit</span>
                </div>
                <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                <div className="deployment-step flex flex-col items-center">
                  <PlayCircleIcon className="h-6 w-6 text-accent-teal" />
                  <span className="mt-1 text-sm">GitHub Actions</span>
                </div>
                <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                <div className="deployment-step flex flex-col items-center">
                  <RocketLaunchIcon className="h-6 w-6 text-accent-teal" />
                  <span className="mt-1 text-sm">Build &amp; Test</span>
                </div>
                <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                <div className="deployment-step flex flex-col items-center">
                  <ArrowUpTrayIcon className="h-6 w-6 text-accent-teal" />
                  <span className="mt-1 text-sm">Push Image</span>
                </div>
                <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                <div className="deployment-step flex flex-col items-center">
                  <CloudIcon className="h-6 w-6 text-accent-teal" />
                  <span className="mt-1 text-sm">Cloud Run</span>
                </div>
                <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                <div className="deployment-step flex flex-col items-center">
                  <GlobeAltIcon className="h-6 w-6 text-accent-teal" />
                  <span className="mt-1 text-sm">resume.mindtunnel.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card-white rounded-lg shadow">
              <div className="p-4 border-b border-secondary-bg">
                <h3 className="text-lg font-medium text-headline">Filter workflow runs</h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { key: 'all', label: 'All workflows', count: workflows.length },
                  { key: 'success', label: 'Success', count: workflows.filter(w => w.status === 'success').length },
                  { key: 'failure', label: 'Failure', count: workflows.filter(w => w.status === 'failure').length },
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedWorkflow(filter.key)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedWorkflow === filter.key
                        ? 'bg-secondary text-accent-teal font-medium'
                        : 'text-accent-dark hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{filter.label}</span>
                      <span className="text-xs text-body">{filter.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">

            {/* Deployment Flow Section for desktop */}
            <div className="hidden lg:block mb-8">
              <div className="card-white rounded-lg shadow">
                <div className="p-4 border-b border-secondary-bg">
                  <h2 className="text-lg font-medium text-headline">How this site is deployed</h2>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <div className="deployment-step flex flex-col items-center">
                      <CodeBracketIcon className="h-6 w-6 text-accent-teal" />
                      <span className="mt-1 text-sm">Git Commit</span>
                    </div>
                    <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                    <div className="deployment-step flex flex-col items-center">
                      <PlayCircleIcon className="h-6 w-6 text-accent-teal" />
                      <span className="mt-1 text-sm">GitHub Actions</span>
                    </div>
                    <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                    <div className="deployment-step flex flex-col items-center">
                      <RocketLaunchIcon className="h-6 w-6 text-accent-teal" />
                      <span className="mt-1 text-sm">Build &amp; Test</span>
                    </div>
                    <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                    <div className="deployment-step flex flex-col items-center">
                      <ArrowUpTrayIcon className="h-6 w-6 text-accent-teal" />
                      <span className="mt-1 text-sm">Push Image</span>
                    </div>
                    <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                    <div className="deployment-step flex flex-col items-center">
                      <CloudIcon className="h-6 w-6 text-accent-teal" />
                      <span className="mt-1 text-sm">Cloud Run</span>
                    </div>
                    <ArrowLongRightIcon className="deployment-arrow h-6 w-6 text-accent-dark" />
                    <div className="deployment-step flex flex-col items-center">
                      <GlobeAltIcon className="h-6 w-6 text-accent-teal" />
                      <span className="mt-1 text-sm">resume.mindtunnel.org</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-white rounded-lg shadow">
              <div className="p-4 border-b border-secondary-bg">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-headline">
                    Recent Commits on {repoName} ({filteredWorkflows.length})
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-secondary-bg">
                {filteredWorkflows.map((workflow) => (
                  <div key={workflow.id} className="workflow-row p-4 transition-colors cursor-pointer border-l-4 border-transparent hover:border-accent-teal">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <WorkflowStatusIcon status={workflow.status} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-sm font-semibold text-headline truncate max-w-[10rem] sm:max-w-none">
                              {workflow.name}
                            </h3>
                            <WorkflowStatusBadge status={workflow.status} />
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-body">
                            <div className="flex items-center space-x-1">
                              <CodeBracketIcon className="h-3 w-3" />
                              <span className="font-mono">{workflow.head_branch}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-accent-teal font-medium">#{workflow.run_number}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-mono text-accent-dark">{workflow.head_sha}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <img 
                                src={workflow.actor.avatar_url} 
                                alt={workflow.actor.login}
                                className="h-4 w-4 rounded-full"
                              />
                              <span>{workflow.actor.login}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarIcon className="h-3 w-3" />
                              <span>{formatRelativeTime(workflow.created_at)}</span>
                            </div>
                            {workflow.duration && (
                              <div className="flex items-center space-x-1">
                                <ClockIcon className="h-3 w-3" />
                                <span>{formatDuration(workflow.duration)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 min-w-0 flex-shrink-0">
                        <a
                          href={workflow.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="workflow-details-btn button-teal inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-medium transition-colors w-28"
                        >
                          <span className="truncate">View details</span>
                          <ChevronRightIcon className="h-3 w-3 ml-1 flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredWorkflows.length === 0 && (
                <div className="p-8 text-center">
                  <PlayIcon className="h-12 w-12 text-body mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-headline mb-2">No workflow runs found</h3>
                  <p className="text-body">
                    {selectedWorkflow === 'all' 
                      ? 'No workflow runs have been triggered yet.'
                      : `No ${selectedWorkflow} workflow runs found.`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-accent-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            © 2025 Bruno Marcuche. Built with Next.js and deployed on Google Cloud Platform.
          </p>
          <div className="mt-4 space-x-4">
            <a
              href="mailto:bruno.marcuche@gmail.com"
              className="text-gray-300 hover:text-accent-teal transition-colors"
            >
              Contact
            </a>
            <a
              href="/resume/bruno_marcuche_resume.pdf"
              download
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
    </div>
  )
}
