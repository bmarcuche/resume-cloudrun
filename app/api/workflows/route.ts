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
  head_commit?: {
    message: string
    author: {
      name: string
      email: string
    }
  }
}

interface GitHubCommit {
  sha: string
  commit: {
    message: string
    author: {
      name: string
      email: string
    }
  }
}

interface GitHubApiResponse {
  workflow_runs: GitHubWorkflowRun[]
  total_count: number
}

async function fetchCommitMessage(sha: string): Promise<string> {
  try {
    const commitUrl = `https://api.github.com/repos/bmarcuche/resume-cloudrun/commits/${sha}`
    const response = await fetch(commitUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'resume-cloudrun-app',
      },
      next: { revalidate: 300 }
    })

    if (!response.ok) {
      console.warn(`Failed to fetch commit ${sha}:`, response.status)
      return 'Production CI/CD Pipeline' // Fallback to workflow name
    }

    const commit: GitHubCommit = await response.json()
    // Return first line of commit message (title)
    return commit.commit.message.split('\n')[0] || 'Production CI/CD Pipeline'
  } catch (error) {
    console.warn(`Error fetching commit message for ${sha}:`, error)
    return 'Production CI/CD Pipeline'
  }
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
    
    // Transform GitHub API response and fetch commit messages
    const transformedRuns = await Promise.all(
      data.workflow_runs.slice(0, 10).map(async (run) => {
        const commitMessage = await fetchCommitMessage(run.head_sha)
        
        return {
          id: run.id,
          name: commitMessage, // Use commit message instead of workflow name
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
          duration: run.conclusion ? calculateDuration(run.created_at, run.updated_at) : undefined,
          workflow_name: run.name // Keep original workflow name for reference
        }
      })
    )

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
  // Fallback data with realistic commit messages
  return [
    {
      id: 16304136740,
      name: 'Fix workflow page banner text visibility in dark mode',
      status: 'completed',
      conclusion: 'success',
      created_at: '2025-07-16T17:00:00Z',
      updated_at: '2025-07-16T17:03:45Z',
      head_branch: 'main',
      head_sha: '3c900ef',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 27,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16304136740',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16304136740/jobs',
      duration: 225,
      workflow_name: 'Production CI/CD Pipeline'
    },
    {
      id: 16303892156,
      name: 'Fix workflow page dark mode visibility and hover states',
      status: 'completed',
      conclusion: 'success',
      created_at: '2025-07-16T16:30:00Z',
      updated_at: '2025-07-16T16:33:12Z',
      head_branch: 'main',
      head_sha: '95e352a',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 26,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16303892156',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16303892156/jobs',
      duration: 192,
      workflow_name: 'Production CI/CD Pipeline'
    },
    {
      id: 16303654321,
      name: 'Fix dark mode text visibility and spacing issues',
      status: 'completed',
      conclusion: 'success',
      created_at: '2025-07-16T15:45:00Z',
      updated_at: '2025-07-16T15:48:30Z',
      head_branch: 'main',
      head_sha: 'be441e4',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 25,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16303654321',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16303654321/jobs',
      duration: 210,
      workflow_name: 'Production CI/CD Pipeline'
    },
    {
      id: 16303421098,
      name: 'Add workflow status components and API integration',
      status: 'completed',
      conclusion: 'success',
      created_at: '2025-07-15T20:15:00Z',
      updated_at: '2025-07-15T20:18:45Z',
      head_branch: 'main',
      head_sha: '2c12c7d',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 24,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16303421098',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16303421098/jobs',
      duration: 165,
      workflow_name: 'Production CI/CD Pipeline'
    },
    {
      id: 16303187654,
      name: 'Implement theme toggle and dark mode support',
      status: 'completed',
      conclusion: 'failure',
      created_at: '2025-07-15T19:00:00Z',
      updated_at: '2025-07-15T19:02:20Z',
      head_branch: 'main',
      head_sha: 'a1b2c3d',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 23,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16303187654',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16303187654/jobs',
      duration: 140,
      workflow_name: 'Production CI/CD Pipeline'
    },
    {
      id: 16302954321,
      name: 'Add PDF viewer component and resume integration',
      status: 'completed',
      conclusion: 'success',
      created_at: '2025-07-15T18:30:00Z',
      updated_at: '2025-07-15T18:33:15Z',
      head_branch: 'main',
      head_sha: 'f4e5d6c',
      actor: {
        login: 'bmarcuche',
        avatar_url: 'https://github.com/bmarcuche.png'
      },
      event: 'push',
      workflow_id: 1,
      run_number: 22,
      html_url: 'https://github.com/bmarcuche/resume-cloudrun/actions/runs/16302954321',
      jobs_url: 'https://api.github.com/repos/bmarcuche/resume-cloudrun/actions/runs/16302954321/jobs',
      duration: 195,
      workflow_name: 'Production CI/CD Pipeline'
    }
  ]
}
