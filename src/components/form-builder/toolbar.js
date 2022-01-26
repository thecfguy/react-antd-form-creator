/**
 * <Toolbar />
 */

import React, { useEffect, useState } from 'react';
import ToolbarItem from './toolbar-draggable-item';
import FormItems from './form-items';

function buildItems(items, fieldProps = [], defaultItems) {
	let resultItems = []
	if (!items)
		resultItems = defaultItems;

	resultItems = resultItems.map((field) => {
		let found = fieldProps.find((overrideField) => (field.key === overrideField.key));
		if (found)
			field.fieldProps = { ...field.fieldProps, ...found.fieldProps };
		return field;
	})
	return resultItems;
}
//TODO: Fields still need to implement

const Toolbar = ({ fields, fieldProps, ...props }) => {
	const [items, setItems] = useState([]);

	useEffect(() => {
		setItems(buildItems(fields, fieldProps, FormItems));
	}, [fields, fieldProps]);

	return (
		<div>
			{items.map((item) => (
				<ToolbarItem
					data={item}
					key={item.key}
				/>
			))
			}
		</div>
	);
};

export default Toolbar;
