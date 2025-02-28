import React, { ErrorInfo } from "react";

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Enhanced ErrorBoundary caught an error:", error, errorInfo);
    // Report error to an external service like Sentry
    if ((window as any).Sentry) {
      (window as any).Sentry.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div role="alert" className="p-4 bg-gray-800 text-white">
            Oops! We encountered a problem loading the video. Please refresh the
            page.
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
