import React, { type ReactNode } from 'react'

export interface SvgaErrorBoundaryProps {
	children: ReactNode
	fallback: ReactNode
	onError?: (error: Error) => void
}

interface State {
	hasError: boolean
	error: Error | null
}

export class SvgaErrorBoundary extends React.Component<
	SvgaErrorBoundaryProps,
	State
> {
	state: State = { hasError: false, error: null }

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error }
	}

	componentDidCatch(error: Error): void {
		this.props.onError?.(error)
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback
		}
		return this.props.children
	}
}
