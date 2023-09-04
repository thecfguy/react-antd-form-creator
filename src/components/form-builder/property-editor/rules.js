import React from "react";
import { Form, Space } from "antd";
import { renderField } from "./renderfields";

const Rules = (props) => {
    return (
        <Form.List name={props.name}>
            {(fields) => (
                <Form.Item label="Requirements">
                    {fields.map((field, index) => (
                        <Space key={field.key} align="baseline">
                            {Object.keys(props.value[index]).map((key) => {
                                return renderField([field.name, key], props.value[index][key]);
                            })}
                        </Space>
                    ))}
                </Form.Item>
            )}
        </Form.List>
    );
};

export default Rules;
