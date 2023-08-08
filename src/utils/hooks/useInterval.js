/**
 * Provides a convenient way to create and manage intervals
 * 
 * @usage:

const App = () => {
    const [count, setCount] = useState(0);

    useInterval(() => {
        setCount(count + 1);
    }, 1000);

    return (
        <div className="app"></div>
    );
};

 */
import { useEffect, useRef } from "react";

const useInterval = (fn, delay) => {
    const ref = useRef(null);

    useEffect(() => {
        ref.current = fn;
    }, [fn]);

    useEffect(() => {
        function tick() {
            ref.current && ref.current();
        }
        
        if (delay !== null && delay > 0) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        } else {
            tick();
        }
    }, [delay]);
};

export default useInterval;

