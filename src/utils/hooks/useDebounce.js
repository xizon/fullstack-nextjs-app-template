/**
 * Delay the execution of function or state update
 * 
 * @usage:

const App = () => {
    const [count, setCount] = useState(0);
    const handleClick = useDebounce(() => setCount(count + 1), 500, [count]);

    return (
        <div className="app">
            <button onClick={handleClick}>click</button>
            <p>click {count} time</p>
        </div>
    );
};

 */

import { useRef, useCallback } from "react";

const useDebounce = (fn, delay, dependence) => {
    const ref = useRef(null);

    return useCallback((...args) => {

        //Every time this returned function is called, the timer is cleared to ensure that fn is not executed
        clearTimeout(ref.current);
        ref.current = null;

        // When the returned function is called for the last time (that is the user stops a continuous operation)
        // Execute fn after another delay milliseconds
        ref.current = setTimeout(() => {
            fn(...args);
        }, delay);

    }, dependence);
};


export default useDebounce;

