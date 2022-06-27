import React from "react";
import { Button, Form, Input, Space } from "antd";

const Columns = (props) => {
  return (
    <Form.List name={props.name}>
      {(fields, { add, remove }) => (
        <Form.Item label="Columns">
          {fields.map((field) => (
            <Space key={field.key} align="baseline">
              <Form.Item {...field} name={[field.name, "title"]}>
                <Input placeholder="Label" />
              </Form.Item>

              <i className="fa fa-minus-circle" onClick={() => remove(field.name)} />
            </Space>
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
