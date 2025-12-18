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
        onDragUpdate,
        onDragEnd
    } = options;

    const [isDragging, setIsDragging] = useState(false);

    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const dragNode = useRef(null);
    const draggedElement = useRef(null);
    const boundaryElement = useRef(null);
    const touchOffset = useRef({ x: 0, y: 0 });
    const currentHoverItem = useRef(null);
    const rafId = useRef(null);
    const lastUpdateDragIndex = useRef(null);
    const lastUpdateDropIndex = useRef(null);

    const handleDragStart = (e, position) => {
        const isTouch = 'touches' in e;
        const target = e.target;

        // handle 模式校验
        if (dragMode === 'handle') {
            const handle = target.closest(dragHandleSelector);
            if (!handle) {
                if (!isTouch) e.preventDefault();
                return;
            }
        }

        const listItem = target.closest(itemSelector);
        if (!listItem) return;

        const boundary = listItem.closest(boundarySelector);
        if (!boundary) return;

        dragItem.current = position;
        onDragStart && onDragStart(position);

        if (isTouch) {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = listItem.getBoundingClientRect();

            touchOffset.current = {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };

            const clone = listItem.cloneNode(true);
            clone.classList.add('dragging');

            Object.assign(clone.style, {
                position: 'fixed',
                width: rect.width + 'px',
                height: rect.height + 'px',
                left: rect.left + 'px',
                top: rect.top + 'px',
                zIndex: 1000,
                pointerEvents: 'none',
                transform: 'scale(1.05)',
                opacity: '0.9'
            });

            document.body.appendChild(clone);

            dragNode.current = clone;
            draggedElement.current = listItem;
            boundaryElement.current = boundary;
            setIsDragging(true);

            listItem.classList.add('dragging-placeholder');
        } else {
            draggedElement.current = listItem;
            boundaryElement.current = boundary;
            setIsDragging(true);

            if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', '');
            }

            listItem.classList.add('dragging-placeholder');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();

        const isTouch = 'touches' in e;
        let clientX, clientY;

        if (isTouch) {
            const touch = e.touches[0];
            clientX = touch.clientX;
            clientY = touch.clientY;
        } else {
            e.dataTransfer.dropEffect = 'move';
            clientX = e.clientX;
            clientY = e.clientY;
        }

        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
        }

        rafId.current = requestAnimationFrame(() => {
            if (isTouch && dragNode.current) {
                dragNode.current.style.left = clientX - touchOffset.current.x + 'px';
                dragNode.current.style.top = clientY - touchOffset.current.y + 'px';
            }

            const elemBelow = document.elementFromPoint(clientX, clientY);
            if (!elemBelow) return;

            const listItem = elemBelow.closest(itemSelector);
            if (!listItem) return;

            const boundary =
                boundaryElement.current ||
                listItem.closest(boundarySelector);

            if (!boundary) return;

            if (
                currentHoverItem.current &&
                currentHoverItem.current !== listItem
            ) {
                currentHoverItem.current.classList.remove(
                    'drag-over',
                    'drag-over-top',
                    'drag-over-bottom'
                );
            }

            currentHoverItem.current = listItem;
            listItem.classList.add('drag-over');

            const dragEl = draggedElement.current;
            if (!dragEl) return;

            const children = Array.from(
                boundary.querySelectorAll(itemSelector)
            );

            const rect = listItem.getBoundingClientRect();
            const middleY = rect.top + rect.height / 2;

            listItem.classList.remove('drag-over-top', 'drag-over-bottom');

            const insertBefore =
                clientY < middleY
                    ? listItem
                    : listItem.nextElementSibling;

            if (clientY < middleY) {
                listItem.classList.add('drag-over-top');
            } else {
                listItem.classList.add('drag-over-bottom');
            }

            if (insertBefore !== dragEl && boundary.contains(dragEl)) {
                boundary.insertBefore(dragEl, insertBefore);
            }

            const newChildren = Array.from(
                boundary.querySelectorAll(itemSelector)
            );
            dragOverItem.current = newChildren.indexOf(dragEl);

            onDragOver &&
                onDragOver(dragItem.current, dragOverItem.current);

            if (
                onDragUpdate &&
                (dragItem.current !== lastUpdateDragIndex.current ||
                    dragOverItem.current !== lastUpdateDropIndex.current)
            ) {
                lastUpdateDragIndex.current = dragItem.current;
                lastUpdateDropIndex.current = dragOverItem.current;
                onDragUpdate(dragItem.current, dragOverItem.current);
            }

            rafId.current = null;
        });
    };

    const handleDragEnd = () => {
        onDragEnd && onDragEnd(dragItem.current, dragOverItem.current);

        if (rafId.current) {
            cancelAnimationFrame(rafId.current);
            rafId.current = null;
        }

        if (dragNode.current) {
            dragNode.current.remove();
            dragNode.current = null;
        }

        document.querySelectorAll(itemSelector).forEach(item => {
            item.classList.remove(
                'dragging',
                'dragging-placeholder',
                'drag-over',
                'drag-over-top',
                'drag-over-bottom'
            );
        });

        setIsDragging(false);
        dragItem.current = null;
        dragOverItem.current = null;
        draggedElement.current = null;
        boundaryElement.current = null;
        currentHoverItem.current = null;
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