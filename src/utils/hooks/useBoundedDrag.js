/**
 * Bounded Drag
 * 
 * @usage:


const App = () => {
    const [items, setItems] = useState<ListItem[]>([]);
    // ... other states and refs
      
    const deepCloneWithReactNode = (obj: any): any => {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        // Handle array
        if (Array.isArray(obj)) {
            return obj.map(item => deepCloneWithReactNode(item));
        }

        // Handle object
        const clonedObj: any = {};
        for (const key in obj) {
            if (key === 'appendControl') {
                clonedObj[key] = obj[key];
            } else {
                clonedObj[key] = deepCloneWithReactNode(obj[key]);
            }
        }
        return clonedObj;
    };


    const getItemWithChildrenIndices = (items: ListItem[], startIndex: number): number[] => {
        const indices = [startIndex];
        const startItem = items[startIndex];
        const startDepth = startItem.depth || 0;

        // Check if subsequent items are child items
        for (let i = startIndex + 1; i < items.length; i++) {
            const currentItem = items[i];
            const currentDepth = currentItem.depth || 0;
            if (currentDepth > startDepth) {
                indices.push(i);
            } else {
                break;
            }
        }

        return indices;
    };


    const { isDragging, dragHandlers } = useBoundedDrag({
        dragMode,
        boundarySelector: '.custom-draggable-list',
        itemSelector:'.custom-draggable-list__item',
        dragHandleSelector: '.custom-draggable-list__handle',
        onDragStart: (index: number) => {
            // Additional drag start logic if needed
        },
        onDragOver: (dragIndex: number | null, dropIndex: number | null) => {
            // Additional drag over logic if needed
        },
        onDragEnd: (dragIndex: number | null, dropIndex: number | null) => {
            if (dragIndex !== null && dropIndex !== null && dragIndex !== dropIndex) {
                // Handle item movement
                const newItems = deepCloneWithReactNode(items);
                const itemsToMove = getItemWithChildrenIndices(newItems, dragIndex);
                const itemsBeingMoved = itemsToMove.map(index => newItems[index]);

                // ... rest of your existing drag end logic ...

                setItems(updatedItems);

            }
        }
    });

    // Update your JSX to use the new handlers
    return (
        <ul className="custom-draggable-list">
        {items.map((item: any, index: number) => (
            <li
                // ... other props
                draggable={!draggable ? undefined : editingItem !== item.id && "true"}
                onDragStart={!draggable ? undefined : (e) => dragHandlers.handleDragStart(e, index)}
                onDragOver={!draggable ? undefined : dragHandlers.handleDragOver}
                onDragEnd={!draggable ? undefined : dragHandlers.handleDragEnd}
                onTouchStart={!draggable ? undefined : (e) => dragHandlers.handleDragStart(e, index)}
                onTouchMove={!draggable ? undefined : dragHandlers.handleDragOver}
                onTouchEnd={!draggable ? undefined : dragHandlers.handleDragEnd}
            >
                <li className="custom-draggable-list__item">
                    <span className="custom-draggable-list__handle">☰</span>
                    <i>content {indec}<i>
                </li>
            </li>
        ))}
    </ul>
);
};


 */
import { useRef, useState } from 'react';

export const useBoundedDrag = (options = {}) => {
    const {
        dragMode = 'handle',
        boundarySelector = '.custom-draggable-list',
        itemSelector = '.custom-draggable-list__item',
        dragHandleSelector = '.custom-draggable-list__handle',
        onDragStart,
        onDragOver,
        onDragEnd
    } = options;

    const [isDragging, setIsDragging] = useState(false);
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const dragNode = useRef(null);
    const touchOffset = useRef({ x: 0, y: 0 });
    const currentHoverItem = useRef(null);

    const handleDragStart = (e, position) => {
        const isTouch = 'touches' in e;
        const target = e.target;

        // For block mode or handle mode check
        if (dragMode === 'handle') {
            const handle = target.closest(dragHandleSelector);
            if (!handle) {
                if (!isTouch) e.preventDefault();
                return false;
            }
        }

        // Find the draggable item
        const listItem = target.closest(itemSelector);
        if (!listItem) return;

        // Check boundary
        const boundary = listItem.closest(boundarySelector);
        if (!boundary) return;

        dragItem.current = position;
        onDragStart?.(position);

        if (isTouch) {
            e.preventDefault(); // Prevent scrolling
            const touch = e.touches[0];
            const rect = listItem.getBoundingClientRect();
            const boundaryRect = boundary.getBoundingClientRect();

            // Calculate offset relative to the boundary
            touchOffset.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };

            // Clone the item for dragging
            dragNode.current = listItem.cloneNode(true);
            dragNode.current.classList.add('dragging');

            // Style the clone
            Object.assign(dragNode.current.style, {
                position: 'fixed',
                width: `${rect.width}px`,
                height: `${rect.height}px`,
                left: `${rect.left}px`,
                top: `${rect.top}px`,
                zIndex: '1000',
                pointerEvents: 'none',
                transform: 'scale(1.05)',
                transition: 'transform 0.1s',
                opacity: '0.9'
            });

            document.body.appendChild(dragNode.current);
            setIsDragging(true);
            listItem.classList.add('dragging-placeholder');
        } else {
            listItem.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            setTimeout(() => {
                listItem.style.opacity = '0.5';
            }, 0);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        const isTouch = 'touches' in e;

        if (!isTouch) {
            e.dataTransfer.dropEffect = 'move';
        }

        // Get the current pointer/touch position
        const point = isTouch ?
            e.touches[0] :
            { clientX: e.clientX, clientY: e.clientY };

        // Update dragged element position for touch events
        if (isTouch && isDragging && dragNode.current) {
            dragNode.current.style.left = `${point.clientX - touchOffset.current.x}px`;
            dragNode.current.style.top = `${point.clientY - touchOffset.current.y}px`;
        }

        // Find the element below the pointer/touch
        const elemBelow = document.elementFromPoint(
            point.clientX,
            point.clientY
        );

        if (!elemBelow) return;

        // Find the closest list item
        const listItem = elemBelow.closest(itemSelector);
        if (!listItem || listItem === currentHoverItem.current) return;

        // Check boundary
        const boundary = listItem.closest(boundarySelector);
        if (!boundary) return;

        // Update hover states
        if (currentHoverItem.current) {
            currentHoverItem.current.classList.remove('drag-over', 'drag-over-top', 'drag-over-bottom');
        }

        currentHoverItem.current = listItem;
        listItem.classList.add('drag-over');

        // Calculate position in list
        const position = Array.from(listItem.parentNode.children).indexOf(listItem);
        dragOverItem.current = position;

        // Determine drop position (top/bottom)
        const rect = listItem.getBoundingClientRect();
        const middleY = rect.top + rect.height / 2;

        if (point.clientY < middleY) {
            listItem.classList.add('drag-over-top');
        } else {
            listItem.classList.add('drag-over-bottom');
        }

        onDragOver?.(dragItem.current, dragOverItem.current);
    };

    const handleDragEnd = (e) => {
        const isTouch = 'touches' in e;
        if (isTouch && !isDragging) return;

        onDragEnd?.(dragItem.current, dragOverItem.current);

        // Cleanup
        if (dragNode.current) {
            dragNode.current.remove();
            dragNode.current = null;
        }

        document.querySelectorAll(itemSelector).forEach(item => {
            item.style.opacity = '1';
            item.classList.remove(
                'dragging',
                'dragging-placeholder',
                'drag-over',
                'drag-over-top',
                'drag-over-bottom'
            );
        });

        setIsDragging(false);
        currentHoverItem.current = null;
        dragItem.current = null;
        dragOverItem.current = null;
    };

    return {
        isDragging,
        dragHandlers: {
            handleDragStart,
            handleDragOver,
            handleDragEnd
        }
    };
};

export default useBoundedDrag;