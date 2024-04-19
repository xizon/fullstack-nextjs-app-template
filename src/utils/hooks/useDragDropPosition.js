/**
 * Drag Drop Object
 * 
 * @usage:

import { useState, useCallback } from 'react';
import { useDragDropPosition } from '@/utils/hooks/useDragDropPosition';

const App = () => {

    const [show, setShow] = useState<boolean>(false);

    // drag & drop
    //---------------、
    const moveDelay = 150;
    const pin = false;
    const dimension = 32; // onject with dimension
    const [objPosition, setObjPosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });
    const [isDragged, setIsDragged] = useState<boolean>(false);
    const [isPressed, setIsPressed] = useState<boolean>(false);


    const { setup, ref } = useDragDropPosition({
        dimension,
        onDragEnd: ({ left, top }) => {
            setObjPosition({
                x: left || 0,
                y: (top || 0),
            });
            setIsPressed(false);
            setIsDragged(false);

            // click event here (restore)
            setShow(false);
        },
        onDragStart: ({ left, top }) => {
            setObjPosition({
                x: left || 0,
                y: (top || 0),
            });
            setIsDragged(true);

            // click event here (restore)
            setShow(false);
        },
        onInit: ({ left, top }) => {
            setObjPosition({
                x: left || 0,
                y: (top || 0),
            });
        },
        onPointerDown: () => {
            setIsPressed(true);
        },
        onPointerUp: useCallback(() => {
            setIsPressed(false);

            // click event here
            setShow((prev) => !prev);
            
        }, []),
        onMove: ({ left, top }) => {
            setObjPosition({
                x: left || 0,
                y: (top || 0),
            });
        },
        pin,
        moveDelay
    });



    return (


        <>

            <div
                ref={setup}
                className="float-btn"
                style={{position: 'fixed', left: '50%', top: '50%', zIndex: 1000, background: 'red'}}
                
            >Move Here<small>{JSON.stringify(objPosition)}</small><br /><strong>{show ? 'Clicked' : 'None'}</strong></div>

            

        </>
    )
}

 */


import {useCallback, useEffect, useRef } from "react";

const useDragDropPosition = (
    settings
) => {
    const {
        onPointerDown,
        onPointerUp,
        onDragStart,
        onDragEnd,
        onMove,
        dimension = 0,
        onInit,
        pin,
        moveDelay = 150
    } = settings;

    const ref = useRef(null);
    const isClicked = useRef(false);
    const isDragged = useRef(false);
    const keyPressed = useRef(false);


    const getLeft = (left, dimension) => {
        if (left < 0) {
            return 0;
        } else if (left + dimension > window.innerWidth) {
            return window.innerWidth - dimension;
        } else {
            return left;
        }
    };

    const getTop = (top, dimension) => {
        if (top < 0) {
            return 0;
        } else if (top + dimension > window.innerHeight) {
            return window.innerHeight - dimension;
        } else {
            return top;
        }
    };





    // Prevent debounce that starts moving immediately when the mouse is pressed
    const moveTimeout = useRef();
    const moveDisabled = useRef(true);
    
    const moveDelayInit = useCallback(() => {
        moveTimeout.current = setTimeout(() => {
                moveDisabled.current = false;
            }, moveDelay);
        },[moveDelay]
    );

    const moveDelayInitClear = useCallback(() => {
        moveDisabled.current = true;
        clearTimeout(moveTimeout.current)
    },[]);



    // useRef<{ left: number; top: number }>
    const positionRef = useRef({
        left: 0,
        top: 0,
    });

    // ev: PointerEvent | KeyboardEvent
    const handlePointerDown = (ev) => {
        moveDelayInit();

        isClicked.current = true;
        const ele = ev.target;
        ev.stopPropagation();

        if (ev instanceof PointerEvent) {
            keyPressed.current = false;
            ele.setPointerCapture(ev.pointerId);
        } else if (ev instanceof KeyboardEvent) {
            keyPressed.current = true;
        }

        if (typeof onPointerDown === 'function') onPointerDown();

    };

    // ev: PointerEvent | KeyboardEvent
    const handlePointerUp = (ev) => {
        moveDelayInitClear();

        //
        isClicked.current = false;

        const ele = ev.target;

        if (ev instanceof PointerEvent) {
            ele.releasePointerCapture(ev.pointerId);
        }

        if (!isDragged.current) {
            if (typeof onPointerDown === 'function') onPointerUp();
        } else {
            isDragged.current = false;
            if (typeof onPointerDown === 'function') onDragEnd(positionRef.current);
        }
    };

    // e: PointerEvent
    const onPointerMove = (e) => {

        if (moveDisabled.current) return;
        
        //
        if (isClicked.current && ref.current && !keyPressed.current) {

            const touches = e.touches;
            let _x = '';
            let _y = '';

			if ( touches && touches.length ) {
                _x = touches[0].pageX;
				_y = touches[0].pageY;
			} else {
                _x = e.clientX;
				_y = e.clientY;
            }


            const halfWidth = Math.round(dimension / 2);
            const x = _x - halfWidth;
            const y = _y - halfWidth;

            const position = {
                left: getLeft(x, dimension),
                top: getTop(y, dimension),
            };

            if (!isDragged.current) {
                isDragged.current = true;
                if (typeof onPointerDown === 'function') onDragStart(position);
            }

            positionRef.current = position;
            ref.current.style.cssText += `top: ${position.top}px;left: ${position.left}px;`;


            if (typeof onMove === 'function') onMove(position);
        }
    };

    const setup = useCallback((node) => {
        if (node) {
            ref.current = node;
            node.addEventListener("pointerdown", handlePointerDown);
            node.addEventListener("keydown", handlePointerDown);
            node.addEventListener("mouseup", handlePointerUp);  // DO NOT USE 'pointerup'
            node.style.touchAction = "none";
            const { left, top } = node.getBoundingClientRect();
            if (typeof onInit === 'function') onInit({
                left,
                top,
            });
        }

    }, []);

    useEffect(() => {
        // attach drag handlers if not pinned
        if (!pin) {
            document.addEventListener("mousemove", onPointerMove);
            document.addEventListener("touchmove", onPointerMove);

            // cleanup
            return () => {
                document.removeEventListener("mousemove", onPointerMove);
                document.removeEventListener("touchmove", onPointerMove);
            };
        }
    }, []);


    useEffect(() => {
        return () => {
            moveDelayInitClear();
        }
    }, []);


    return {
        ref,
        setup,
    };
};


export { useDragDropPosition };
