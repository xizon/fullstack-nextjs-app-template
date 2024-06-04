/**
 * Drag & Drop Element
 * 
 * @usage:


const App = () => {
    const {
        dragContentHandle, 
        dragHandle,
        resetPosition
    }: any = useDraggable({
        enabled: true,   // if `false`, drag and drop is disabled
        preventOutsideScreen: {
            xAxis: true,
            yAxis: true
        },
        onStart: (coordinates: Record<string, number>, handleEl: HTMLElement | null, contentEl: HTMLElement | null) => {
            
        },
        onDrag: (coordinates: Record<string, number>, handleEl: HTMLElement | null, contentEl: HTMLElement | null) => {
            console.log(coordinates); // {dx: -164, dy: -37}

        },
        onStop: (coordinates: Record<string, number>, handleEl: HTMLElement | null, contentEl: HTMLElement | null) => {

        }
    });

    const resetModal = () => {
        resetPosition?.();
    };

    return (
        <div className="container" ref={dragContentHandle}>
            <div ref={dragHandle} className="handle">Drag me</div>
            <div className="content">
                content...
            </div>
        </div>
    );
};


 */

import { useEffect, useState, useCallback } from "react"

const useDraggable = ({
    enabled,
    preventOutsideScreen,
    onStart,
    onStop,
    onDrag
}) => {
    
    const DRAG_DISABLED = typeof enabled === "undefined" || enabled === false;
    
    let dragging = false; // DO NOT USE 'useState()'
    const [node, setNode] = useState(null);
    const [targetNode, setTargetNode] = useState(null);
    const [{ dx, dy }, setOffset] = useState({
        dx: 0,
        dy: 0
    });

    const ref = useCallback(nodeEle => {
        setNode(nodeEle)
    }, []);

    const targetRef = useCallback(nodeEle => {
        setTargetNode(nodeEle)
    }, []);

    const withoutViewport = (startPos, e, targetEl) => {
        if (!targetEl || typeof preventOutsideScreen === "undefined") return null;

        // latest mouse coordinates
        let mouseX = e.clientX;
        let mouseY = e.clientY;

        // the size of the parent element
        let parentWidth = window.innerWidth;
        let parentHeight = window.innerHeight;

        // the size of the child element
        let childrenWidth = targetEl.clientWidth;
        let childrenHight = targetEl.clientHeight;

        const minLeft = -(parentWidth - childrenWidth) / 2;
        const maxLeft = (parentWidth - childrenWidth) / 2;

        const minTop = -(parentHeight - childrenHight) / 2;
        const maxTop = (parentHeight - childrenHight) / 2;

        // calculates the left and top offsets after the move
        let nLeft = mouseX - startPos.x;
        let nTop = mouseY - startPos.y;


        // Determine whether the left or right distance is out of bounds
        if (preventOutsideScreen.xAxis) {
            nLeft = nLeft <= minLeft ? minLeft : nLeft;
            nLeft = nLeft >= maxLeft ? maxLeft : nLeft;
        }

        if (preventOutsideScreen.yAxis) {
            nTop = nTop <= minTop ? minTop : nTop;
            nTop = nTop >= maxTop ? maxTop : nTop;
        }

        return [nLeft, nTop];
    }

    const handleMouseDown = useCallback(
        e => {
            dragging = true;

            if (typeof onStart === 'function') onStart({ dx, dy }, targetNode, node);

            const startPos = {
                x: e.clientX - dx,
                y: e.clientY - dy
            };

            const handleMouseMove = e => {
                if (!dragging) return;

                let dx = e.clientX - startPos.x;
                let dy = e.clientY - startPos.y;

                // prevent dragged item to be dragged outside of screen
                if (preventOutsideScreen && node) {
                    const _data = withoutViewport(startPos, e, node);
                    if (_data !== null) {
                        dx = _data[0];
                        dy = _data[1];
                    }
                }

                setOffset({ dx, dy });
                if (typeof onDrag === 'function') onDrag({ dx, dy }, targetNode, node);

                e.stopPropagation();
                e.preventDefault();
            };

            const handleMouseUp = () => {
                dragging = false;
                if (typeof onStop === 'function') onStop({ dx, dy }, targetNode, node);

                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };

            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        },
        [dx, dy, node]
    )

    const handleTouchStart = useCallback(
        e => {
            dragging = true;
            if (typeof onStart === 'function') onStart({ dx, dy }, targetNode, node);

            const touch = e.touches[0];

            const startPos = {
                x: touch.clientX - dx,
                y: touch.clientY - dy
            };

            const handleTouchMove = e => {
                if (!dragging) return;

                const touch = e.touches[0];
                let dx = touch.clientX - startPos.x;
                let dy = touch.clientY - startPos.y;

                // prevent dragged item to be dragged outside of screen
                if (preventOutsideScreen && node) {
                    const _data = withoutViewport(startPos, touch, node);
                    if (_data !== null) {
                        dx = _data[0];
                        dy = _data[1];
                    }
                }

                setOffset({ dx, dy });
                if (typeof onDrag === 'function') onDrag({ dx, dy }, targetNode, node);

                e.stopPropagation();
                e.preventDefault();
            };

            const handleTouchEnd = () => {
                dragging = false;
                if (typeof onStop === 'function') onStop({ dx, dy }, targetNode, node);

                document.removeEventListener("touchmove", handleTouchMove);
                document.removeEventListener("touchend", handleTouchEnd);
            };

            document.addEventListener("touchmove", handleTouchMove);
            document.addEventListener("touchend", handleTouchEnd);
        },
        [dx, dy, node]
    )

    useEffect(() => {
        if (node) {
            node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        }
    }, [node, dx, dy]);

    useEffect(() => {
        if (DRAG_DISABLED) {
            return;
        }

        if (!targetNode) {
            return
        }
        targetNode.addEventListener("mousedown", handleMouseDown);
        targetNode.addEventListener("touchstart", handleTouchStart);
        return () => {
            targetNode.removeEventListener("mousedown", handleMouseDown);
            targetNode.removeEventListener("touchstart", handleTouchStart);
        }
    }, [targetNode, dx, dy]);



    return {
        dragContentHandle: ref,
        dragHandle: targetRef,
        resetPosition: () => {
            // reset position
            setOffset({ dx: 0, dy: 0 });
        }
    };
}

export default useDraggable;
