import { useEffect, useState } from 'react';

export function useJsonData<T>(path: string): T[] {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    fetch(path)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error loading JSON:', error));
  }, [path]);

  return data;
}
