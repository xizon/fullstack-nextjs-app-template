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
        // usePercentage: true, // Enable percentage values
        dimension,
        onDragEnd: ({position, hasContainer}) => {
            const { left, top } = position;
            setObjPosition({
                x: left || 0,
                y: (top || 0),
            });
            setIsPressed(false);
            setIsDragged(false);

            // click event here (restore)
            setShow(false);
        },
        onDragStart: ({position, hasContainer}) => {
            const { left, top } = position;
            setObjPosition({
                x: left || 0,
                y: (top || 0),
            });
            setIsDragged(true);

            // click event here (restore)
            setShow(false);
        },
        onInit: ({position, hasContainer}) => {
            const { left, top } = position;
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
        onMove: ({position, hasContainer}) => {
            const { left, top } = position;
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




const App2 = () => {

    const dragdropContainerRef = useRef<HTMLDivElement>(null);
    ....

    const { setup, ref } = useDragDropPosition({
        container: dragdropContainerRef.current,  // If there is a container with a drag range
        ...
    });


    return (

        <>

            <div
                ref={dragdropContainerRef}
                style={{
                    width: '300px',
                    height: '300px',
                    border: '1px solid #ddd',
                    background: '#efefef',
                    position: 'relative'
                }}
            >
                <div
                    ref={setup}
                    className="float-btn"
                    style={{ position: 'fixed', left: '50%', top: '50%', zIndex: 1000, background: 'red' }}

                >Move Here<small>{JSON.stringify(objPosition)}</small><br /><strong>{show ? 'Clicked' : 'None'}</strong></div>

            </div> 



        </>
    )
}

 */


import {useCallback, useEffect, useRef } from "react";

const useDragDropPosition = (
    settings
) => {
    const {
        container = null,
        onPointerDown,
        onPointerUp,
        onDragStart,
        onDragEnd,
        onMove,
        dimension = 0,
        onInit,
        pin,
        moveDelay = 150,
        usePercentage = false  // option to return percentage values
    } = settings;

    const ref = useRef(null);
    const isClicked = useRef(false);
    const isDragged = useRef(false);
    const keyPressed = useRef(false);

    
    // Convert pixel position to percentage
    const convertToPercentage = useCallback((position) => {
        if (usePercentage) {
            if (!container) return {
                position,
                hasContainer: container
            };

            const containerDim = getContainerDimensions();
            return {
                position: {
                    left: (position.left / containerDim.width) * 100,
                    top: (position.top / containerDim.height) * 100
                },
                hasContainer: container
            };
        } else {
            return {
                position,
                hasContainer: false
            };
        }

    });


    const getContainerDimensions = () => {
      
        if (!container) {
            return {
                width: window.innerWidth,
                height: window.innerHeight,
                left: 0,
                top: 0
            };
        }

        const rect = container.getBoundingClientRect();
        return {
            width: rect.width,
            height: rect.height,
            left: rect.left,
            top: rect.top
        };
    };

    const getLeft = (left, dimension) => {
        const containerDim = getContainerDimensions();
        const minLeft = container ? 0 : containerDim.left;
        const maxLeft = containerDim.width - dimension;

        if (left < minLeft) {
            return minLeft;
        } else if (left > maxLeft) {
            return maxLeft;
        }
        return left;
    };

    const getTop = (top, dimension) => {
        const containerDim = getContainerDimensions();
        const minTop = container ? 0 : containerDim.top;
        const maxTop = containerDim.height - dimension;

        if (top < minTop) {
            return minTop;
        } else if (top > maxTop) {
            return maxTop;
        }
        return top;
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

    // Handles relative position calculations
    const calculateRelativePosition = (clientX, clientY) => {
        const containerDim = getContainerDimensions();
        const halfWidth = Math.round(dimension / 2);

        let x = clientX;
        let y = clientY;

        if (container) {
            // Calculate the position relative to the container
            x = clientX - containerDim.left;
            y = clientY - containerDim.top;
        }

        return {
            x: x - halfWidth,
            y: y - halfWidth
        };
    };



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
        isClicked.current = false;

        if (ev instanceof PointerEvent) {
            const ele = ev.target;
            ele.releasePointerCapture(ev.pointerId);
        }

        if (typeof onDragEnd === 'function') {
            // Convert final position to percentage if needed
            const finalPosition = convertToPercentage(positionRef.current);
            onDragEnd(finalPosition);
        }
        
        if (!isDragged.current) {
            if (typeof onPointerUp === 'function') onPointerUp();
        } else {
            isDragged.current = false;
        }
    };

    // e: PointerEvent
    const onPointerMove = (e) => {
        if (moveDisabled.current || !isClicked.current || !ref.current || keyPressed.current) {
            return;
        }

        const touches = e.touches;
        const clientX = touches && touches.length ? touches[0].clientX : e.clientX;
        const clientY = touches && touches.length ? touches[0].clientY : e.clientY;

        const { x, y } = calculateRelativePosition(clientX, clientY);

        const position = {
            left: getLeft(x, dimension),
            top: getTop(y, dimension),
        };

        if (!isDragged.current) {
            isDragged.current = true;
            if (typeof onDragStart === 'function') {
                const startPosition = convertToPercentage(position);
                onDragStart(startPosition);
            }
        }

        positionRef.current = position;
        
        // Always use pixels for actual positioning
        ref.current.style.cssText += `top: ${position.top}px;left: ${position.left}px;`;

        if (typeof onMove === 'function') {
            const movePosition = convertToPercentage(position);
            onMove(movePosition);
        }
    };

    const setup = useCallback((node) => {
        if (node) {
            ref.current = node;
            node.addEventListener("pointerdown", handlePointerDown);
            node.addEventListener("keydown", handlePointerDown);
            node.addEventListener("mouseup", handlePointerUp);
            node.style.touchAction = "none";

            // Get initial position
            const rect = node.getBoundingClientRect();
            const containerDim = getContainerDimensions();
            const initialPosition = {
                left: container ? rect.left - containerDim.left : rect.left,
                top: container ? rect.top - containerDim.top : rect.top,
            };

            if (typeof onInit === 'function') {
                const initPosition = convertToPercentage(initialPosition);
                onInit(initPosition);
            }
        }
    }, [container]);  // need dependence "container"

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
    }, [container]);  // need dependence "container"


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
