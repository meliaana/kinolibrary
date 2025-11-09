import { useNavigate } from 'react-router-dom';

export function useApiFetch(): (
  url: string,
  options: RequestInit,
  suppressRedirect?: boolean,
) => Promise<Response> {
  const navigate = useNavigate();

  return async (
    url: string,
    options: RequestInit = {},
    suppressRedirect = false,
  ) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (response.status === 401) {
      if (!suppressRedirect) navigate('/login');
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || 'Request failed');
    }

    return response;
  };
}
