import { useEffect, useState } from 'react';

export default function useObjectUrl(source?: File | string | null): string | null {
  const [url, setUrl] = useState<string | null>(typeof source === 'string' ? source : null);

  useEffect(() => {
    if (!(source instanceof File)) return;

    const reader = new FileReader();

    reader.onload = () => {
      setUrl(reader.result as string);
    };

    reader.readAsDataURL(source);

    return () => {
      if (reader.readyState === FileReader.LOADING) {
        reader.abort();
      }
    };
  }, [source]);

  if (!source) return null;

  if (typeof source === 'string') {
    return source;
  }

  return url;
}
