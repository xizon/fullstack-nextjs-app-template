export function useSSE(url: any, retryDelay?: number): {
    connected: boolean;
    messages: any[];
};
