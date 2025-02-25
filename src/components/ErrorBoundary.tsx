import React, { Component, ErrorInfo } from 'react';
import { GlassCard } from './ui/GlassCard';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black grid-pattern flex items-center justify-center p-4">
          <GlassCard className="max-w-md w-full p-8 text-center">
            <AlertTriangle size={48} className="mx-auto mb-4 text-red-400" />
            <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
            <p className="text-white/60 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="glass-effect px-6 py-2 rounded-lg text-white hover:bg-white/10"
            >
              Reload Page
            </button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}