/**
 * Limiting the rate of execution
 * 
 * @usage:

const App = () => {
    const [count, setCount] = useState(0);
    const handleClick = useThrottle(() => setCount(count + 1), 500, [count]);

    return (
        <div className="app">
            <button onClick={handleClick}>click</button>
            <p>click {count} time</p>
        </div>
    );
};

 */
import { useRef, useCallback } from "react";

const useThrottle = (fn, delay, dependence) => {
    const ref = useRef({ lastTime: 0 });

    return useCallback((...args) => {
        const now = Date.now();

        if (now - ref.current.lastTime >= delay) {
            fn(...args);
            ref.current.lastTime = now;
        }
    }, dependence);
};


export default useThrottle;

