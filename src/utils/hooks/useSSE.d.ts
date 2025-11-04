export default useSSE;
export function useSSE(url: any, retryDelay?: number): {
    connected: boolean;
    messages: any[];
    disconnect: () => void;
    reconnect: () => void;
    resetMessages: () => void;
};
