/**
 * <Toolbar />
 */

import React, { useEffect, useState } from 'react';
import ToolbarItem from './toolbar-draggable-item';
import FormItems from './form-items';
import { Menu } from 'antd';

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
		<Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
			{items.map((item) => (
				<Menu.Item key={item.key} icon={<i className={item.icon}></i>} style={{ border: "1px solid #efefef" }}>
					<ToolbarItem
						data={item}
						key={item.key}
					/>
				</Menu.Item>
			))
			}
		</Menu >
	);
};

export default Toolbar;
