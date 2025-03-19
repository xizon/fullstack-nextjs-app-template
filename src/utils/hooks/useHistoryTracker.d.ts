export default useHistoryTracker;
declare function useHistoryTracker(props: any): {
    history: any[];
    currentUrl: string;
    firstUrl: string;
    clearHistory: () => void;
    isReady: boolean;
};
