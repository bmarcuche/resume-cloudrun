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
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { WorkflowStatusIcon, WorkflowStatusBadge } from '../../components/WorkflowStatus'

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-8 w-8 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading workflow runs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a 
                  href="/"
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-1" />
                  Back to Resume
                </a>
                <div className="border-l border-gray-300 pl-4">
                  <h1 className="text-2xl font-bold text-gray-900">CI/CD Workflows</h1>
                  <p className="text-gray-600 mt-1">Recent GitHub Actions workflow runs showcase</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href="https://github.com/bmarcuche/resume-cloudrun/actions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h3 className="text-sm font-medium text-gray-900">Filter workflow runs</h3>
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
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{filter.label}</span>
                      <span className="text-xs text-gray-500">{filter.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Workflow runs ({filteredWorkflows.length})
                  </h2>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredWorkflows.map((workflow) => (
                  <div key={workflow.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-transparent hover:border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <WorkflowStatusIcon status={workflow.status} />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {workflow.name}
                            </h3>
                            <WorkflowStatusBadge status={workflow.status} />
                          </div>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <CodeBracketIcon className="h-3 w-3" />
                              <span className="font-mono">{workflow.head_branch}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-blue-600 font-medium">#{workflow.run_number}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="font-mono text-gray-600">{workflow.head_sha}</span>
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
                      
                      <div className="flex items-center space-x-2">
                        <a
                          href={workflow.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                        >
                          View details
                          <ChevronRightIcon className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredWorkflows.length === 0 && (
                <div className="p-8 text-center">
                  <PlayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No workflow runs found</h3>
                  <p className="text-gray-600">
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
    </div>
  )
}
