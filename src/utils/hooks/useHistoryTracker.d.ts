export default useHistoryTracker;
export type HistoryTrackerChange = {
    isReady: boolean;
    history: string[];
    forwardHistory: string[];
    currentUrl: string;
    firstUrl: string;
    canGoBack: boolean;
    canGoForward: boolean;
};
export type UseHistoryTrackerProps = {
    onChange?: (data: HistoryTrackerChange) => void;
};
export type UseHistoryTrackerReturn = {
    getReady: () => boolean;
    getHistory: () => string[];
    getForwardHistory: () => string[];
    getCurrentUrl: () => string;
    getFirstUrl: () => string;
    clearHistory: () => Promise<HistoryTrackerChange>;
    goToHistory: (index: number) => void;
    goBack: () => Promise<HistoryTrackerChange>;
    goForward: () => Promise<HistoryTrackerChange>;
    canGoBack: () => boolean;
    canGoForward: () => boolean;
    addHistoryToFirst: (url: string) => Promise<HistoryTrackerChange>;
};
/**
 * @param {UseHistoryTrackerProps} props
 * @returns {UseHistoryTrackerReturn}
 */
declare function useHistoryTracker(props: UseHistoryTrackerProps): UseHistoryTrackerReturn;
