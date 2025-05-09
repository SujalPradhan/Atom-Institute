import { useState, useCallback } from 'react';

// Basic loading state interface
interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  hasError: boolean;
}

// For single data loading management
type LoadingStateResult<T> = LoadingState & {
  data: T | null;
  setData: (data: T) => void;
  startLoading: () => void;
  stopLoading: (error?: Error) => void;
  reset: () => void;
};

// For managing multiple named loading states
interface MultiLoadingState {
  [key: string]: boolean;
}

type MultiLoadingStateResult<T extends MultiLoadingState> = {
  loadingState: T;
  setLoadingItem: (key: keyof T, isLoading: boolean) => void;
  resetLoading: () => void;
  isLoading: boolean; // True if any item is loading
  errors: Record<keyof T, Error | null>;
  setError: (key: keyof T, error: Error | null) => void;
  hasErrors: boolean; // True if any item has an error
};

/**
 * A hook for managing loading states in components
 * @param initialData - Optional initial data
 * @returns An object containing loading state and methods to control it
 */
export function useLoadingState<T>(initialData: T | null): LoadingStateResult<T>;
export function useLoadingState<T>(initialData: null): LoadingStateResult<null>;

/**
 * A hook for managing multiple named loading states in components
 * @param initialStates - Initial loading state for multiple items
 * @returns An object containing methods to control multiple loading states
 */
export function useLoadingState<T extends MultiLoadingState>(initialStates: T): MultiLoadingStateResult<T>;

// Implementation
export function useLoadingState<T>(initialValue: T | null = null) {
  // Check if we're dealing with multiple loading states
  const isMultiState = initialValue !== null && typeof initialValue === 'object' && !Array.isArray(initialValue);
  
  if (isMultiState) {
    // Multiple named loading states
    const [loadingState, setLoadingState] = useState<any>(initialValue);
    const [errors, setErrors] = useState<Record<string, Error | null>>({});
    
    // Set loading state for a specific item
    const setLoadingItem = useCallback((key: string, isLoading: boolean) => {
      setLoadingState(prev => ({ ...prev, [key]: isLoading }));
    }, []);
    
    // Set error for a specific item
    const setError = useCallback((key: string, error: Error | null) => {
      setErrors(prev => ({ ...prev, [key]: error }));
    }, []);
    
    // Reset all loading states to initial values
    const resetLoading = useCallback(() => {
      setLoadingState(initialValue);
      setErrors({});
    }, [initialValue]);
    
    // Check if any item is in loading state
    const isLoading = Object.values(loadingState).some(state => state === true);
    
    // Check if any item has an error
    const hasErrors = Object.values(errors).some(error => error !== null);
    
    return {
      loadingState,
      setLoadingItem,
      resetLoading,
      isLoading,
      errors,
      setError,
      hasErrors
    };
  } else {
    // Single loading state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any>(initialValue);

    const startLoading = useCallback(() => {
      setIsLoading(true);
      setError(null);
    }, []);

    const stopLoading = useCallback((err?: Error) => {
      setIsLoading(false);
      if (err) setError(err);
    }, []);

    const reset = useCallback(() => {
      setIsLoading(false);
      setError(null);
      setData(initialValue);
    }, [initialValue]);

    return {
      isLoading,
      error,
      hasError: error !== null,
      data,
      setData,
      startLoading,
      stopLoading,
      reset
    };
  }
}

export default useLoadingState;