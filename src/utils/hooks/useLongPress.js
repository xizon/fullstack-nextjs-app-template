/**
 * Long press event
 * 
 * @usage:


const App = () => {

    const onLongPress = () => {
        console.log('longpress is triggered');
    };

    const onClick = () => {
        console.log('click is triggered');
    }

    const onLeave = () => {
        console.log('mouse leave');
    }

    const onHover = () => {
        console.log('mouse hover');
    }

    const longPressEvent = useLongPress(onLongPress, onClick, onLeave, onHover, {
        shouldPreventDefault: true,
        delay: 500,
    });

    return (
        <div className="app"><button {...longPressEvent}>Press Here</button></div>
    );
}
*/

import { useCallback, useRef, useState } from "react";

const useLongPress = (
    onLongPress,
    onClick,
    onLeave,
    onHover,
    { shouldPreventDefault = true, delay = 300 } = {}
) => {
    const [longPressTriggered, setLongPressTriggered] = useState(false);
    const timeout = useRef();
    const target = useRef();

    const start = useCallback(
        event => {
            if (shouldPreventDefault && event.target) {
                event.target.addEventListener("touchend", preventDefault, {
                    passive: false
                });
                target.current = event.target;
            }
            timeout.current = setTimeout(() => {
                onLongPress(event);
                setLongPressTriggered(true);
            }, delay);
        },
        [onLongPress, delay, shouldPreventDefault]
    );

    const clear = useCallback(
        (event, shouldTriggerClick = true) => {
            timeout.current && clearTimeout(timeout.current);
            shouldTriggerClick && !longPressTriggered && onClick();
            setLongPressTriggered(false);
            if (shouldPreventDefault && target.current) {
                target.current.removeEventListener("touchend", preventDefault);
            }
            
        },
        [shouldPreventDefault, onClick, longPressTriggered]
    );

    return {
        onMouseDown: e => start(e),
        onTouchStart: e => {
            start(e);
            if (typeof onHover === 'function') onHover();
        },
        onMouseOver: e => {
            if (typeof onHover === 'function') onHover();
        },
        onMouseUp: e => clear(e),
        onMouseLeave: e => {
            clear(e, false);
            if (typeof onLeave === 'function') onLeave();
        },
        onTouchEnd: e => {
            clear(e);
            if (typeof onLeave === 'function') onLeave();
        }
    };
};

const isTouchEvent = event => {
    return "touches" in event;
};

const preventDefault = event => {
    if (!isTouchEvent(event)) return;

    if (event.touches.length < 2 && event.preventDefault) {
        event.preventDefault();
    }
};

export default useLongPress;