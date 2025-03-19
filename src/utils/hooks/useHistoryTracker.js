/**
 * History Tracker
 * 
 * @usage:

const App = () => {
    const { 
        history, 
        currentUrl, 
        firstUrl, 
        clearHistory, 
        isReady 
    } = useHistoryTracker({
        onChange: ({ history, currentUrl, firstUrl }) => {
            console.log('--> URL changed:', {
                firstUrl,
                history,
                currentUrl
            });
        }
    });

    const updateHistory = (data: any) => {
        const history = data.history;

        if (
            data.firstUrl && 
            history.length >= 2 
        ) {
            const firstRecord = history[0];
            const secondRecord = history[1];

            const hasContainRelation =
                firstRecord.includes(secondRecord) || secondRecord.includes(firstRecord);

            if (!hasContainRelation) {
                history.shift();
                data.firstUrl = history[0] || '';
            }
        }

        return data;
    };

    const lastHistoryHasRelation = (data: any) => {
        const { history } = data;
        if (history.length < 2) return false; 

        const lastRecord = history[history.length - 1];
        const otherRecords = history.slice(0, -1);

        // Check whether lastRecord is related to any otherRecord
        const hasRelation = otherRecords.some(record =>
            record.includes(lastRecord) || lastRecord.includes(record)
        );

        return hasRelation;
    };

    return (
        <div>
            <h2>History Tracker</h2>
            
            <div>
                <h3>First URL:</h3>
                <p>{firstUrl}</p>
            </div>

            <div>
                <h3>Current URL:</h3>
                <p>{currentUrl}</p>
            </div>

            <div>
                <h3>History ({history.length}):</h3>
                <ul>
                    {history.map((url, index) => (
                        <li key={index}>{url}</li>
                    ))}
                </ul>
            </div>

            <button onClick={clearHistory}>
                Clear History
            </button>

            <button onClick={() => {
                window.history.go(-1);

                setTimeout(() => {
                    const _c = updateHistory({
                        firstUrl,
                        history,
                        currentUrl
                    });
    
                    if (!lastHistoryHasRelation({
                        firstUrl,
                        history,
                        currentUrl
                    }) || firstUrl === currentUrl) {
                        
                        clearHistory();
                        
                        // do something...
                        // ...
                        
                    }

                }, 0); 
            }}>
                Back
            </button>

        </div>
    );
};

 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// Create a secure version of useLayoutEffect that is downgraded to useEffect when SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const useHistoryTracker = (props) => {
    const {
        onChange
    } = props;

    const [isReady, setIsReady] = useState(false);
    const historyRef = useRef([]);
    const firstUrlRef = useRef('');
    const [currentUrl, setCurrentUrl] = useState('');
    
    const initialize = useCallback(() => {
        if (typeof window === 'undefined') return;
        
        const currentLocation = window.location.href;
        
        // If the history is empty, set the first record
        if (historyRef.current.length === 0) {
            firstUrlRef.current = currentLocation;
            historyRef.current = [currentLocation];
            setCurrentUrl(currentLocation);
        }
        
        setIsReady(true);
    }, []);

    useIsomorphicLayoutEffect(() => {
        initialize();
    }, [initialize]);

    const handleUrlChange = useCallback(() => {
        if (typeof window === 'undefined') return;

        const newUrl = window.location.href;
        
        // If the history is empty, set to the first URL
        if (historyRef.current.length === 0) {
            firstUrlRef.current = newUrl;
        }
        
        // Avoid recording the same URL
        if (historyRef.current[historyRef.current.length - 1] !== newUrl) {
            historyRef.current.push(newUrl);
            setCurrentUrl(newUrl);
            
            onChange?.({
                history: [...historyRef.current],
                currentUrl: newUrl,
                firstUrl: firstUrlRef.current || newUrl // Make sure there is always a value
            });
        }
    }, [onChange]); // only "onChange"


    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Listen for popstate events (browser forward/back)
        window.addEventListener('popstate', handleUrlChange);
        
        // Listen for hashchange events
        window.addEventListener('hashchange', handleUrlChange);

        // Create a MutationObserver to listen for URL changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' || mutation.type === 'attributes') {
                    handleUrlChange();
                }
            });
        });

    
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['href']
        });

        return () => {
            window.removeEventListener('popstate', handleUrlChange);
            window.removeEventListener('hashchange', handleUrlChange);
            observer.disconnect();
        };
    }, [handleUrlChange]);

    const clearHistory = useCallback(() => {
        if (typeof window === 'undefined') return;
    
        historyRef.current = [];
        firstUrlRef.current = '';
        setCurrentUrl('');
        
        onChange?.({
            history: [],
            currentUrl: '',
            firstUrl: ''
        });
    }, [onChange]); // only "onChange"

    return {
        history: historyRef.current,
        currentUrl,
        firstUrl: firstUrlRef.current,
        clearHistory,
        isReady
    };
};

export default useHistoryTracker;