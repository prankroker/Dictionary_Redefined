export interface MessageRequest {
    action: 'FETCH_DEFINITION';
    payload: { word: string },
}

export interface MessageResponse {
    success: boolean;
    data?: any;
    error?: string;
}

export async function requestDefinition(word: string) {
    const request: MessageRequest = {
        action: 'FETCH_DEFINITION',
        payload: { word },
    };

    const response: MessageResponse = await browser.runtime.sendMessage(request);
    if(!response.success) throw new Error(response.error || 'Failed to fetch definition')

    return response.data;
}