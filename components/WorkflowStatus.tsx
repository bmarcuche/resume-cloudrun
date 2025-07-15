import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ArrowPathIcon,
  StopCircleIcon
} from '@heroicons/react/24/outline'

interface WorkflowStatusProps {
  status: 'success' | 'failure' | 'in_progress' | 'queued' | 'cancelled'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export const WorkflowStatusIcon = ({ status, size = 'md' }: { status: string, size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  const iconClass = sizeClasses[size]

  switch (status) {
    case 'success':
      return <CheckCircleIcon className={`${iconClass} text-green-500`} />
    case 'failure':
      return <XCircleIcon className={`${iconClass} text-red-500`} />
    case 'in_progress':
      return <ArrowPathIcon className={`${iconClass} text-blue-500 animate-spin`} />
    case 'queued':
      return <ClockIcon className={`${iconClass} text-yellow-500`} />
    case 'cancelled':
      return <StopCircleIcon className={`${iconClass} text-gray-500`} />
    default:
      return <ClockIcon className={`${iconClass} text-gray-400`} />
  }
}

export const WorkflowStatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 text-green-700 ring-green-600/20'
      case 'failure':
        return 'bg-red-50 text-red-700 ring-red-600/20'
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 ring-blue-600/20'
      case 'queued':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
      case 'cancelled':
        return 'bg-gray-50 text-gray-700 ring-gray-600/20'
      default:
        return 'bg-gray-50 text-gray-600 ring-gray-600/20'
    }
  }

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyles(status)}`}>
      {formatStatus(status)}
    </span>
  )
}

export default function WorkflowStatus({ status, size = 'md', showLabel = false }: WorkflowStatusProps) {
  return (
    <div className="flex items-center space-x-2">
      <WorkflowStatusIcon status={status} size={size} />
      {showLabel && <WorkflowStatusBadge status={status} />}
    </div>
  )
}
