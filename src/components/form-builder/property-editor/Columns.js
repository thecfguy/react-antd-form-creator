import React from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from "antd";
import { InputTypes } from "../../appConstants";

const InputTypeOptions = [
    { value: InputTypes.Number, label: InputTypes.Number },
    { value: InputTypes.Text, label: InputTypes.Text },
    { value: InputTypes.TextArea, label: InputTypes.TextArea },
    { value: InputTypes.Checkbox, label: InputTypes.Checkbox },
    {
        value: InputTypes.Date,
        label: InputTypes.Date
    },
    {
        value: InputTypes.Time,
        label: InputTypes.Time
    },
    {
        value: InputTypes.DateTime,
        label: InputTypes.DateTime
    }
];

const CustomCheckBox = ({ value, onChange, ...props }) => {
    return (
        <Checkbox
            checked={value ? true : false}
            onChange={(e) => {
                onChange(e.target.checked);
            }}
            {...props}
        />
    );
};

const Columns = (props) => {
    return (
        <Form.List name={props.name}>
            {(fields, { add, remove }) => (
                <Form.Item label="Columns">
                    {fields.map((field) => (
                        <Row key={field.key} align="baseline" gutter={[12]}>
                            <Col span={10}>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "title"]}
                                    rules={[{ required: true, message: "Please enter column label" }]}
                                >
                                    <Input placeholder="Label" />
                                </Form.Item>
                            </Col>
                            <Col span={5} required>
                                <Form.Item {...field} name={[field.name, "inputType"]}>
                                    <Select
                                        placeholder="Input Type"
                                        options={InputTypeOptions}
                                        defaultValue={InputTypes.Text}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={4}>
                                <Space size={12} align="baseline">
                                    <Form.Item
                                        {...field}
                                        name={[field.name, "width"]}
                                        rules={[
                                            {
                                                required: true,

                                                validator: (rule, value) => {
                                                    if (value && value < 10) {
                                                        return Promise.reject("Width must be greater than 10");
                                                    }
                                                    return Promise.resolve();
                                                }
                                            }
                                        ]}
                                    >
                                        <Input type="number" min={10} placeholder="Width" />
                                    </Form.Item>
                                </Space>
                            </Col>
                            <Col span={4}>
                                <Space size={12} align="baseline">
                                    <Form.Item {...field} name={[field.name, "isRequired"]}>
                                        <CustomCheckBox placeholder="Required" />
                                    </Form.Item>
                                    <label>Required</label>
                                </Space>
                            </Col>
                            <Col span={1}>
                                <i className="fa fa-minus-circle" onClick={() => remove(field.name)} />
                            </Col>
                        </Row>
                    ))}

                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                            Add Column
                        </Button>
                    </Form.Item>
                </Form.Item>
            )}
        </Form.List>
    );
};

export default Columns;
