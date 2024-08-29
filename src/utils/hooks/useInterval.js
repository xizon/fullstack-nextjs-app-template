/**
 * Provides a convenient way to create and manage intervals
 * 
 * @usage:

const App = () => {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);

    const { startTimer, stopTimer } = useInterval(() => {
        setCount(count + 1);
    }, 1000);

    const { startTimer: startTimerGetList, stopTimer: stopTimerGetList } = useInterval(() => {
        setList((prevState) => {
            return [...prevState, Math.random()]
        });
    }, 1000, false);

    const handleGetList = () => {
        startTimerGetList();
    };

    useEffect(() => {
        handleGetList();
    }, []);

    return (
        <div className="app">{count}{list.join(',')}</div>
    );
};

 */
import { useEffect, useRef, useCallback } from "react";

const useInterval = (fn, delay, enabled = true) => {
    const ref = useRef(null);
  
    const intervalIdRef = useRef(null);
    const startTimer = useCallback(() => {
        intervalIdRef.current = setInterval(() => {
            ref.current && ref.current();
        }, delay);
    }, [ref]);

    const stopTimer = useCallback(() => {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }, []);

    useEffect(() => {
        ref.current = fn;
    }, [fn]);

    useEffect(() => {
        if (enabled) {
            startTimer();
            return () => stopTimer();
        }
    }, [enabled]);

    return {
        startTimer,
        stopTimer
    };

};

export default useInterval;

