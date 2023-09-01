import React, { useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Form } from "antd";
import EditableTable from "../components/elements/EditableTable";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: "Table",
    component: EditableTable
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
    const [form] = Form.useForm();
    const { ...props } = args;

    return (
        <Form form={form} layout="vertical" onFinish={(v) => console.log(v)}>
            <Form.Item label="Table" name="table">
                <EditableTable {...props} />
            </Form.Item>
            <Form.Item>
                <button type="submit">Submit</button>
            </Form.Item>
        </Form>
    );
};

export const TablePad = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TablePad.args = {
    columns: [
        {
            title: "Column 1",
            dataIndex: "column1",
            key: "column1",
            inputType: "Text",
            isRequired: true
        },
        { title: "Column 2", dataIndex: "column2", key: "column2", inputType: "Text" },
        { title: "Column 3", dataIndex: "column3", key: "column3", inputType: "Text" }
    ],
    noOfRows: 3,
    autoAddLastRow: false
};
