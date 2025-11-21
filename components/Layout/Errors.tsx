// components/layout/ErrorBoundary.tsx
'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { TriangleAlert } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Optional custom fallback UI
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * @description A class component that catches JavaScript errors anywhere in its child component tree, 
 * logs those errors, and displays a fallback UI instead of crashing the entire app. 
 * Essential for Lighthouse compliance and application stability.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to an external service (e.g., Sentry, LogRocket)
    console.error("Uncaught error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 1. If a custom fallback was provided, render that.
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 2. Otherwise, render a default error message.
      return (
        <div className="flex flex-col items-center justify-center p-6 m-1.5 rounded-lg border border-red-600/50 bg-red-950/30 text-red-400 h-32">
          <TriangleAlert size={20} className="mb-2" />
          <h2 className="text-sm font-bold">Data Rendering Failed</h2>
          <p className="text-xs text-red-500">
            A critical error occurred. Please refresh or check logs.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}