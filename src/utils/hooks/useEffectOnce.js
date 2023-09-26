/**
 * Solve the problem of repeated rendering twice in React.StrictMode mode
 * 
 * @usage:

const App = () => {
    useEffectOnce( ()=> {
        console.log('my effect is running');
        
        return () => console.log('my effect is destroying');
    });

    return (
        <div className="app">
            ...
        </div>
    );
};

 */

import { useEffect, useRef } from "react";

const useEffectOnce = (effect) => {

    const destroyFunc = useRef();
    const calledOnce = useRef(false);
    const renderAfterCalled = useRef(false);

    if (calledOnce.current) {
        renderAfterCalled.current = true;
    }

    useEffect( () => {
        if (calledOnce.current) { 
            return; 
        }

        calledOnce.current = true;
        destroyFunc.current = effect();

        return ()=> {
            if (!renderAfterCalled.current) {
                return;
            }

            if (destroyFunc.current) {
                destroyFunc.current();
            }
        };
    }, []);
};



export default useEffectOnce;

