import React, { useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import classes from '../css/drop-zone.module.css';
import SortableElement from '../form-builder/sortable-element';
import { Form } from 'antd';
import PropertyEditor from '../form-builder/property-editor';

export const DropZone = ({ elements, onUpdate }) => {

    const [visible, setVisible] = useState(false);
    const [currentElement, setCurrentElement] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [{ canDrop, isOver, draggedItem }, drop] = useDrop(() => ({
        accept: ItemTypes.CARD,
        drop: (item, monitor) => item,
        collect: (monitor) =>
        ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
            draggedItem: monitor.getDropResult()
        })
        ,
    }));

    useEffect(() => {
        if (draggedItem && elements && onUpdate)
            if (draggedItem.id) onUpdate([...elements, draggedItem])
    }, [draggedItem, elements, onUpdate])

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        let elems = [...elements];
        [elems[dragIndex], elems[hoverIndex]] = [elems[hoverIndex], elems[dragIndex]];
        onUpdate(elems);
    }, [elements, onUpdate]);

    const editHandler = (element, index) => {
        setCurrentElement(element);
        setCurrentIndex(index);
        setVisible(true);
    }
    const deleteHandler = (element, index) => {
        onUpdate?.(elements.filter((element, i) => index !== i))
    }

    const submitHandler = (values) => {
        const element = { ...currentElement, ...values };

        onUpdate?.(elements.map((e, i) => currentIndex !== i ? e : element))
    }

    const isActive = canDrop && isOver;
    let backgroundColor = '#fff';
    if (isActive) {
        backgroundColor = '#eee';
    }
    else if (canDrop) {
        backgroundColor = '#eee';
    }

    return (
        <div ref={drop} className={classes.dropzone} style={{ "backgroundColor": backgroundColor }}>
            <Form labelAlign="right"
                colon
                requiredMark
                labelCol={{ span: 5 }}>
                {elements.map((element, index) => {
                    return <SortableElement key={element.id}
                        index={index}
                        element={element}
                        onMove={moveCard}
                        onEdit={editHandler}
                        onDelete={deleteHandler} />
                })}
            </Form>
            <PropertyEditor show={visible} element={currentElement} onClose={(e) => setVisible(false)} onSubmit={submitHandler}></PropertyEditor>
        </div >
    );
};

export default DropZone;