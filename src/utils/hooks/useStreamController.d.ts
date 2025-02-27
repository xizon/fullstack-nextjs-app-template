export function useStreamController(options?: {
    onChunk?: Function;
    onComplete?: Function;
    onError?: Function;
    onAbort?: Function;
}): any;
export default useStreamController;
