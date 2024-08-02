/**
 * <ToolbarItem />
 */

import React, { useContext } from "react";
import { useDrag } from "react-dnd";
import ItemTypes from "../ItemTypes";
import ID from "../UUID";
import classes from "../css/toolbar-draggable-item.module.css";
import FormBuilderContext from "../form-builder-context";
import { Space, theme, Typography } from "antd";

const ToolbarItem = (props) => {
    const { data } = props;
    const {useToken} = theme
    const { token } = useToken()
    const { elements, updateFormElement } = useContext(FormBuilderContext);
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: {
            ...data.fieldProps,
            id: ID.uuid().toLowerCase(),
            type: props.data.key,
            field_name: "field_" + ID.uuid().toLowerCase()
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();

            if (item && dropResult) {
                updateFormElement([...elements, item]);
            }
        }
    });

    return (
        <div ref={drag} className={classes.item}>
           <Typography.Text              
                >  
                <Space>
                <i className={data.icon}></i> <span>
               {data.name}</span></Space></Typography.Text>
        </div>
    );
};

export default ToolbarItem;
