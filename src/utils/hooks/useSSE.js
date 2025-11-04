/**
 * SSE
 * 
 * @usage:
 *
 * const App = () => {
 *     const { connected, messages, disconnect, reconnect } = useSSE('http://localhost:3000/sse');
 *
 *     return (
 *     <div>
 *         <p>Status: {connected ? '✅ Connected' : '❌ Disconnected'}</p>
 *         <button onClick={disconnect}>Disconnect</button>
 *         <button onClick={reconnect}>Reconnect</button>
 *         {messages.map((m, i) => <div key={i}>{m}</div>)}
 *     </div>
 *     );
 * };
 */
import { useEffect, useRef, useState, useCallback } from 'react';

const useSSE = (url, retryDelay = 3000) => {
    const [connected, setConnected] = useState(false);
    const [messages, setMessages] = useState([]);

    const sourceRef = useRef(null);
    const reconnectTimerRef = useRef(null);
    const manuallyClosedRef = useRef(false);

    const internalCleanup = useCallback(() => {
        if (reconnectTimerRef.current) {
            clearTimeout(reconnectTimerRef.current);
            reconnectTimerRef.current = null;
        }
        if (sourceRef.current) {
            try {
                sourceRef.current.close();
            } catch (_) {}
            sourceRef.current = null;
        }
        setConnected(false);
    }, []);

    const connect = useCallback(() => {
        if (!url || manuallyClosedRef.current) return;

        // Prevent duplicate connections
        if (sourceRef.current) return;

        const source = new EventSource(url);
        sourceRef.current = source;

        source.onopen = () => {
            setConnected(true);
        };

        source.onmessage = (event) => {
            setMessages([event.data]);
        };

        source.onerror = (err) => {
            internalCleanup();
            if (!manuallyClosedRef.current) {
                reconnectTimerRef.current = setTimeout(() => {
                    connect();
                }, retryDelay);
            }
        };
    }, [internalCleanup, retryDelay, url]);

    const disconnect = useCallback(() => {
        manuallyClosedRef.current = true;
        internalCleanup();
    }, [internalCleanup]);

    const reconnect = useCallback(() => {
        manuallyClosedRef.current = false;
        internalCleanup();
        connect();
    }, [connect, internalCleanup]);

    const resetMessages = useCallback(() => setMessages([]), []);

    useEffect(() => {
        if (!url) return;
        manuallyClosedRef.current = false;
        connect();
        return () => {
            // Cleanup on unmount (does not mark manual close)
            internalCleanup();
        };
    }, [url, connect, internalCleanup]);

    return { connected, messages, disconnect, reconnect, resetMessages };
};

export default useSSE;
export { useSSE };

