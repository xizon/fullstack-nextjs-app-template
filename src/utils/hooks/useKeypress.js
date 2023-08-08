/**
 * Listens for changes in the pressed state of a given key
 * 
 * @usage:

const App = () => {
    const escPressed = useKeyPress('Escape');

    return (
        <div className="app">{escPressed ? 'Escape' : null}</div>
    );
};

 */
import { useEffect, useState } from "react";

const useKeyPress = (targetKey) => {
    const [keyPressed, setKeyPressed] = useState(false);

    // `Escape`, `Enter`, `Alt`, `Control`, `CapsLock`, `Shift`, `w`, `e`, ...
    const downHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed(true);
    };

    const upHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, []);

    return keyPressed;
};

export default useKeyPress;

