export function getCookies(cookieString: string) {
    const cookies = Object.fromEntries(cookieString.split("; ").map((cookie: any) => {
        const [key, value] = cookie.split("=");
        return [key, decodeURIComponent(value)];
    }));
    return cookies;
}