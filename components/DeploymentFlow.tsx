import { 
  ArrowLongRightIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ArrowUpTrayIcon,
  CloudIcon,
  GlobeAltIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'

export default function DeploymentFlow() {
  return (
    <div className="deployment-flow mb-4 text-left">
      <h3 className="text-2xl font-bold text-headline mb-6">How This Site Is Deployed via CI/CD</h3>
      <div className="flex flex-wrap items-center justify-start gap-4">
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
  )
}
