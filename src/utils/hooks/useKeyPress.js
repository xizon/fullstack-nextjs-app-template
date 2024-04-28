/**
 * Listens for changes in the pressed state of a given key
 * 
 * @usage:

const App = () => {
    const escPressed = useKeyPress({
        keyCode: 'Escape',
        handleUp: (key, event) => { },
        handleDown: async (key, event) => {
            // do something
            event.preventDefault();
            // await xxxxx();
            console.log(key);
        }
    });

    const multiplePressed = useKeyPress({
        keyCode: ['ArrowUp', 'ArrowDown', 'Enter', 'NumpadEnter'],
        handleUp: (key, event) => { },
        handleDown: (key, event) => {
            // do something
            event.preventDefault();
            console.log(key);
        }
    });


    return (
        <div className="app">{escPressed ? 'Escape' : null}</div>
    );
};

 */
import { useEffect, useState } from "react";

const useKeyPress = ({
    keyCode,
    handleDown,
    handleUp
}) => {
    const [keyPressed, setKeyPressed] = useState(false);
    const multipleKeys = Array.isArray(keyCode);

    // `Escape`, `Enter`, `Alt`, `Control`, `CapsLock`, `Shift`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` `w`, `e`, ...
    const eventHandlerDown = (event) => {
        const key = event.code;

        if (multipleKeys) {
            if ( keyCode.includes(key)) {
                setKeyPressed(true);
                if (typeof handleDown === 'function') handleDown(key, event);
            }
        } else {
            if (key === keyCode) {
                setKeyPressed(true);
                if (typeof handleDown === 'function') handleDown(key, event);
            }
        }

    };

    const eventHandlerUp = (event) => {
        const key = event.code;
        
        if (multipleKeys) {
            if ( keyCode.includes(key)) {
                setKeyPressed(false);
                if (typeof handleUp === 'function') handleUp(key, event);
            }  
        } else {
            if (key === keyCode) {
                setKeyPressed(false);
                if (typeof handleUp === 'function') handleUp(key, event);
            }  
        }


    };

    useEffect(() => {
        window.addEventListener('keydown', eventHandlerDown);
        window.addEventListener('keyup', eventHandlerUp);

        return () => {
            window.removeEventListener('keydown', eventHandlerDown);
            window.removeEventListener('keyup', eventHandlerUp);
        };
    }, []);

    return keyPressed;
};

export default useKeyPress;

