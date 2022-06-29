import React from "react";
import { Input, Select, Row, Col } from "antd";
const PHONETYPES = [
  { value: "cellphone", label: "Cell Phone" },
  { value: "homephone", label: "Home" },
  { value: "workphone", label: "Work" },
  { value: "fax", label: "Fax" },
];

const Phone = ({ value = {}, onChange, ...props }) => {
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

export default Phone;
