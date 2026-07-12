export type UrlFormat = 
    | {ok: false}
    | {ok: true, url: URL}

export function isValidUrl(url: string): UrlFormat {
    const parsed = URL.parse(url.trim());
    return parsed ? {ok:true, url: parsed} : {ok: false};
}