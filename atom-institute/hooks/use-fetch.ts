import { useEffect, useCallback } from 'react';
import { useLoadingState } from './use-loading-state';

type FetchFunction<T> = () => Promise<T>;

interface UseFetchOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

/**
 * A hook that combines loading state management with data fetching
 * @param fetchFn - The function that performs the data fetching
 * @param initialData - Optional initial data
 * @param options - Configuration options including callbacks
 * @returns An object containing loading state, data, and fetch control methods
 */
export function useFetch<T>(
  fetchFn: FetchFunction<T>,
  initialData: T | null = null,
  options: UseFetchOptions = { immediate: true }
) {
  const {
    data,
    isLoading,
    error,
    hasError,
    setData,
    startLoading,
    stopLoading,
    reset
  } = useLoadingState<T>(initialData);

  // Extract callback functions from options to avoid dependency issues
  const onSuccess = options.onSuccess;
  const onError = options.onError;
  const immediate = options.immediate;

  const fetchData = useCallback(async () => {
    try {
      startLoading();
      const result = await fetchFn();
      setData(result);
      
      // Call onSuccess callback if provided
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      stopLoading(error);
      
      // Call onError callback if provided
      if (onError && typeof onError === 'function') {
        onError(error);
      }
      
      return null;
    } finally {
      stopLoading();
    }
  }, [fetchFn, startLoading, setData, stopLoading, onSuccess, onError]);

  useEffect(() => {
    const shouldFetch = immediate !== false;
    if (shouldFetch) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    isLoading,
    error,
    hasError,
    fetchData,
    reset
  };
}

export default useFetch;