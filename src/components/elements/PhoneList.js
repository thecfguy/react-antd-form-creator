import React from "react";
import { Input, Select, Row, Col, Form, Button, Tooltip } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
const PHONETYPES = [
  { value: "cellphone", label: "Cell Phone" },
  { value: "homephone", label: "Home" },
  { value: "workphone", label: "Work" },
  { value: "fax", label: "Fax" },
];

const PhoneSingle = ({ value = {}, onChange, ...props }) => {
  const phone = {
    id: null,
    number: null,
    extension: null,
    phoneType: null,
    description: null,
  };
  const triggerChange = (changedValue) => {
    onChange?.({
      ...phone,
      ...value,
      ...changedValue,
    });
  };

  const changePhoneTypeHandler = (value) => {
    triggerChange({ phoneType: value });
  };
  const changeHandler = (e) => {
    const { target } = e;
    triggerChange({ [target.name]: target.value });
  };
  console.log("i am PhoneSingle cell");
  return (
    <Row gutter={8}>
      <Col md={6} xs={24}>
        <Select
          style={{ width: "100%" }}
          name="phoneType"
          placeholder="Type"
          options={PHONETYPES}
          value={value.phoneType || phone.phoneType}
          onChange={changePhoneTypeHandler}
        ></Select>
      </Col>

      <Col md={6} xs={12}>
        <Input
          name="extension"
          placeholder="Ext."
          value={value.extension || phone.extension}
          maxLength={5}
          onChange={changeHandler}
        />
      </Col>
      <Col md={6} xs={12}>
        <Input
          name="d"
          placeholder="Ext."
          value={value.d || phone.extension}
          maxLength={5}
          onChange={changeHandler}
        />
      </Col>
    </Row>
  );
};

const PhoneList = ({ value = [], onChange, ...props }) => {
  return (
    <Form.List name={props.id}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index, fields) => (
            <Row gutter={8} key={field.key}>
              <Col span={23}>
                <Form.Item name={[field.name]} fieldKey={[field.fieldKey]}>
                  <PhoneSingle></PhoneSingle>
                </Form.Item>
              </Col>

              <Col span={1}>
                <Row align="vertical">
                  <Col span={24}>
                    <Tooltip title="Remove Phone">
                      <MinusCircleOutlined
                        className="text-danger"
                        onClick={() => remove(field.name)}
                      />
                    </Tooltip>
                  </Col>

                  <Col span={24}>
                    {fields.length - 1 === index ? (
                      <Tooltip title="Add New Phone">
                        <PlusCircleOutlined className="text-success" onClick={() => add()} />
                      </Tooltip>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
          ))}
          {fields.length === 0 ? (
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Phone
              </Button>
            </Form.Item>
          ) : null}
          <Form.ErrorList errors={errors} />
        </>
      )}
    </Form.List>
  );
};

export default PhoneList;
