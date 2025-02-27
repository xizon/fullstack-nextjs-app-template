/**
 * Stream Controller
 * 
 * @usage:

// Use in component
const streamController = useStreamController({
    onChunk: async (chunk: string, index: number) => {
        // start (Execute it only once)
        if (index === 0) {
            
        }
        
        // Streaming data is JSON split by rows
        const lines = chunk.split("\n").filter(line => line.trim() !== "");

        // Process each data chunk
        console.log('Received chunk:', chunk);
    },
    onComplete: async (lastContent: string) => {
        // Process when stream is completed
        console.log('Stream completed');
        
        // Display AI reply
        console.log('AI reply:', lastContent);

    },
    onError: (error) => {
        // Error handling
        console.error('Stream error:', error);
    },
    onAbort: () => {
        // Abort processing
        console.log('Stream aborted');
    }
});

// Start stream
const response = await fetch(url);
await streamController.start(response);

// Pause stream
streamController.pause();

// Resume stream
streamController.resume();

// Abort stream
streamController.abort();

// Check status
const isActive = streamController.isActive();
const isPaused = streamController.isPaused();

 */
/**
 * Stream Controller Hook
 * 
 * @param {Object} options - Controller options
 * @param {Function} [options.onChunk] - Callback for each chunk (chunk, index) => void
 * @param {Function} [options.onComplete] - Callback when stream completes (lastContent) => void
 * @param {Function} [options.onError] - Callback for errors (error) => void
 * @param {Function} [options.onAbort] - Callback when stream is aborted () => void
 * @returns {Object} Stream controller methods
 */
export const useStreamController = (options = {}) => {
    const streamController = useRef(null);
    const reader = useRef(null);
    const activeStream = useRef(null);
    const responseReader = useRef(null);
    const paused = useRef(false);
    const active = useRef(false);
    const abortController = useRef(new AbortController());
    const textDecoder = useRef(new TextDecoder("utf-8")); // Get the decoding of UTF8

    // To avoid the "Uncaught (in promise) TypeError: Failed to execute 'cancel' on 'ReadableStream': Cannot cancel a locked stream" error, 
    // (1) you need to safely release the reader.
    // (2) cleanup() also requires asynchronous state
    const releaseReader = useCallback(async (readerRef) => {
        if (readerRef.current) {
            try {
                await readerRef.current.cancel();
            } catch (e) {
                console.warn('Error cancelling reader:', e);
            }
    
            try {
                readerRef.current.releaseLock();
            } catch (e) {
                console.warn('Error releasing reader lock:', e);
            }
            readerRef.current = null;
        }
    }, []);

    const cleanup = useCallback(async () => {
        // First release all readers
        await releaseReader(reader);
        await releaseReader(responseReader);
    
        // Then try to cancel the stream
        if (activeStream.current) {
            try {
                await activeStream.current.cancel();
            } catch (e) {
                console.warn('Error cancelling stream:', e);
            }
            activeStream.current = null;
        }
    
        streamController.current = null;
        active.current = false;
        paused.current = false;
    }, [releaseReader]);

    // Process chunks of data
    const processChunk = useCallback(async (chunk, index) => {
        try {
            options.onChunk?.(chunk, index);
        } catch (error) {
            options.onError?.(error);
        }
    }, [options]);

    // Start processing the stream
    const startProcessing = useCallback(async () => {
        if (!reader.current || !active.current) return;

        let counter = 0;
        let lastContent = '';

        while (active.current) {
            try {
                if (paused.current) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    continue;
                }

                const { done, value } = await reader.current.read();

                if (done) {
                    options.onComplete?.(lastContent);
                    await cleanup();
                    break;
                }

                // Decode the content
                const chunkStr = textDecoder.current.decode(value, { stream: true });
                lastContent += chunkStr;

                await processChunk(chunkStr, counter);
                counter++;

            } catch (error) {
                if (error.name === 'AbortError') {
                    options.onAbort?.();
                } else {
                    options.onError?.(error);
                }
                await cleanup();
                break;
            }
        }
    }, [options, cleanup, processChunk]);

    // Start streaming
    const start = useCallback(async (response) => {
        await cleanup();
  
        // Get Reader
        reader.current = response.body.getReader();

        try {
            const stream = new ReadableStream({
                start(controller) {
                    streamController.current = controller;
                },
                async pull(controller) {
                    try {
                        const { done, value } = await reader.current.read();
                        
                        if (done) {
                            controller.close();
                            return;
                        }

                        // Decode the content
                        const chunkStr = textDecoder.current.decode(value, { stream: true });

                        controller.enqueue(chunkStr);
                    } catch (error) {
                        controller.error(error);
                    }
                },
                cancel() {
                    response.body?.cancel();
                }
            });

            activeStream.current = stream;
            active.current = true;
            paused.current = false;

            // Start processing immediately
            await startProcessing();
        } catch (error) {
            options.onError?.(error);
            cleanup();
        }
    }, [options, cleanup, startProcessing]);

    // Pause streaming
    const pause = useCallback(() => {
        paused.current = true;
    }, []);

    // Resume streaming
    const resume = useCallback(() => {
        paused.current = false;
    }, []);

    // Abort streaming
    const abort = useCallback(async () => {
        abortController.current.abort();
        await cleanup();
    }, [cleanup]);

    // Check if stream is active
    const isActive = useCallback(() => {
        return active.current;
    }, []);

    // Check if stream is paused
    const isPaused = useCallback(() => {
        return paused.current;
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanup().catch(console.error);
        };
    }, [cleanup]);

    return {
        start,
        pause,
        resume,
        abort,
        isActive,
        isPaused
    };
};

export default useStreamController;