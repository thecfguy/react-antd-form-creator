import React from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select, Space } from "antd";
const InputConst = {
  Number: "Number",
  Text: "Text",
};
const InputTypes = [
  { value: InputConst.Number, label: InputConst.Number },
  { value: InputConst.Text, label: InputConst.Text },
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
              <Col span={12}>
                <Form.Item
                  {...field}
                  name={[field.name, "title"]}
                  rules={[{ required: true, message: "Please enter column label" }]}
                >
                  <Input placeholder="Label" />
                </Form.Item>
              </Col>
              <Col span={6} required>
                <Form.Item {...field} name={[field.name, "inputType"]}>
                  <Select
                    placeholder="Input Type"
                    options={InputTypes}
                    defaultValue={InputConst.Text}
                  />
                </Form.Item>
              </Col>
              <Col span={5}>
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
