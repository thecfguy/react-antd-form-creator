import React from "react";
import { Button, Form, Input, Space } from "antd";

const Options = (props) => {
    return (
        <Form.List name={props.name}>
            {(fields, { add, remove }) => (
                <Form.Item label="Options">
                    {fields.map((field) => (
                        <Space key={field.key} align="baseline">
                            <Form.Item {...field} name={[field.name, "label"]}>
                                <Input placeholder="Label" />
                            </Form.Item>
                            <Form.Item {...field} name={[field.name, "value"]}>
                                <Input placeholder="Value" />
                            </Form.Item>
                            <i className="fa fa-minus-circle" onClick={() => remove(field.name)} />
                        </Space>
                    ))}

                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block>
                            Add Option
                        </Button>
                    </Form.Item>
                </Form.Item>
            )}
        </Form.List>
    );
};

export default Options;
