export default useHistoryTracker;
declare function useHistoryTracker(props: any): {
    isReady: boolean;
    history: string[];
    forwardHistory: string[];
    currentUrl: string;
    firstUrl: string;
    clearHistory: () => void;
    goToHistory: (index: number) => void;
    goBack: () => Promise<{ 
        isReady: boolean;
        history: string[];
        forwardHistory: string[];
        currentUrl: string;
        firstUrl: string;
        canGoBack: boolean;
        canGoForward: boolean;
    }>;
    goForward: () => Promise<{ 
        isReady: boolean;
        history: string[];
        forwardHistory: string[];
        currentUrl: string;
        firstUrl: string;
        canGoBack: boolean;
        canGoForward: boolean;
    }>;
    canGoBack: () => boolean;
    canGoForward: () => boolean;
};
