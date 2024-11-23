import config from '@/config';

export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
    const response: Response = await fetch(`${config.baseUrl}/api/${path}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }
    return await response.json() as T;
}
