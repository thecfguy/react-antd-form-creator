/**
 * <ToolbarItem />
 */

import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import ID from '../UUID';
import classes from '../css/toolbar-item.module.css';

const cardSource = {
	beginDrag(props) {
		return {
			...props.data.fieldProps,
			id: ID.uuid().toLowerCase(),
			type: props.data.key,
			field_name: "field_" + ID.uuid().toLowerCase()
		};
	},
};

const ToolbarItem = (props) => {
	const { connectDragSource, data, onClick } = props;
	if (!connectDragSource) return null;
	return (
		<div ref={connectDragSource} onClick={onClick}>{data.name}</div>
	);
};

export default DragSource(ItemTypes.CARD, cardSource, (connect) => ({
	connectDragSource: connect.dragSource(),
}))(ToolbarItem);
