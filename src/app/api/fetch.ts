import config from '@/config';
import { ApiRoutes, ApiRoutesType } from '@/types/Api';

export async function fetchJson<T>(
    path: string,
    options?: RequestInit
): Promise<T> {
    const response: Response = await fetch(
        `${config.baseUrl}/api/${path}`,
        options
    );

    if (!response.ok) {
        throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
        );
    }
    return (await response.json()) as T;
}

export async function fetchApi<T extends keyof ApiRoutesType>(
    type: T,
    options?: 'params' extends keyof ApiRoutesType[T]
        ? { params: ApiRoutesType[T]['params'] }
        : undefined
): Promise<ApiRoutesType[T]['response']> {
    const route = ApiRoutes[type].path;

    const url = options?.params
        ? replacePathParams(route, options.params)
        : route;

    return fetchJson(url);
}


function replacePathParams(path: string, params: Record<string, string | number>): string {
    return path.replace(/{(\w+)}/g, (_, key) => {
        if (!(key in params)) {
            throw new Error(`Missing parameter: ${key}`);
        }
        return encodeURIComponent(params[key]);
    });
}