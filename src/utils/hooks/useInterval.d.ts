export default useInterval;
declare function useInterval(fn: any, delay: any, enabled?: boolean): {
    startTimer: () => void;
    stopTimer: () => void;
};
