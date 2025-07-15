import { NextResponse } from 'next/server'

interface GitHubWorkflowRun {
  id: number
  name: string
  status: string
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
}

interface GitHubApiResponse {
  workflow_runs: GitHubWorkflowRun[]
  total_count: number
}

export async function GET() {
  try {
    // GitHub API endpoint for workflow runs
    const githubApiUrl = 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs'
    
    // Fetch workflow runs from GitHub API
    const response = await fetch(githubApiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'resume-cloudrun-app',
        // Note: For public repos, no auth token is needed for basic read operations
        // If you need higher rate limits, add: 'Authorization': `token ${process.env.GITHUB_TOKEN}`
      },
      // Cache for 5 minutes to avoid hitting rate limits
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      console.error('GitHub API error:', response.status, response.statusText)
      // Return fallback data if GitHub API fails
      return NextResponse.json({
        workflow_runs: getFallbackWorkflows(),
        total_count: 6,
        source: 'fallback'
      })
    }

    const data: GitHubApiResponse = await response.json()
    
    // Transform GitHub API response to match our interface
    const transformedRuns = data.workflow_runs.slice(0, 10).map(run => ({
      id: run.id,
      name: run.name,
      status: run.status,
      conclusion: run.conclusion,
      created_at: run.created_at,
      updated_at: run.updated_at,
      head_branch: run.head_branch,
      head_sha: run.head_sha.substring(0, 7), // Short SHA
      actor: {
        login: run.actor.login,
        avatar_url: run.actor.avatar_url
      },
      event: run.event,
      workflow_id: run.workflow_id,
      run_number: run.run_number,
      html_url: run.html_url,
      jobs_url: run.jobs_url,
      // Calculate duration if workflow is completed
      duration: run.conclusion ? calculateDuration(run.created_at, run.updated_at) : undefined
    }))

    return NextResponse.json({
      workflow_runs: transformedRuns,
      total_count: data.total_count,
      source: 'github'
    })

  } catch (error) {
    console.error('Error fetching workflow runs:', error)
    
    // Return fallback data on error
    return NextResponse.json({
      workflow_runs: getFallbackWorkflows(),
      total_count: 6,
      source: 'fallback'
    })
  }
}

function calculateDuration(createdAt: string, updatedAt: string): number {
  const created = new Date(createdAt).getTime()
  const updated = new Date(updatedAt).getTime()
  return Math.floor((updated - created) / 1000) // Duration in seconds
}

function getFallbackWorkflows() {
  // Fallback data in case GitHub API is unavailable
  return [
    {
      id: 16304136740,
      name: 'Production CI/CD Pipeline',
      status: 'completed',
      conclusion: 'success',
      created_at: '2025-07-15T19:30:00Z',
      updated_at: '2025-07-15T19:33:45Z',
      head_branch: 'main',
      head_sha: '2c3aa4b',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 25,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16304136740',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16304136740/jobs',
      duration: 225
    },
    {
      id: 16303892156,
      name: 'Production CI/CD Pipeline',
      status: 'completed',
      conclusion: 'success',
      created_at: '2025-07-15T18:45:00Z',
      updated_at: '2025-07-15T18:48:12Z',
      head_branch: 'main',
      head_sha: 'e9fbb70',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 24,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16303892156',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16303892156/jobs',
      duration: 192
    }
  ]
}
