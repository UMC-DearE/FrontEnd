import { useEffect, useState } from 'react';

function useDelayedLoading(isLoading: boolean, delay = 500) {
  const [showDelayedLoading, setShowDelayedLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) return;

    const timer = window.setTimeout(() => {
      setShowDelayedLoading(true);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isLoading, delay]);

  return isLoading && showDelayedLoading;
}
export default useDelayedLoading;
