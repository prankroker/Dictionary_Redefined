export async function fetchWord<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok && response.status !== 404) {
        throw new Error("Unexpected error during fetch");
    }
    return response.json();
}