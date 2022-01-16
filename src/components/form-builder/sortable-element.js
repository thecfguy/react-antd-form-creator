import React, { useState } from 'react';
import classes from '../css/sortable-elements.module.css';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import { FormElement } from '../elements';
import { Button } from 'antd';

const SortableElement = ({ element, index, onMove, onEdit, onDelete }) => {
    const ref = useRef(null);
    const [showAction, setShowAction] = useState(false);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.BOX,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            onMove(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag, preview] = useDrag({
        type: ItemTypes.BOX,
        item: () => {
            return { id: element.id, index: index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const editHandler = (e) => {
        if (onEdit)
            onEdit(element, index);
    }
    const deleteHandler = (e) => {
        if (onDelete)
            onDelete(element, index);
    }
    const opacity = isDragging ? 0.6 : 1;

    drag(drop(ref));

    return (
        <div ref={preview} className={classes.element} style={{ opacity: opacity }} data-handler-id={handlerId} onMouseOver={(e) => setShowAction(true)} onMouseOut={(e) => setShowAction(false)}>
            <div className={classes.sorter} ref={ref}>
                <i className="fas fa-grip-vertical" style={{ "margin": "10px", color: "#ccc" }}></i>
            </div>
            <div className={classes.formitem}>
                <FormElement element={element} />
            </div>
            <div className={classes.action} style={{ display: showAction ? "block" : "none" }}>
                <Button type="link" onClick={editHandler}><i className="fas fa-edit"></i></Button>
                <Button type="link" danger onClick={deleteHandler}><i className="fas fa-trash"></i></Button>
            </div>
        </div >
    );
};

export default SortableElement;